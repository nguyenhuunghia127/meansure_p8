import { ReportingService } from './reporting.service';
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    generateSummaryReport(): Promise<{
        generatedAt: string;
        summary: import("../metrics/dto/metrics-summary.dto").MetricsSummaryDto & {
            failedTestCases: number;
            passFailRatio: string;
            defectDetectionPercentage: number;
            totalBugs: number;
            productionBugs: number;
            testingBugs: number;
            openBugs: number;
            totalProjects: number;
            totalModules: number;
            totalRequirements: number;
            totalTestRuns: number;
            avgExecutionTimeSeconds: number;
        };
        coverage: import("../metrics/dto/dashboard-overview.dto").DashboardCoverageDto;
        topRiskModules: import("../metrics/dto/dashboard-overview.dto").DashboardModuleInsightDto[];
        recommendations: string[];
    }>;
    exportReportExcel(): Promise<{
        fileName: string;
        contentType: string;
        content: string;
    }>;
    exportReportPDF(): Promise<{
        fileName: string;
        contentType: string;
        content: string;
        note: string;
    }>;
}
