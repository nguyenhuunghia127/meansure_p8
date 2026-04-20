import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('ai')
export class AiController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('predict-risk')
  predictRisk(@Query('projectName') projectName?: string) {
    return this.analysisService.predictFailureModules(projectName);
  }

  @Get('suggest-tests')
  suggestTests(@Query('projectName') projectName?: string) {
    return this.analysisService.suggestTestCases(projectName);
  }
}
