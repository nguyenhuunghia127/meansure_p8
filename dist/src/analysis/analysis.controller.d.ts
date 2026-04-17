import { AnalysisService } from './analysis.service';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
    refresh(body?: {
        projectName?: string;
    }): Promise<{
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
}
