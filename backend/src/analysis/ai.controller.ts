import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalysisService } from './analysis.service';

@UseGuards(AuthGuard('jwt'))
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
