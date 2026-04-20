"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AnalysisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const system_service_1 = require("../system/system.service");
let AnalysisService = AnalysisService_1 = class AnalysisService {
    prisma;
    systemService;
    logger = new common_1.Logger(AnalysisService_1.name);
    constructor(prisma, systemService) {
        this.prisma = prisma;
        this.systemService = systemService;
    }
    async refreshAiAnalysis(projectName) {
        const snapshots = await this.buildModuleSnapshots(projectName);
        const analyses = [];
        let pythonRiskMap = new Map();
        let pythonSuggMap = new Map();
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
                    method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
                }),
                fetch('http://localhost:5000/api/v1/ai/suggest-tests', {
                    method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
                })
            ]);
            if (riskRes.ok && suggRes.ok) {
                const riskData = await riskRes.json();
                const suggData = await suggRes.json();
                if (riskData.status === 'success') {
                    riskData.predictions.forEach((p) => pythonRiskMap.set(p.moduleId, p));
                }
                if (suggData.status === 'success') {
                    suggData.suggestions.forEach((s) => pythonSuggMap.set(s.moduleId, s.suggestedTests));
                }
            }
            else {
                this.logger.warn('Python AI service returned non-200. Check Python server on port 5000.');
            }
        }
        catch (e) {
            this.logger.warn('Failed to reach Python AI Server. Is it running on port 5000? ' + e.message);
        }
        for (const snapshot of snapshots) {
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
        await this.systemService.recordHistory('analysis', `Refreshed Python AI ML analysis for ${projectName ?? 'all projects'}`);
        return {
            refreshedAt: new Date().toISOString(),
            totalModules: analyses.length,
            analyses,
        };
    }
    async detectLowCoverageAreas(projectName) {
        const snapshots = await this.buildModuleSnapshots(projectName);
        return snapshots
            .filter((snapshot) => snapshot.codeCoverage < 70 ||
            (snapshot.totalRequirements > 0 &&
                snapshot.linkedRequirements < snapshot.totalRequirements))
            .map((snapshot) => ({
            moduleId: snapshot.id,
            moduleName: snapshot.name,
            projectName: snapshot.projectName,
            codeCoverage: snapshot.codeCoverage,
            linkedRequirements: snapshot.linkedRequirements,
            totalRequirements: snapshot.totalRequirements,
        }));
    }
    async predictFailureModules(projectName) {
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
    async suggestTestCases(projectName) {
        const snapshots = await this.buildModuleSnapshots(projectName);
        return snapshots.map((snapshot) => ({
            moduleId: snapshot.id,
            moduleName: snapshot.name,
            projectName: snapshot.projectName,
            suggestions: this.computeFallbackAnalysis(snapshot).suggestedTestCases,
        }));
    }
    async identifyRiskAreas(projectName) {
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
    async analyzeUploadedFile(file) {
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
        const detectedSignals = [];
        const issues = [];
        const suggestedTests = [];
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
            if (!signal.matched)
                continue;
            riskScore += signal.riskBoost;
            detectedSignals.push(signal.label);
            issues.push(signal.issue);
            suggestedTests.push(signal.suggestion);
        }
        const boundedRiskScore = Math.min(100, riskScore);
        const riskLevel = boundedRiskScore >= 75 ? 'high' : boundedRiskScore >= 45 ? 'medium' : 'low';
        const summary = this.buildUploadedFileSummary(file.originalname, detectedSignals, boundedRiskScore, riskLevel);
        await this.systemService.recordHistory('analysis_upload', `Analyzed uploaded file ${file.originalname}`);
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
    generateRiskScore(snapshot) {
        const result = this.computeFallbackAnalysis(snapshot);
        return {
            riskLevel: result.riskLevel,
            riskScore: result.riskScore,
            insufficientTesting: result.insufficientTesting,
        };
    }
    async buildModuleSnapshots(projectName) {
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
            const passed = latestResults.filter((result) => result && this.normalize(result.status) === 'passed').length;
            const latestCoverage = module.code_coverage[0];
            return {
                id: module.id,
                name: module.name,
                projectName: module.projects.name,
                testCaseCount: module.test_cases.length,
                linkedRequirements: module.requirements.filter((requirement) => requirement.requirement_test_cases.length > 0).length,
                totalRequirements: module.requirements.length,
                passRate: latestResults.length ? this.round((passed / latestResults.length) * 100) : 0,
                codeCoverage: latestCoverage ? Number(latestCoverage.coverage_percent) : 0,
                openBugs: module.bugs.filter((bug) => this.normalize(bug.status) === 'open').length,
                productionBugs: module.bugs.filter((bug) => this.normalize(bug.source) === 'production').length,
            };
        });
    }
    computeFallbackAnalysis(snapshot) {
        let riskScore = 15;
        if (snapshot.testCaseCount === 0)
            riskScore += 35;
        if (snapshot.totalRequirements > 0 && snapshot.linkedRequirements < snapshot.totalRequirements)
            riskScore += 20;
        if (snapshot.passRate < 80)
            riskScore += 20;
        if (snapshot.codeCoverage < 70)
            riskScore += 20;
        riskScore += Math.min(snapshot.openBugs * 7, 15);
        riskScore += Math.min(snapshot.productionBugs * 15, 30);
        riskScore = Math.min(riskScore, 100);
        const riskLevel = riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low';
        const insufficientTesting = riskScore > 60;
        const suggestedTestCases = [];
        if (snapshot.testCaseCount === 0)
            suggestedTestCases.push(`[Fallback] Add baseline smoke suite for ${snapshot.name}.`);
        if (snapshot.passRate < 80)
            suggestedTestCases.push(`[Fallback] Add regression tests for unstable flows in ${snapshot.name}.`);
        if (suggestedTestCases.length === 0)
            suggestedTestCases.push(`[Fallback] Monitor changes in ${snapshot.name}.`);
        return {
            riskLevel,
            riskScore: this.round(riskScore),
            insufficientTesting,
            suggestedTestCases,
        };
    }
    normalize(value) {
        return value?.trim().toLowerCase() ?? '';
    }
    buildUploadedFileSummary(fileName, detectedSignals, riskScore, riskLevel) {
        if (!detectedSignals.length) {
            return `${fileName} analyzed locally. Risk: ${riskLevel} (${riskScore}/100).`;
        }
        return `${fileName} involves ${detectedSignals.join(', ')}. Risk: ${riskLevel} (${riskScore}/100).`;
    }
    round(value) {
        return Number(value.toFixed(2));
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = AnalysisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        system_service_1.SystemService])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map