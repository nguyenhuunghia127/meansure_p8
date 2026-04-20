import { AnalysisService } from './analysis.service';
import { RetrainingService } from './retrain.service';
export declare class AnalysisController {
    private readonly analysisService;
    private readonly retrainService;
    constructor(analysisService: AnalysisService, retrainService: RetrainingService);
    triggerRetrain(): Promise<any>;
    refresh(body?: {
        projectName?: string;
    }): Promise<{
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
    analyzeUploadedFile(file?: {
        originalname: string;
        mimetype: string;
        size: number;
        buffer: Buffer;
    }): Promise<{
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
