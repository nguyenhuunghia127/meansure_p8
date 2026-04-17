import { Controller, Get } from '@nestjs/common';
import { ReportingService } from './reporting.service';

@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('summary')
  generateSummaryReport() {
    return this.reportingService.generateSummaryReport();
  }

  @Get('excel')
  exportReportExcel() {
    return this.reportingService.exportReportExcel();
  }

  @Get('pdf')
  exportReportPDF() {
    return this.reportingService.exportReportPDF();
  }
}
