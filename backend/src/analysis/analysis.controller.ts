import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('refresh')
  refresh(@Body() body?: { projectName?: string }) {
    return this.analysisService.refreshAiAnalysis(body?.projectName);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  analyzeUploadedFile(
    @UploadedFile()
    file?: {
      originalname: string;
      mimetype: string;
      size: number;
      buffer: Buffer;
    },
  ) {
    if (!file) {
      throw new BadRequestException('Please choose a file before running AI test.');
    }

    return this.analysisService.analyzeUploadedFile(file);
  }

  @Get('low-coverage')
  detectLowCoverageAreas(@Query('projectName') projectName?: string) {
    return this.analysisService.detectLowCoverageAreas(projectName);
  }

  @Get('failure-predictions')
  predictFailureModules(@Query('projectName') projectName?: string) {
    return this.analysisService.predictFailureModules(projectName);
  }

  @Get('suggestions')
  suggestTestCases(@Query('projectName') projectName?: string) {
    return this.analysisService.suggestTestCases(projectName);
  }

  @Get('risk-areas')
  identifyRiskAreas(@Query('projectName') projectName?: string) {
    return this.analysisService.identifyRiskAreas(projectName);
  }
}
