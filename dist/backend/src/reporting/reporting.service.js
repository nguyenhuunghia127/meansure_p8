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
exports.ReportingService = void 0;
const common_1 = require("@nestjs/common");
const metrics_service_1 = require("../metrics/metrics.service");
const system_service_1 = require("../system/system.service");
let ReportingService = class ReportingService {
    metricsService;
    systemService;
    constructor(metricsService, systemService) {
        this.metricsService = metricsService;
        this.systemService = systemService;
    }
    async generateSummaryReport() {
        const overview = await this.metricsService.getDashboardOverview();
        const report = {
            generatedAt: new Date().toISOString(),
            summary: overview.summary,
            coverage: overview.coverage,
            topRiskModules: overview.aiInsights.highRiskModules,
            recommendations: overview.aiInsights.recommendations,
        };
        await this.systemService.recordHistory('report', 'Generated summary report');
        return report;
    }
    async exportReportExcel() {
        const overview = await this.metricsService.getDashboardOverview();
        const rows = [
            ['Metric', 'Value'],
            ['Execution Rate', String(overview.summary.executionRate)],
            ['Pass Rate', String(overview.summary.passRate)],
            [
                'Defect Detection Percentage',
                String(overview.summary.defectDetectionPercentage),
            ],
            ['Defect Leakage Rate', String(overview.summary.defectLeakageRate)],
            ['Requirement Coverage', String(overview.coverage.requirementCoverage)],
            ['Code Coverage', String(overview.coverage.codeCoverage)],
            ['Test Case Coverage', String(overview.coverage.testCaseCoverage)],
        ];
        const csv = rows.map((row) => row.join(',')).join('\n');
        await this.systemService.recordHistory('report', 'Exported report as Excel-compatible CSV');
        return {
            fileName: 'test-metrics-report.csv',
            contentType: 'text/csv',
            content: csv,
        };
    }
    async exportReportPDF() {
        const report = await this.generateSummaryReport();
        const content = [
            'P8 AI-based Test Metrics Dashboard Report',
            `Generated: ${report.generatedAt}`,
            `Execution Rate: ${report.summary.executionRate}%`,
            `Pass Rate: ${report.summary.passRate}%`,
            `Defect Detection Percentage: ${report.summary.defectDetectionPercentage}%`,
            `Defect Leakage Rate: ${report.summary.defectLeakageRate}%`,
            `Requirement Coverage: ${report.coverage.requirementCoverage}%`,
            `Code Coverage: ${report.coverage.codeCoverage}%`,
            `Test Case Coverage: ${report.coverage.testCaseCoverage}%`,
            '',
            'Top Risk Modules:',
            ...report.topRiskModules.map((module) => `- ${module.name} (${module.riskLevel}, score ${module.riskScore})`),
            '',
            'Recommendations:',
            ...report.recommendations.map((item) => `- ${item}`),
        ].join('\n');
        await this.systemService.recordHistory('report', 'Exported report as PDF-ready text');
        return {
            fileName: 'test-metrics-report.pdf.txt',
            contentType: 'text/plain',
            content,
            note: 'This is a PDF-ready text export without a binary PDF generator dependency.',
        };
    }
};
exports.ReportingService = ReportingService;
exports.ReportingService = ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService,
        system_service_1.SystemService])
], ReportingService);
//# sourceMappingURL=reporting.service.js.map