import { MetricsSummaryDto } from './metrics-summary.dto';

export interface DashboardCoverageDto {
  requirementCoverage: number;
  codeCoverage: number;
  testCaseCoverage: number;
}

export interface DashboardRunTrendDto {
  runName: string;
  label: string;
  passRate: number;
  passed: number;
  failed: number;
  total: number;
}

export interface DashboardDistributionDto {
  label: string;
  value: number;
}

export interface DashboardModuleInsightDto {
  id: number;
  name: string;
  projectName: string;
  testCaseCount: number;
  requirementCoverage: number;
  codeCoverage: number;
  passRate: number;
  openBugs: number;
  productionBugs: number;
  riskLevel: string;
  riskScore: number;
  insufficientTesting: boolean;
  recommendations: string[];
}

export interface DashboardAiInsightsDto {
  overview: string;
  highRiskModules: DashboardModuleInsightDto[];
  recommendations: string[];
}

export interface DashboardInputSourceDto {
  key: string;
  label: string;
  description: string;
  endpoint: string;
  recordCount: number;
}

export interface DashboardOverviewDto {
  summary: MetricsSummaryDto & {
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
  coverage: DashboardCoverageDto;
  trends: {
    recentRuns: DashboardRunTrendDto[];
    bugSources: DashboardDistributionDto[];
    bugTimeline: DashboardDistributionDto[];
  };
  inputSources: DashboardInputSourceDto[];
  modules: DashboardModuleInsightDto[];
  aiInsights: DashboardAiInsightsDto;
}
