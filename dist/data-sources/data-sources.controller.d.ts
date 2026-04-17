import { DataSourcesService } from './data-sources.service';
export declare class DataSourcesController {
    private readonly dataSourcesService;
    constructor(dataSourcesService: DataSourcesService);
    getTemplates(): {
        testCaseRepository: {
            endpoint: string;
            method: string;
            payload: {
                projectName: string;
                moduleName: string;
                requirements: {
                    code: string;
                    title: string;
                    description: string;
                    priority: string;
                    testCaseCodes: string[];
                }[];
                testCases: {
                    code: string;
                    title: string;
                    description: string;
                    testType: string;
                    priority: string;
                }[];
            };
        };
        executionReport: {
            endpoint: string;
            method: string;
            payload: {
                projectName: string;
                runName: string;
                environment: string;
                executedBy: string;
                results: {
                    testCaseCode: string;
                    status: string;
                    executionTimeSeconds: number;
                    actualResult: string;
                }[];
            };
        };
        bugTracking: {
            endpoint: string;
            method: string;
            payload: {
                projectName: string;
                tracker: string;
                issues: {
                    bugCode: string;
                    moduleName: string;
                    testCaseCode: string;
                    title: string;
                    description: string;
                    severity: string;
                    priority: string;
                    source: string;
                    status: string;
                }[];
            };
        };
        codeRepository: {
            endpoint: string;
            method: string;
            payload: {
                projectName: string;
                repository: string;
                coverage: {
                    moduleName: string;
                    coveragePercent: number;
                    reportDate: string;
                }[];
            };
        };
        aiRefresh: {
            endpoint: string;
            method: string;
            payload: {
                projectName: string;
            };
        };
        csvImport: {
            endpoint: string;
            method: string;
            payload: {
                importType: string;
                projectName: string;
                moduleName: string;
                file: string;
            };
        };
    };
    importFromFile(file?: {
        originalname: string;
        mimetype: string;
        size: number;
        buffer: Buffer;
    }, body?: {
        importType?: string;
        projectName?: string;
        moduleName?: string;
        runName?: string;
        tracker?: string;
        repository?: string;
    }): Promise<{
        imported: boolean;
        fileName: string;
        importType: string;
        message: string;
        supportedTypes?: undefined;
    } | {
        imported: boolean;
        fileName: string;
        importType: string;
        supportedTypes: string[];
        message: string;
    } | {
        imported: boolean;
        fileName: string;
        importType: string;
        rowCount: number;
        message?: undefined;
        supportedTypes?: undefined;
    }>;
    importTestCaseRepository(body: Record<string, unknown>): Promise<{
        source: string;
        projectName: string;
        moduleName: string;
        createdTestCases: number;
        createdRequirements: number;
        importedAt: string;
    }>;
    importExecutionReport(body: Record<string, unknown>): Promise<{
        source: string;
        runName: string;
        importedResults: number;
        importedAt: string;
    }>;
    importBugTracking(body: Record<string, unknown>): Promise<{
        source: string;
        tracker: string;
        upsertedIssues: number;
        importedAt: string;
    }>;
    importCodeRepository(body: Record<string, unknown>): Promise<{
        source: string;
        repository: string;
        importedCoverageRows: number;
        importedAt: string;
    }>;
}
