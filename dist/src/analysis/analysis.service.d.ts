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
export declare class AnalysisService {
    private readonly prisma;
    private readonly systemService;
    constructor(prisma: PrismaService, systemService: SystemService);
    refreshAiAnalysis(projectName?: string): Promise<{
        refreshedAt: string;
        totalModules: number;
        analyses: {
            analysisId: number;
            riskLevel: string;
            riskScore: number;
            insufficientTesting: boolean;
            suggestedTestCases: string[];
            moduleId: number;
            moduleName: string;
            projectName: string;
        }[];
    }>;
    detectLowCoverageAreas(projectName?: string): Promise<{
        moduleId: number;
        moduleName: string;
        projectName: string;
        codeCoverage: number;
        linkedRequirements: number;
        totalRequirements: number;
    }[]>;
    predictFailureModules(projectName?: string): Promise<{
        moduleId: number;
        moduleName: string;
        projectName: string;
        prediction: string;
        probabilityScore: number;
    }[]>;
    suggestTestCases(projectName?: string): Promise<{
        moduleId: number;
        moduleName: string;
        projectName: string;
        suggestions: string[];
    }[]>;
    identifyRiskAreas(projectName?: string): Promise<{
        riskLevel: string;
        riskScore: number;
        insufficientTesting: boolean;
        moduleId: number;
        moduleName: string;
        projectName: string;
    }[]>;
    generateRiskScore(snapshot: ModuleSnapshot): {
        riskLevel: string;
        riskScore: number;
        insufficientTesting: boolean;
    };
    private buildModuleSnapshots;
    private computeAnalysis;
    private normalize;
    private round;
}
export {};
