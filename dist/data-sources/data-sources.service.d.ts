import { PrismaService } from '../prisma/prisma.service';
import { SystemService } from '../system/system.service';
type ImportPayload = Record<string, unknown>;
type UploadedImportFile = {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
};
export declare class DataSourcesService {
    private readonly prisma;
    private readonly systemService;
    constructor(prisma: PrismaService, systemService: SystemService);
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
    importFromStructuredFile(file: UploadedImportFile, meta: {
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
    importTestCases(payload: ImportPayload): Promise<{
        source: string;
        projectName: string;
        moduleName: string;
        createdTestCases: number;
        createdRequirements: number;
        importedAt: string;
    }>;
    importTestCaseRepository(payload: ImportPayload): Promise<{
        source: string;
        projectName: string;
        moduleName: string;
        createdTestCases: number;
        createdRequirements: number;
        importedAt: string;
    }>;
    importExecutionReport(payload: ImportPayload): Promise<{
        source: string;
        runName: string;
        importedResults: number;
        importedAt: string;
    }>;
    importTestExecution(payload: ImportPayload): Promise<{
        source: string;
        runName: string;
        importedResults: number;
        importedAt: string;
    }>;
    importBugTracking(payload: ImportPayload): Promise<{
        source: string;
        tracker: string;
        upsertedIssues: number;
        importedAt: string;
    }>;
    syncBugData(payload: ImportPayload): Promise<{
        source: string;
        tracker: string;
        upsertedIssues: number;
        importedAt: string;
    }>;
    importCodeRepository(payload: ImportPayload): Promise<{
        source: string;
        repository: string;
        importedCoverageRows: number;
        importedAt: string;
    }>;
    connectRepo(payload: ImportPayload): Promise<{
        source: string;
        repository: string;
        importedCoverageRows: number;
        importedAt: string;
    }>;
    private importTestCasesFromRows;
    private importExecutionFromRows;
    private importBugTrackingFromRows;
    private importCoverageFromRows;
    private ensureProject;
    private ensureModule;
    private getString;
    private getNumber;
    private getDate;
    private getArray;
    private getStringArray;
    private parseCsv;
    private parseCsvLine;
}
export {};
