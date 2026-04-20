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
export declare class AnalysisService {
    private readonly prisma;
    private readonly systemService;
    private readonly logger;
    constructor(prisma: PrismaService, systemService: SystemService);
    refreshAiAnalysis(projectName?: string): Promise<{
        refreshedAt: string;
        totalModules: number;
        analyses: {
            moduleId: number;
            moduleName: string;
            projectName: string;
            riskLevel: any;
            riskScore: any;
            insufficientTesting: boolean;
            suggestedTestCases: string[];
            analysisId: number;
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
    analyzeUploadedFile(file: UploadedAnalysisFile): Promise<{
        fileName: string;
        mimeType: string;
        size: number;
        summary: string;
        riskLevel: string;
        confidenceScore: number;
        detectedSignals: string[];
        suggestedTests: string[];
        issues: string[];
        extractedPreview: string;
    }>;
    generateRiskScore(snapshot: ModuleSnapshot): {
        riskLevel: string;
        riskScore: number;
        insufficientTesting: boolean;
    };
    private buildModuleSnapshots;
    private computeFallbackAnalysis;
    private normalize;
    private buildUploadedFileSummary;
    private round;
}
export {};
