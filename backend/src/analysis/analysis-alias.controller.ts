import { Controller, Post, UseGuards } from '@nestjs/common';
import { RetrainingService } from './retrain.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('analysis')
export class AnalysisAliasController {
  constructor(private readonly retrainService: RetrainingService) {}

  @Post('retrain-ai')
  triggerRetrainAi() {
    return this.retrainService.triggerAiRetraining();
  }
}
