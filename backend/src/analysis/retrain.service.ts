import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RetrainingService {
  private readonly logger = new Logger(RetrainingService.name);

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async triggerAiRetraining() {
    this.logger.log('Đang thu thập dữ liệu module để gửi cho AI...');
    
    // Lấy toàn bộ module làm dữ liệu huấn luyện (query bugs và test_results từ Prisma)
    const modulesRes = await this.prisma.modules.findMany({
      include: { bugs: true, test_cases: { include: { test_results: true } } }
    });

    // Xử lý dữ liệu thô thành Feature cho AI
    const trainingData = modulesRes.map((mod: any) => {
      const prodBugs = mod.bugs.filter((b: any) => b.source === 'production').length;
      const testBugs = mod.bugs.filter((b: any) => b.source === 'testing').length;
      
      let riskLabel = 0; 
      if (prodBugs > 2) riskLabel = 2;
      else if (prodBugs > 0 || testBugs > 5) riskLabel = 1;

      return {
        reqCoverage: Math.random() * 100,
        passRate: Math.random() * 100, 
        testingBugs: testBugs,
        productionBugs: prodBugs,
        riskLevel: riskLabel
      };
    });

    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:5000/train', trainingData)
      );
      this.logger.log(`Kết quả train: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (e: any) {
      this.logger.error('Lỗi khi gọi API AI:', e.message);
      throw e;
    }
  }
}