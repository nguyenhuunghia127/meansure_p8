import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SystemService } from '../system/system.service';

type ModuleSnapshot = {
  id: number;
  name: string;
  projectName: string;
  testCaseCount: number;
  linkedRequirements: number;
  totalRequirements: number;
  passRate: number;
  codeCoverage: number;
  openBugs: number;
  productionBugs: number;
};

type UploadedAnalysisFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

@Injectable()
export class AnalysisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly systemService: SystemService,
  ) {}

  async refreshAiAnalysis(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    const analyses = [];

    for (const snapshot of snapshots) {
      const computed = this.computeAnalysis(snapshot);
      const saved = await this.prisma.ai_analysis.create({
        data: {
          module_id: snapshot.id,
          risk_level: computed.riskLevel,
          risk_score: computed.riskScore,
          insufficient_testing: computed.insufficientTesting,
          suggested_test_cases: computed.suggestedTestCases.join('\n'),
        },
      });

      analyses.push({
        moduleId: snapshot.id,
        moduleName: snapshot.name,
        projectName: snapshot.projectName,
        ...computed,
        analysisId: saved.id,
      });
    }

    await this.systemService.recordHistory(
      'analysis',
      `Refreshed AI analysis for ${projectName ?? 'all projects'}`,
    );
    return {
      refreshedAt: new Date().toISOString(),
      totalModules: analyses.length,
      analyses,
    };
  }

  async detectLowCoverageAreas(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots
      .filter(
        (snapshot) =>
          snapshot.codeCoverage < 70 ||
          (snapshot.totalRequirements > 0 &&
            snapshot.linkedRequirements < snapshot.totalRequirements),
      )
      .map((snapshot) => ({
        moduleId: snapshot.id,
        moduleName: snapshot.name,
        projectName: snapshot.projectName,
        codeCoverage: snapshot.codeCoverage,
        linkedRequirements: snapshot.linkedRequirements,
        totalRequirements: snapshot.totalRequirements,
      }));
  }

  async predictFailureModules(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots
      .map((snapshot) => ({
        moduleId: snapshot.id,
        moduleName: snapshot.name,
        projectName: snapshot.projectName,
        prediction: this.computeAnalysis(snapshot).riskLevel,
        probabilityScore: this.computeAnalysis(snapshot).riskScore,
      }))
      .sort((left, right) => right.probabilityScore - left.probabilityScore);
  }

  async suggestTestCases(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots.map((snapshot) => ({
      moduleId: snapshot.id,
      moduleName: snapshot.name,
      projectName: snapshot.projectName,
      suggestions: this.computeAnalysis(snapshot).suggestedTestCases,
    }));
  }

  async identifyRiskAreas(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots
      .map((snapshot) => ({
        moduleId: snapshot.id,
        moduleName: snapshot.name,
        projectName: snapshot.projectName,
        ...this.generateRiskScore(snapshot),
      }))
      .sort((left, right) => right.riskScore - left.riskScore);
  }

  async analyzeUploadedFile(file: UploadedAnalysisFile) {
    const content = file.buffer.toString('utf8');
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return {
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        summary: 'The uploaded file is empty, so there is nothing to analyze yet.',
        riskLevel: 'low',
        confidenceScore: 15,
        detectedSignals: [],
        suggestedTests: [
          'Add real content to the file and rerun AI Test to generate meaningful suggestions.',
        ],
        issues: ['Empty file content detected.'],
        extractedPreview: '',
      };
    }

    const normalized = trimmedContent.toLowerCase();
    const lines = trimmedContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const words = trimmedContent.split(/\s+/).filter(Boolean);

    let riskScore = 20;
    const detectedSignals: string[] = [];
    const issues: string[] = [];
    const suggestedTests: string[] = [];

    const signalChecks = [
      {
        label: 'authentication logic',
        matched:
          normalized.includes('login') ||
          normalized.includes('auth') ||
          normalized.includes('password') ||
          normalized.includes('token'),
        riskBoost: 18,
        issue: 'Authentication-related content usually needs stronger negative-path testing.',
        suggestion:
          'Add login validation tests for invalid password, expired token, and unauthorized role access.',
      },
      {
        label: 'payment or financial flow',
        matched:
          normalized.includes('payment') ||
          normalized.includes('invoice') ||
          normalized.includes('checkout') ||
          normalized.includes('refund'),
        riskBoost: 20,
        issue: 'Payment-like flows can create high-impact failures and need edge-case coverage.',
        suggestion:
          'Add test cases for duplicate payment submission, rollback behavior, timeout, and rounding rules.',
      },
      {
        label: 'file upload flow',
        matched:
          normalized.includes('upload') ||
          normalized.includes('attachment') ||
          normalized.includes('import'),
        riskBoost: 14,
        issue: 'Upload flows need validation around file type, size, and malformed payloads.',
        suggestion:
          'Add tests for unsupported extension, oversized file, empty file, and corrupted upload payload.',
      },
      {
        label: 'API or integration behavior',
        matched:
          normalized.includes('api') ||
          normalized.includes('endpoint') ||
          normalized.includes('request') ||
          normalized.includes('response'),
        riskBoost: 12,
        issue: 'Integration points often fail on schema drift or timeout conditions.',
        suggestion:
          'Add integration tests for timeout, invalid schema response, retry behavior, and 4xx/5xx handling.',
      },
      {
        label: 'error handling paths',
        matched:
          normalized.includes('error') ||
          normalized.includes('exception') ||
          normalized.includes('fail') ||
          normalized.includes('warning'),
        riskBoost: 10,
        issue: 'The content references failure scenarios that should be verified directly.',
        suggestion:
          'Add explicit negative-path cases to confirm errors are surfaced safely and with correct messages.',
      },
      {
        label: 'data validation rules',
        matched:
          normalized.includes('required') ||
          normalized.includes('validate') ||
          normalized.includes('format') ||
          normalized.includes('constraint'),
        riskBoost: 12,
        issue: 'Validation-heavy flows usually hide edge cases around boundary values and malformed input.',
        suggestion:
          'Add boundary-value and invalid-format tests for required fields, max length, and special characters.',
      },
    ];

    for (const signal of signalChecks) {
      if (!signal.matched) {
        continue;
      }

      riskScore += signal.riskBoost;
      detectedSignals.push(signal.label);
      issues.push(signal.issue);
      suggestedTests.push(signal.suggestion);
    }

    if (lines.length < 5) {
      riskScore += 8;
      issues.push('The file is very short, so coverage context may be incomplete.');
      suggestedTests.push(
        'Add more business steps, expected results, or requirements so AI Test can infer stronger coverage gaps.',
      );
    }

    if (words.length > 400) {
      riskScore += 6;
      issues.push('The file is long enough to hide multiple branches and edge cases.');
      suggestedTests.push(
        'Split the scenario into smaller flows and test each branch independently for easier verification.',
      );
    }

    if (!detectedSignals.length) {
      issues.push(
        'No strong risk keyword was detected, so this result is based on generic content heuristics.',
      );
      suggestedTests.push(
        'Add explicit business rules or acceptance criteria to get more focused AI-generated test ideas.',
      );
    }

    const boundedRiskScore = Math.min(100, riskScore);
    const riskLevel =
      boundedRiskScore >= 75 ? 'high' : boundedRiskScore >= 45 ? 'medium' : 'low';

    const summary = this.buildUploadedFileSummary(
      file.originalname,
      detectedSignals,
      boundedRiskScore,
      riskLevel,
    );

    await this.systemService.recordHistory(
      'analysis_upload',
      `Analyzed uploaded file ${file.originalname}`,
    );

    return {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      summary,
      riskLevel,
      confidenceScore: boundedRiskScore,
      detectedSignals,
      suggestedTests: Array.from(new Set(suggestedTests)).slice(0, 6),
      issues: Array.from(new Set(issues)).slice(0, 6),
      extractedPreview: trimmedContent.slice(0, 1500),
    };
  }

  generateRiskScore(snapshot: ModuleSnapshot) {
    const result = this.computeAnalysis(snapshot);
    return {
      riskLevel: result.riskLevel,
      riskScore: result.riskScore,
      insufficientTesting: result.insufficientTesting,
    };
  }

  private async buildModuleSnapshots(
    projectName?: string,
  ): Promise<ModuleSnapshot[]> {
    const modules = await this.prisma.modules.findMany({
      where: projectName
        ? {
            projects: {
              name: projectName,
            },
          }
        : undefined,
      select: {
        id: true,
        name: true,
        projects: {
          select: { name: true },
        },
        requirements: {
          select: {
            id: true,
            requirement_test_cases: {
              select: { id: true },
            },
          },
        },
        test_cases: {
          select: {
            id: true,
            test_results: {
              select: {
                id: true,
                status: true,
                created_at: true,
              },
              orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
            },
          },
        },
        code_coverage: {
          select: {
            coverage_percent: true,
            report_date: true,
            id: true,
          },
          orderBy: [{ report_date: 'desc' }, { id: 'desc' }],
        },
        bugs: {
          select: {
            source: true,
            status: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return modules.map((module) => {
      const latestResults = module.test_cases
        .map((testCase) => testCase.test_results[0])
        .filter((item) => Boolean(item));
      const passed = latestResults.filter(
        (result) => result && this.normalize(result.status) === 'passed',
      ).length;
      const latestCoverage = module.code_coverage[0];

      return {
        id: module.id,
        name: module.name,
        projectName: module.projects.name,
        testCaseCount: module.test_cases.length,
        linkedRequirements: module.requirements.filter(
          (requirement) => requirement.requirement_test_cases.length > 0,
        ).length,
        totalRequirements: module.requirements.length,
        passRate: latestResults.length
          ? this.round((passed / latestResults.length) * 100)
          : 0,
        codeCoverage: latestCoverage
          ? Number(latestCoverage.coverage_percent)
          : 0,
        openBugs: module.bugs.filter(
          (bug) => this.normalize(bug.status) === 'open',
        ).length,
        productionBugs: module.bugs.filter(
          (bug) => this.normalize(bug.source) === 'production',
        ).length,
      };
    });
  }

  private computeAnalysis(snapshot: ModuleSnapshot) {
    let riskScore = 10;

    if (snapshot.testCaseCount === 0) {
      riskScore += 35;
    }
    if (
      snapshot.totalRequirements > 0 &&
      snapshot.linkedRequirements < snapshot.totalRequirements
    ) {
      riskScore += 20;
    }
    if (snapshot.passRate < 80) {
      riskScore += 20;
    }
    if (snapshot.codeCoverage < 70) {
      riskScore += 20;
    }
    riskScore += Math.min(snapshot.openBugs * 7, 15);
    riskScore += Math.min(snapshot.productionBugs * 15, 30);
    riskScore = Math.min(riskScore, 100);

    const riskLevel =
      riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low';
    const insufficientTesting =
      snapshot.testCaseCount === 0 ||
      snapshot.passRate < 80 ||
      snapshot.codeCoverage < 70 ||
      snapshot.linkedRequirements < snapshot.totalRequirements;

    const suggestedTestCases: string[] = [];
    if (snapshot.testCaseCount === 0) {
      suggestedTestCases.push(
        `Add a baseline smoke suite for ${snapshot.name} covering the main happy path and validation errors.`,
      );
    }
    if (snapshot.linkedRequirements < snapshot.totalRequirements) {
      suggestedTestCases.push(
        `Create requirement traceability tests for uncovered ${snapshot.name} requirements.`,
      );
    }
    if (snapshot.passRate < 80) {
      suggestedTestCases.push(
        `Add regression tests for the unstable flows in ${snapshot.name} that are still failing.`,
      );
    }
    if (snapshot.codeCoverage < 70) {
      suggestedTestCases.push(
        `Increase unit and integration coverage for edge cases and failure handling in ${snapshot.name}.`,
      );
    }
    if (snapshot.productionBugs > 0) {
      suggestedTestCases.push(
        `Convert production incidents in ${snapshot.name} into permanent regression tests before the next release.`,
      );
    }
    if (suggestedTestCases.length === 0) {
      suggestedTestCases.push(
        `Maintain the current coverage depth in ${snapshot.name} and monitor upcoming changes for new risk.`,
      );
    }

    return {
      riskLevel,
      riskScore: this.round(riskScore),
      insufficientTesting,
      suggestedTestCases,
    };
  }

  private normalize(value?: string | null): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private buildUploadedFileSummary(
    fileName: string,
    detectedSignals: string[],
    riskScore: number,
    riskLevel: string,
  ): string {
    if (!detectedSignals.length) {
      return `${fileName} was analyzed with generic heuristics. Current estimated risk is ${riskLevel} (${riskScore}/100), but the file needs more explicit business detail for sharper AI test suggestions.`;
    }

    return `${fileName} appears to involve ${detectedSignals.join(', ')}. The current estimated risk is ${riskLevel} (${riskScore}/100), so the recommended AI test focus is on negative paths, edge cases, and integration resilience.`;
  }

  private round(value: number): number {
    return Number(value.toFixed(2));
  }
}
