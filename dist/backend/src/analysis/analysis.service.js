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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const system_service_1 = require("../system/system.service");
let AnalysisService = class AnalysisService {
    prisma;
    systemService;
    constructor(prisma, systemService) {
        this.prisma = prisma;
        this.systemService = systemService;
    }
    async refreshAiAnalysis(projectName) {
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
        await this.systemService.recordHistory('analysis', `Refreshed AI analysis for ${projectName ?? 'all projects'}`);
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
            .map((snapshot) => ({
            moduleId: snapshot.id,
            moduleName: snapshot.name,
            projectName: snapshot.projectName,
            prediction: this.computeAnalysis(snapshot).riskLevel,
            probabilityScore: this.computeAnalysis(snapshot).riskScore,
        }))
            .sort((left, right) => right.probabilityScore - left.probabilityScore);
    }
    async suggestTestCases(projectName) {
        const snapshots = await this.buildModuleSnapshots(projectName);
        return snapshots.map((snapshot) => ({
            moduleId: snapshot.id,
            moduleName: snapshot.name,
            projectName: snapshot.projectName,
            suggestions: this.computeAnalysis(snapshot).suggestedTestCases,
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
    generateRiskScore(snapshot) {
        const result = this.computeAnalysis(snapshot);
        return {
            riskLevel: result.riskLevel,
            riskScore: result.riskScore,
            insufficientTesting: result.insufficientTesting,
        };
    }
    async buildModuleSnapshots(projectName) {
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
            const passed = latestResults.filter((result) => result && this.normalize(result.status) === 'passed').length;
            const latestCoverage = module.code_coverage[0];
            return {
                id: module.id,
                name: module.name,
                projectName: module.projects.name,
                testCaseCount: module.test_cases.length,
                linkedRequirements: module.requirements.filter((requirement) => requirement.requirement_test_cases.length > 0).length,
                totalRequirements: module.requirements.length,
                passRate: latestResults.length
                    ? this.round((passed / latestResults.length) * 100)
                    : 0,
                codeCoverage: latestCoverage
                    ? Number(latestCoverage.coverage_percent)
                    : 0,
                openBugs: module.bugs.filter((bug) => this.normalize(bug.status) === 'open').length,
                productionBugs: module.bugs.filter((bug) => this.normalize(bug.source) === 'production').length,
            };
        });
    }
    computeAnalysis(snapshot) {
        let riskScore = 10;
        if (snapshot.testCaseCount === 0) {
            riskScore += 35;
        }
        if (snapshot.totalRequirements > 0 &&
            snapshot.linkedRequirements < snapshot.totalRequirements) {
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
        const riskLevel = riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low';
        const insufficientTesting = snapshot.testCaseCount === 0 ||
            snapshot.passRate < 80 ||
            snapshot.codeCoverage < 70 ||
            snapshot.linkedRequirements < snapshot.totalRequirements;
        const suggestedTestCases = [];
        if (snapshot.testCaseCount === 0) {
            suggestedTestCases.push(`Add a baseline smoke suite for ${snapshot.name} covering the main happy path and validation errors.`);
        }
        if (snapshot.linkedRequirements < snapshot.totalRequirements) {
            suggestedTestCases.push(`Create requirement traceability tests for uncovered ${snapshot.name} requirements.`);
        }
        if (snapshot.passRate < 80) {
            suggestedTestCases.push(`Add regression tests for the unstable flows in ${snapshot.name} that are still failing.`);
        }
        if (snapshot.codeCoverage < 70) {
            suggestedTestCases.push(`Increase unit and integration coverage for edge cases and failure handling in ${snapshot.name}.`);
        }
        if (snapshot.productionBugs > 0) {
            suggestedTestCases.push(`Convert production incidents in ${snapshot.name} into permanent regression tests before the next release.`);
        }
        if (suggestedTestCases.length === 0) {
            suggestedTestCases.push(`Maintain the current coverage depth in ${snapshot.name} and monitor upcoming changes for new risk.`);
        }
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
    round(value) {
        return Number(value.toFixed(2));
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        system_service_1.SystemService])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map