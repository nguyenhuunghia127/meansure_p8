import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSourcesService } from './data-sources.service';

@Controller('data-sources')
export class DataSourcesController {
  constructor(private readonly dataSourcesService: DataSourcesService) {}

  @Get('templates')
  getTemplates() {
    return this.dataSourcesService.getTemplates();
  }

  @Post('import-file')
  @UseInterceptors(FileInterceptor('file'))
  importFromFile(
    @UploadedFile()
    file?: {
      originalname: string;
      mimetype: string;
      size: number;
      buffer: Buffer;
    },
    @Body()
    body?: {
      importType?: string;
      projectName?: string;
      moduleName?: string;
      runName?: string;
      tracker?: string;
      repository?: string;
    },
  ) {
    if (!file) {
      throw new BadRequestException('Please choose a file to import.');
    }

    return this.dataSourcesService.importFromStructuredFile(file, body ?? {});
  }

  @Post('test-case-repositories')
  importTestCaseRepository(@Body() body: Record<string, unknown>) {
    return this.dataSourcesService.importTestCases(body);
  }

  @Post('execution-reports')
  importExecutionReport(@Body() body: Record<string, unknown>) {
    return this.dataSourcesService.importTestExecution(body);
  }

  @Post('bug-tracking')
  importBugTracking(@Body() body: Record<string, unknown>) {
    return this.dataSourcesService.syncBugData(body);
  }

  @Post('code-repository')
  importCodeRepository(@Body() body: Record<string, unknown>) {
    return this.dataSourcesService.connectRepo(body);
  }
}
