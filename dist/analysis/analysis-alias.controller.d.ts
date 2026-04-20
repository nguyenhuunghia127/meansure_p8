import { RetrainingService } from './retrain.service';
export declare class AnalysisAliasController {
    private readonly retrainService;
    constructor(retrainService: RetrainingService);
    triggerRetrainAi(): Promise<any>;
}
