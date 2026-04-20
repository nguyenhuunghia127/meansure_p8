import { MetricsService } from './metrics.service';
import { DashboardOverviewDto } from './dto/dashboard-overview.dto';
import { ChartsResponseDto, CoverageMetricsDto, DefectTrendsDto, EffectivenessMetricsDto, ModuleFilterDto, TimeRangeFilterDto } from './dto/metrics-response.dto';
import { MetricsSummaryDto } from './dto/metrics-summary.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    getSummary(): Promise<MetricsSummaryDto>;
    getDashboardOverview(): Promise<DashboardOverviewDto>;
    getEffectivenessMetrics(): Promise<EffectivenessMetricsDto>;
    getTestEffectivenessMetricsCompat(): Promise<EffectivenessMetricsDto>;
    getCoverageMetrics(): Promise<CoverageMetricsDto>;
    getDefectTrends(): Promise<DefectTrendsDto>;
    getDefectsCompat(): Promise<DefectTrendsDto>;
    renderCharts(): Promise<ChartsResponseDto>;
    filterByTimeRange(range?: string): Promise<TimeRangeFilterDto>;
    filterByModule(moduleName?: string): Promise<ModuleFilterDto>;
}
