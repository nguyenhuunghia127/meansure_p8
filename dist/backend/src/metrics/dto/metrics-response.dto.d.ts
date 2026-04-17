import { DashboardModuleInsightDto, DashboardRunTrendDto } from './dashboard-overview.dto';
export interface EffectivenessMetricsDto {
    executionRate: number;
    passFailRatio: string;
    defectDetectionPercentage: number;
    defectLeakageRate: number;
    totalTestCases: number;
    totalTestRuns: number;
}
export interface CoverageMetricsDto {
    requirementCoverage: number;
    codeCoverage: number;
    testCaseCoverage: number;
}
export interface DefectTrendPointDto {
    label: string;
    value: number;
}
export interface DefectTrendsDto {
    recentRuns: DashboardRunTrendDto[];
    bugSources: DefectTrendPointDto[];
    bugTimeline: DefectTrendPointDto[];
}
export interface ChartSeriesItemDto {
    label: string;
    value?: number;
    passRate?: number;
    passed?: number;
    failed?: number;
    total?: number;
    runName?: string;
}
export interface ChartConfigDto {
    type: 'bar' | 'stack';
    title: string;
    series: ChartSeriesItemDto[];
}
export interface ChartsResponseDto {
    charts: ChartConfigDto[];
}
export interface TimeRangeFilterDto {
    range: string;
    trends: DefectTrendsDto;
    note: string;
}
export interface ModuleFilterDto {
    moduleName: string;
    modules: DashboardModuleInsightDto[];
}
