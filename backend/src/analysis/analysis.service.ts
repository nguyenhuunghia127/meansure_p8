import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly systemService: SystemService,
  ) {}

  async refreshAiAnalysis(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    const analyses = [];

    let pythonRiskMap = new Map<number, any>();
    let pythonSuggMap = new Map<number, string[]>();

    try {
      const payload = {
        modules: snapshots.map(s => ({
          moduleId: s.id,
          name: s.name,
          testCaseCount: s.testCaseCount,
          linkedRequirements: s.linkedRequirements,
          totalRequirements: s.totalRequirements,
          passRate: s.passRate,
          codeCoverage: s.codeCoverage,
          openBugs: s.openBugs,
          productionBugs: s.productionBugs
        }))
      };

      const [riskRes, suggRes] = await Promise.all([
        fetch('http://localhost:5000/api/v1/ai/predict-risk', {
          method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type': 'application/json'}
        }),
        fetch('http://localhost:5000/api/v1/ai/suggest-tests', {
          method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type': 'application/json'}
        })
      ]);

      if (riskRes.ok && suggRes.ok) {
        const riskData = await riskRes.json();
        const suggData = await suggRes.json();
        
        if (riskData.status === 'success') {
          riskData.predictions.forEach((p: any) => pythonRiskMap.set(p.moduleId, p));
        }
        if (suggData.status === 'success') {
          suggData.suggestions.forEach((s: any) => pythonSuggMap.set(s.moduleId, s.suggestedTests));
        }
      } else {
        this.logger.warn('Python AI service returned non-200. Check Python server on port 5000.');
      }
    } catch (e) {
      this.logger.warn('Failed to reach Python AI Server. Is it running on port 5000? ' + e.message);
    }

    for (const snapshot of snapshots) {
      // 1. Dùng kết quả từ AI Python, hoặc fallback về Heuristic nếu server off
      const pRisk = pythonRiskMap.get(snapshot.id);
      const pSugg = pythonSuggMap.get(snapshot.id);

      const computed = this.computeFallbackAnalysis(snapshot);
      
      const riskLevel = pRisk ? pRisk.riskLevel : computed.riskLevel;
      const riskScore = pRisk ? pRisk.riskScore : computed.riskScore;
      const suggestedTestCases = pSugg ? pSugg : computed.suggestedTestCases;
      const insufficientTesting = riskScore > 65;

      const saved = await this.prisma.ai_analysis.create({
        data: {
          module_id: snapshot.id,
          risk_level: riskLevel,
          risk_score: riskScore,
          insufficient_testing: insufficientTesting,
          suggested_test_cases: suggestedTestCases.join('\n'),
        },
      });

      analyses.push({
        moduleId: snapshot.id,
        moduleName: snapshot.name,
        projectName: snapshot.projectName,
        riskLevel,
        riskScore,
        insufficientTesting,
        suggestedTestCases,
        analysisId: saved.id,
      });
    }

    await this.systemService.recordHistory(
      'analysis',
      `Refreshed Python AI ML analysis for ${projectName ?? 'all projects'}`,
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
    // Để giữ nguyên logic nếu cần request realtime từ Front-end thay vì check DB
    // Nhưng ta đã RefreshAiAnalysis lưu vào DB rồi, ở đây ta có thể tính tạm fallback
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots
      .map((snapshot) => {
        const computed = this.computeFallbackAnalysis(snapshot);
        return {
          moduleId: snapshot.id,
          moduleName: snapshot.name,
          projectName: snapshot.projectName,
          prediction: computed.riskLevel,
          probabilityScore: computed.riskScore,
        };
      })
      .sort((left, right) => right.probabilityScore - left.probabilityScore);
  }

  async suggestTestCases(projectName?: string) {
    const snapshots = await this.buildModuleSnapshots(projectName);
    return snapshots.map((snapshot) => ({
      moduleId: snapshot.id,
      moduleName: snapshot.name,
      projectName: snapshot.projectName,
      suggestions: this.computeFallbackAnalysis(snapshot).suggestedTestCases,
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
    // Text-based basic heuristic cho việc tải file (vẫn giữ nguyên trên Node.js)
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
        matched: normalized.includes('login') || normalized.includes('auth'),
        riskBoost: 18,
        issue: 'Authentication-related content usually needs stronger negative-path testing.',
        suggestion: 'Add login validation tests for invalid password, expired token.',
      },
      {
        label: 'payment or financial flow',
        matched: normalized.includes('payment') || normalized.includes('checkout'),
        riskBoost: 20,
        issue: 'Payment flow detected.',
        suggestion: 'Add test cases for duplicate payment submission, rollback behavior.',
      }
    ];

    for (const signal of signalChecks) {
      if (!signal.matched) continue;
      riskScore += signal.riskBoost;
      detectedSignals.push(signal.label);
      issues.push(signal.issue);
      suggestedTests.push(signal.suggestion);
    }

    const boundedRiskScore = Math.min(100, riskScore);
    const riskLevel = boundedRiskScore >= 75 ? 'high' : boundedRiskScore >= 45 ? 'medium' : 'low';

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
    const result = this.computeFallbackAnalysis(snapshot);
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
        ? { projects: { name: projectName } }
        : undefined,
      select: {
        id: true,
        name: true,
        projects: { select: { name: true } },
        requirements: {
          select: {
            id: true,
            requirement_test_cases: { select: { id: true } },
          },
        },
        test_cases: {
          select: {
            id: true,
            test_results: {
              select: { id: true, status: true, created_at: true },
              orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
            },
          },
        },
        code_coverage: {
          select: { coverage_percent: true, report_date: true, id: true },
          orderBy: [{ report_date: 'desc' }, { id: 'desc' }],
        },
        bugs: {
          select: { source: true, status: true },
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
        passRate: latestResults.length ? this.round((passed / latestResults.length) * 100) : 0,
        codeCoverage: latestCoverage ? Number(latestCoverage.coverage_percent) : 0,
        openBugs: module.bugs.filter((bug) => this.normalize(bug.status) === 'open').length,
        productionBugs: module.bugs.filter((bug) => this.normalize(bug.source) === 'production').length,
      };
    });
  }

  // Fallback if AI server is offline
  private computeFallbackAnalysis(snapshot: ModuleSnapshot) {
    let riskScore = 15;
    if (snapshot.testCaseCount === 0) riskScore += 35;
    if (snapshot.totalRequirements > 0 && snapshot.linkedRequirements < snapshot.totalRequirements) riskScore += 20;
    if (snapshot.passRate < 80) riskScore += 20;
    if (snapshot.codeCoverage < 70) riskScore += 20;
    riskScore += Math.min(snapshot.openBugs * 7, 15);
    riskScore += Math.min(snapshot.productionBugs * 15, 30);
    riskScore = Math.min(riskScore, 100);

    const riskLevel = riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low';
    const insufficientTesting = riskScore > 60;

    const suggestedTestCases: string[] = [];
    if (snapshot.testCaseCount === 0) suggestedTestCases.push(`[Fallback] Add baseline smoke suite for ${snapshot.name}.`);
    if (snapshot.passRate < 80) suggestedTestCases.push(`[Fallback] Add regression tests for unstable flows in ${snapshot.name}.`);
    if (suggestedTestCases.length === 0) suggestedTestCases.push(`[Fallback] Monitor changes in ${snapshot.name}.`);

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
      return `${fileName} analyzed locally. Risk: ${riskLevel} (${riskScore}/100).`;
    }
    return `${fileName} involves ${detectedSignals.join(', ')}. Risk: ${riskLevel} (${riskScore}/100).`;
  }

  private round(value: number): number {
    return Number(value.toFixed(2));
  }
}
