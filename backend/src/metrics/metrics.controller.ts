import { Controller, Get, Query } from '@nestjs/common';
import {
  MetricsService,
} from './metrics.service';
import { DashboardOverviewDto } from './dto/dashboard-overview.dto';
import {
  ChartsResponseDto,
  CoverageMetricsDto,
  DefectTrendsDto,
  EffectivenessMetricsDto,
  ModuleFilterDto,
  TimeRangeFilterDto,
} from './dto/metrics-response.dto';
import { MetricsSummaryDto } from './dto/metrics-summary.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) { }
  @Get('summary')
  getSummary(): Promise<MetricsSummaryDto> {
    return this.metricsService.getSummary();
  }

  @Get('dashboard')
  getDashboardCompat(): Promise<DashboardOverviewDto> {
    return this.metricsService.getDashboardOverview();
  }

  @Get('overview')
  getDashboardOverview(): Promise<DashboardOverviewDto> {
    return this.metricsService.getDashboardOverview();
  }

  @Get('effectiveness')
  getEffectivenessMetrics(): Promise<EffectivenessMetricsDto> {
    return this.metricsService.getEffectivenessMetrics();
  }

  @Get('test-effectiveness')
  getTestEffectivenessMetricsCompat(): Promise<EffectivenessMetricsDto> {
    return this.metricsService.getEffectivenessMetrics();
  }

  @Get('coverage')
  getCoverageMetrics(): Promise<CoverageMetricsDto> {
    return this.metricsService.getCoverageMetrics();
  }

  @Get('defect-trends')
  getDefectTrends(): Promise<DefectTrendsDto> {
    return this.metricsService.getDefectTrends();
  }

  @Get('defects')
  getDefectsCompat(): Promise<DefectTrendsDto> {
    return this.metricsService.getDefectTrends();
  }

  @Get('charts')
  renderCharts(): Promise<ChartsResponseDto> {
    return this.metricsService.renderCharts();
  }

  @Get('filter/time-range')
  filterByTimeRange(@Query('range') range = 'all'): Promise<TimeRangeFilterDto> {
    return this.metricsService.filterByTimeRange(range);
  }

  @Get('filter/module')
  filterByModule(
    @Query('moduleName') moduleName?: string,
  ): Promise<ModuleFilterDto> {
    return this.metricsService.filterByModule(moduleName);
  }
}
