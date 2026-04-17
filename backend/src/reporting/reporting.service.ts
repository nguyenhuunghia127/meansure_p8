import { Injectable } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { SystemService } from '../system/system.service';

@Injectable()
export class ReportingService {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly systemService: SystemService,
  ) {}

  async generateSummaryReport() {
    const overview = await this.metricsService.getDashboardOverview();
    const report = {
      generatedAt: new Date().toISOString(),
      summary: overview.summary,
      coverage: overview.coverage,
      topRiskModules: overview.aiInsights.highRiskModules,
      recommendations: overview.aiInsights.recommendations,
    };

    await this.systemService.recordHistory(
      'report',
      'Generated summary report',
    );
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
    await this.systemService.recordHistory(
      'report',
      'Exported report as Excel-compatible CSV',
    );

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
      ...report.topRiskModules.map(
        (module) =>
          `- ${module.name} (${module.riskLevel}, score ${module.riskScore})`,
      ),
      '',
      'Recommendations:',
      ...report.recommendations.map((item) => `- ${item}`),
    ].join('\n');

    await this.systemService.recordHistory(
      'report',
      'Exported report as PDF-ready text',
    );
    return {
      fileName: 'test-metrics-report.pdf.txt',
      contentType: 'text/plain',
      content,
      note: 'This is a PDF-ready text export without a binary PDF generator dependency.',
    };
  }
}
