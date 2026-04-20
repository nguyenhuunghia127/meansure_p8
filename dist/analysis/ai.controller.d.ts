import { AnalysisService } from './analysis.service';
export declare class AiController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
    predictRisk(projectName?: string): Promise<{
        moduleId: number;
        moduleName: string;
        projectName: string;
        prediction: string;
        probabilityScore: number;
    }[]>;
    suggestTests(projectName?: string): Promise<{
        moduleId: number;
        moduleName: string;
        projectName: string;
        suggestions: string[];
    }[]>;
}
