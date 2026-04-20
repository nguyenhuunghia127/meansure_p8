import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SystemModule } from '../system/system.module';
import { AnalysisController } from './analysis.controller';
import { AnalysisAliasController } from './analysis-alias.controller';
import { AiController } from './ai.controller';
import { AnalysisService } from './analysis.service';
import { RetrainingService } from './retrain.service';

@Module({
  imports: [SystemModule, HttpModule],
  controllers: [AnalysisController, AnalysisAliasController, AiController],
  providers: [AnalysisService, RetrainingService],
  exports: [AnalysisService, RetrainingService],
})
export class AnalysisModule {}
