import { Module } from '@nestjs/common';
import { MetricsModule } from '../metrics/metrics.module';
import { SystemModule } from '../system/system.module';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';

@Module({
  imports: [MetricsModule, SystemModule],
  controllers: [ReportingController],
  providers: [ReportingService],
})
export class ReportingModule {}
