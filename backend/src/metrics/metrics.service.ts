import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DashboardModuleInsightDto,
  DashboardOverviewDto,
} from './dto/dashboard-overview.dto';
import {
  ChartsResponseDto,
  CoverageMetricsDto,
  DefectTrendsDto,
  EffectivenessMetricsDto,
  ModuleFilterDto,
  TimeRangeFilterDto,
} from './dto/metrics-response.dto';
import { MetricsSummaryDto } from './dto/metrics-summary.dto';
import { SystemService } from '../system/system.service';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private readonly systemService: SystemService,
  ) {}

  async getSummary(): Promise<MetricsSummaryDto> {
    const overview = await this.getDashboardOverview();
    return {
      totalTestCases: overview.summary.totalTestCases,
      executionRate: overview.summary.executionRate,
      passRate: overview.summary.passRate,
      defectLeakageRate: overview.summary.defectLeakageRate,
    };
  }

  async getDashboardOverview(): Promise<DashboardOverviewDto> {
    const [
      projects,
      modules,
      requirements,
      testCases,
      testResults,
      testRuns,
      bugs,
      codeCoverage,
      aiAnalysis,
    ] = await Promise.all([
      this.prisma.projects.findMany({
        select: { id: true, name: true },
      }),
      this.prisma.modules.findMany({
        select: {
          id: true,
          name: true,
          project_id: true,
          projects: {
            select: { name: true },
          },
        },
      }),
      this.prisma.requirements.findMany({
        select: {
          id: true,
          title: true,
          module_id: true,
          priority: true,
          requirement_test_cases: {
            select: { test_case_id: true },
          },
        },
      }),
      this.prisma.test_cases.findMany({
        select: {
          id: true,
          code: true,
          title: true,
          module_id: true,
          priority: true,
          modules: {
            select: {
              name: true,
              project_id: true,
              projects: {
                select: { name: true },
              },
            },
          },
        },
      }),
      this.prisma.test_results.findMany({
        select: {
          id: true,
          test_case_id: true,
          test_run_id: true,
          status: true,
          execution_time_seconds: true,
          created_at: true,
          test_cases: {
            select: {
              module_id: true,
            },
          },
        },
        orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.test_runs.findMany({
        select: {
          id: true,
          run_name: true,
          environment: true,
          executed_at: true,
          test_results: {
            select: {
              status: true,
            },
          },
        },
        orderBy: [{ executed_at: 'desc' }, { id: 'desc' }],
        take: 6,
      }),
      this.prisma.bugs.findMany({
        select: {
          id: true,
          module_id: true,
          source: true,
          severity: true,
          status: true,
          created_at: true,
        },
        orderBy: [{ created_at: 'asc' }, { id: 'asc' }],
      }),
      this.prisma.code_coverage.findMany({
        select: {
          id: true,
          module_id: true,
          coverage_percent: true,
          report_date: true,
        },
        orderBy: [{ report_date: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.ai_analysis.findMany({
        select: {
          id: true,
          module_id: true,
          risk_level: true,
          risk_score: true,
          insufficient_testing: true,
          suggested_test_cases: true,
          analysis_date: true,
        },
        orderBy: [{ analysis_date: 'desc' }, { id: 'desc' }],
      }),
    ]);

    const latestResults = this.getLatestByKey(
      testResults,
      (result) => result.test_case_id,
    );
    const latestCoverage = this.getLatestByKey(
      codeCoverage,
      (coverage) => coverage.module_id,
    );
    const latestAiAnalysis = this.getLatestByKey(
      aiAnalysis,
      (analysis) => analysis.module_id,
    );

    const executedCount = latestResults.length;
    const passedCount = latestResults.filter(
      (result) => this.normalizeStatus(result.status) === 'passed',
    ).length;
    const failedCount = latestResults.filter(
      (result) => this.normalizeStatus(result.status) === 'failed',
    ).length;
    const totalTestCases = testCases.length;
    const totalBugs = bugs.length;
    const productionBugs = bugs.filter(
      (bug) => this.normalizeSource(bug.source) === 'production',
    ).length;
    const testingBugs = totalBugs - productionBugs;
    const openBugs = bugs.filter(
      (bug) => this.normalizeStatus(bug.status) === 'open',
    ).length;
    const linkedRequirementCount = requirements.filter(
      (requirement) => requirement.requirement_test_cases.length > 0,
    ).length;
    const moduleIdsWithTests = new Set(
      testCases.map((testCase) => testCase.module_id),
    );
    const coverageValues = latestCoverage.map((coverage) =>
      Number(coverage.coverage_percent),
    );
    const avgExecutionTimeSeconds = latestResults.length
      ? this.round(
          latestResults.reduce(
            (sum, result) => sum + (result.execution_time_seconds ?? 0),
            0,
          ) / latestResults.length,
        )
      : 0;

    const summary = {
      totalProjects: projects.length,
      totalModules: modules.length,
      totalRequirements: requirements.length,
      totalTestCases,
      totalTestRuns: testRuns.length,
      totalBugs,
      testingBugs,
      productionBugs,
      openBugs,
      executionRate: this.toPercent(executedCount, totalTestCases),
      passRate: this.toPercent(passedCount, executedCount),
      failedTestCases: failedCount,
      passFailRatio: `${passedCount}:${failedCount}`,
      defectDetectionPercentage: this.toPercent(testingBugs, totalBugs),
      defectLeakageRate: this.toPercent(productionBugs, totalBugs),
      avgExecutionTimeSeconds,
    };

    const coverage = {
      requirementCoverage: this.toPercent(
        linkedRequirementCount,
        requirements.length,
      ),
      codeCoverage: coverageValues.length
        ? this.round(
            coverageValues.reduce((sum, value) => sum + value, 0) /
              coverageValues.length,
          )
        : 0,
      testCaseCoverage: this.toPercent(moduleIdsWithTests.size, modules.length),
    };

    const requirementsByModule = this.groupByCount(
      requirements,
      (requirement) => requirement.module_id ?? -1,
    );
    const linkedRequirementsByModule = this.groupByCount(
      requirements.filter(
        (requirement) => requirement.requirement_test_cases.length > 0,
      ),
      (requirement) => requirement.module_id ?? -1,
    );
    const testCasesByModule = this.groupByCount(
      testCases,
      (testCase) => testCase.module_id,
    );
    const latestResultsByModule = this.groupBy(
      latestResults,
      (result) => result.test_cases.module_id,
    );
    const openBugsByModule = this.groupByCount(
      bugs.filter((bug) => this.normalizeStatus(bug.status) === 'open'),
      (bug) => bug.module_id,
    );
    const productionBugsByModule = this.groupByCount(
      bugs.filter((bug) => this.normalizeSource(bug.source) === 'production'),
      (bug) => bug.module_id,
    );

    const modulesOverview = modules
      .map((module) => {
        const moduleResults = latestResultsByModule.get(module.id) ?? [];
        const modulePassedCount = moduleResults.filter(
          (result) => this.normalizeStatus(result.status) === 'passed',
        ).length;
        const moduleExecutionRate = this.toPercent(
          moduleResults.length,
          testCasesByModule.get(module.id) ?? 0,
        );
        const modulePassRate = this.toPercent(
          modulePassedCount,
          moduleResults.length,
        );
        const moduleRequirementCoverage = this.toPercent(
          linkedRequirementsByModule.get(module.id) ?? 0,
          requirementsByModule.get(module.id) ?? 0,
        );
        const moduleCodeCoverage = latestCoverage.find(
          (coverageItem) => coverageItem.module_id === module.id,
        );
        const moduleAi = latestAiAnalysis.find(
          (analysis) => analysis.module_id === module.id,
        );
        const heuristic = this.buildModuleHeuristic({
          moduleName: module.name,
          testCaseCount: testCasesByModule.get(module.id) ?? 0,
          executionRate: moduleExecutionRate,
          passRate: modulePassRate,
          requirementCoverage: moduleRequirementCoverage,
          codeCoverage: moduleCodeCoverage
            ? Number(moduleCodeCoverage.coverage_percent)
            : 0,
          openBugs: openBugsByModule.get(module.id) ?? 0,
          productionBugs: productionBugsByModule.get(module.id) ?? 0,
        });

        const aiRecommendations = this.extractAiSuggestions(
          moduleAi?.suggested_test_cases,
        );

        return {
          id: module.id,
          name: module.name,
          projectName: module.projects.name,
          testCaseCount: testCasesByModule.get(module.id) ?? 0,
          requirementCoverage: moduleRequirementCoverage,
          codeCoverage: moduleCodeCoverage
            ? Number(moduleCodeCoverage.coverage_percent)
            : 0,
          passRate: modulePassRate,
          openBugs: openBugsByModule.get(module.id) ?? 0,
          productionBugs: productionBugsByModule.get(module.id) ?? 0,
          riskLevel: moduleAi?.risk_level ?? heuristic.riskLevel,
          riskScore: moduleAi?.risk_score
            ? Number(moduleAi.risk_score)
            : heuristic.riskScore,
          insufficientTesting:
            moduleAi?.insufficient_testing ?? heuristic.insufficientTesting,
          recommendations:
            aiRecommendations.length > 0
              ? aiRecommendations
              : heuristic.recommendations,
        } satisfies DashboardModuleInsightDto;
      })
      .sort((left, right) => right.riskScore - left.riskScore);

    const recentRuns = [...testRuns].reverse().map((run) => {
      const passed = run.test_results.filter(
        (result) => this.normalizeStatus(result.status) === 'passed',
      ).length;
      const failed = run.test_results.filter(
        (result) => this.normalizeStatus(result.status) === 'failed',
      ).length;

      return {
        runName: run.run_name,
        label: run.run_name.replace('Regression', '').trim(),
        passRate: this.toPercent(passed, run.test_results.length),
        passed,
        failed,
        total: run.test_results.length,
      };
    });

    const bugSources = [
      { label: 'Testing', value: testingBugs },
      { label: 'Production', value: productionBugs },
    ];

    const bugTimelineMap = new Map<string, number>();
    for (const bug of bugs) {
      const dateLabel = this.formatDateLabel(bug.created_at);
      bugTimelineMap.set(dateLabel, (bugTimelineMap.get(dateLabel) ?? 0) + 1);
    }

    const bugTimeline = [...bugTimelineMap.entries()].map(([label, value]) => ({
      label,
      value,
    }));

    const highRiskModules = modulesOverview.slice(0, 3);
    const aiRecommendations = this.uniqueStrings(
      highRiskModules.flatMap((module) =>
        module.recommendations.map(
          (recommendation) => `${module.name}: ${recommendation}`,
        ),
      ),
    ).slice(0, 5);
    const latestAiTimestamp = latestAiAnalysis[0]?.analysis_date
      ? this.formatDateLabel(latestAiAnalysis[0].analysis_date)
      : 'Not generated yet';

    return {
      summary,
      coverage,
      trends: {
        recentRuns,
        bugSources,
        bugTimeline,
      },
      inputSources: [
        {
          key: 'test-case-repositories',
          label: 'Test Case Repositories',
          description:
            'Repository of requirements and test cases linked to modules.',
          endpoint: '/api/v1/data-sources/test-case-repositories',
          recordCount: testCases.length,
        },
        {
          key: 'execution-reports',
          label: 'Test Execution Reports',
          description:
            'Historical run results used for execution and pass/fail metrics.',
          endpoint: '/api/v1/data-sources/execution-reports',
          recordCount: testResults.length,
        },
        {
          key: 'bug-tracking',
          label: 'Bug Tracking Systems',
          description:
            'Imported defects from Jira, GitHub issues, or manual QA logging.',
          endpoint: '/api/v1/data-sources/bug-tracking',
          recordCount: bugs.length,
        },
        {
          key: 'code-repository',
          label: 'Code Repository',
          description:
            'Coverage metrics and code-quality signals collected per module.',
          endpoint: '/api/v1/data-sources/code-repository',
          recordCount: codeCoverage.length,
        },
      ],
      modules: modulesOverview,
      aiInsights: {
        overview:
          highRiskModules.length > 0
            ? `${highRiskModules[0].name} is currently the highest-risk area based on failing tests, open defects, coverage gaps, and the latest AI analysis snapshot from ${latestAiTimestamp}.`
            : 'Current data does not show any critical risk concentration.',
        highRiskModules,
        recommendations:
          aiRecommendations.length > 0
            ? aiRecommendations
            : [
                'Add more historical test and AI analysis records to unlock stronger recommendations.',
              ],
      },
    };
  }

  async getEffectivenessMetrics(): Promise<EffectivenessMetricsDto> {
    const overview = await this.getDashboardOverview();
    return {
      executionRate: this.calculateExecutionRate(overview),
      passFailRatio: this.calculatePassFailRatio(overview),
      defectDetectionPercentage: this.calculateDDP(overview),
      defectLeakageRate: this.calculateDefectLeakage(overview),
      totalTestCases: overview.summary.totalTestCases,
      totalTestRuns: overview.summary.totalTestRuns,
    };
  }

  async getCoverageMetrics(): Promise<CoverageMetricsDto> {
    const overview = await this.getDashboardOverview();
    return {
      requirementCoverage: this.calculateRequirementCoverage(overview),
      codeCoverage: this.calculateCodeCoverage(overview),
      testCaseCoverage: this.calculateTestCaseCoverage(overview),
    };
  }

  async getDefectTrends(): Promise<DefectTrendsDto> {
    const overview = await this.getDashboardOverview();
    return overview.trends;
  }

  calculateExecutionRate(overview: DashboardOverviewDto): number {
    return overview.summary.executionRate;
  }

  calculatePassFailRatio(overview: DashboardOverviewDto): string {
    return overview.summary.passFailRatio;
  }

  calculateDDP(overview: DashboardOverviewDto): number {
    return overview.summary.defectDetectionPercentage;
  }

  calculateDefectLeakage(overview: DashboardOverviewDto): number {
    return overview.summary.defectLeakageRate;
  }

  calculateRequirementCoverage(overview: DashboardOverviewDto): number {
    return overview.coverage.requirementCoverage;
  }

  calculateCodeCoverage(overview: DashboardOverviewDto): number {
    return overview.coverage.codeCoverage;
  }

  calculateTestCaseCoverage(overview: DashboardOverviewDto): number {
    return overview.coverage.testCaseCoverage;
  }

  async filterByTimeRange(range: string): Promise<TimeRangeFilterDto> {
    const overview = await this.getDashboardOverview();
    await this.systemService.recordHistory(
      'dashboard',
      `Applied time range filter: ${range}`,
    );
    return {
      range,
      trends: overview.trends,
      note: 'Current sample data uses lightweight trend filtering metadata.',
    };
  }

  async filterByModule(moduleName?: string): Promise<ModuleFilterDto> {
    const overview = await this.getDashboardOverview();
    const modules = moduleName
      ? overview.modules.filter(
          (module) => module.name.toLowerCase() === moduleName.toLowerCase(),
        )
      : overview.modules;
    await this.systemService.recordHistory(
      'dashboard',
      `Applied module filter: ${moduleName ?? 'all'}`,
    );
    return {
      moduleName: moduleName ?? 'all',
      modules,
    };
  }

  async renderCharts(): Promise<ChartsResponseDto> {
    const overview = await this.getDashboardOverview();
    return {
      charts: [
        {
          type: 'bar',
          title: 'Effectiveness Metrics',
          series: [
            { label: 'Execution Rate', value: overview.summary.executionRate },
            { label: 'Pass Rate', value: overview.summary.passRate },
            { label: 'DDP', value: overview.summary.defectDetectionPercentage },
            {
              label: 'Defect Leakage',
              value: overview.summary.defectLeakageRate,
            },
          ],
        },
        {
          type: 'bar',
          title: 'Coverage Metrics',
          series: [
            {
              label: 'Requirement Coverage',
              value: overview.coverage.requirementCoverage,
            },
            { label: 'Code Coverage', value: overview.coverage.codeCoverage },
            {
              label: 'Test Case Coverage',
              value: overview.coverage.testCaseCoverage,
            },
          ],
        },
        {
          type: 'stack',
          title: 'Run Trends',
          series: overview.trends.recentRuns,
        },
      ],
    };
  }

  private buildModuleHeuristic(input: {
    moduleName: string;
    testCaseCount: number;
    executionRate: number;
    passRate: number;
    requirementCoverage: number;
    codeCoverage: number;
    openBugs: number;
    productionBugs: number;
  }) {
    let riskScore = 5;

    if (input.testCaseCount === 0) {
      riskScore += 30;
    }
    if (input.executionRate < 80) {
      riskScore += 15;
    }
    if (input.passRate < 80) {
      riskScore += 20;
    }
    if (input.requirementCoverage < 80) {
      riskScore += 15;
    }
    if (input.codeCoverage < 70) {
      riskScore += 20;
    }
    riskScore += Math.min(input.openBugs * 7, 20);
    riskScore += Math.min(input.productionBugs * 15, 30);
    riskScore = Math.min(riskScore, 100);

    const insufficientTesting =
      input.testCaseCount === 0 ||
      input.executionRate < 80 ||
      input.requirementCoverage < 80 ||
      input.codeCoverage < 70;

    const recommendations: string[] = [];
    if (input.testCaseCount === 0) {
      recommendations.push(
        'Create baseline functional test cases for this module.',
      );
    }
    if (input.requirementCoverage < 80) {
      recommendations.push(
        'Link uncovered requirements to dedicated test cases.',
      );
    }
    if (input.passRate < 80) {
      recommendations.push(
        'Add regression coverage for the scenarios that still fail.',
      );
    }
    if (input.codeCoverage < 70) {
      recommendations.push(
        'Increase unit and integration coverage around risky paths.',
      );
    }
    if (input.productionBugs > 0) {
      recommendations.push(
        'Convert production defects into regression tests before the next release.',
      );
    }
    if (recommendations.length === 0) {
      recommendations.push(
        'Maintain current test depth and monitor change-heavy areas.',
      );
    }

    return {
      riskScore: this.round(riskScore),
      riskLevel: riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low',
      insufficientTesting,
      recommendations,
    };
  }

  private extractAiSuggestions(value?: string | null): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(/\r?\n|[;,.](?=\s+[A-Z0-9-])/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  private getLatestByKey<T>(items: T[], getKey: (item: T) => number): T[] {
    const seen = new Set<number>();
    const latest: T[] = [];

    for (const item of items) {
      const key = getKey(item);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      latest.push(item);
    }

    return latest;
  }

  private groupBy<T>(
    items: T[],
    getKey: (item: T) => number,
  ): Map<number, T[]> {
    const grouped = new Map<number, T[]>();

    for (const item of items) {
      const key = getKey(item);
      const bucket = grouped.get(key) ?? [];
      bucket.push(item);
      grouped.set(key, bucket);
    }

    return grouped;
  }

  private groupByCount<T>(
    items: T[],
    getKey: (item: T) => number,
  ): Map<number, number> {
    const grouped = new Map<number, number>();

    for (const item of items) {
      const key = getKey(item);
      grouped.set(key, (grouped.get(key) ?? 0) + 1);
    }

    return grouped;
  }

  private normalizeStatus(value?: string | null): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private normalizeSource(value?: string | null): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private toPercent(numerator: number, denominator: number): number {
    if (!denominator) {
      return 0;
    }

    return this.round((numerator / denominator) * 100);
  }

  private round(value: number): number {
    return Number(value.toFixed(2));
  }

  private formatDateLabel(value: Date | null): string {
    if (!value) {
      return 'Unknown';
    }

    return value.toISOString().slice(0, 10);
  }

  private uniqueStrings(values: string[]): string[] {
    return [...new Set(values)];
  }
}
