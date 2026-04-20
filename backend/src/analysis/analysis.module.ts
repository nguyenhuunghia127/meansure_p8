import { Module } from '@nestjs/common';
import { SystemModule } from '../system/system.module';
import { AnalysisController } from './analysis.controller';
import { AiController } from './ai.controller';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [SystemModule],
  controllers: [AnalysisController, AiController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
