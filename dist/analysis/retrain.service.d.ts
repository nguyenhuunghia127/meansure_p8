import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
export declare class RetrainingService {
    private httpService;
    private prisma;
    private readonly logger;
    constructor(httpService: HttpService, prisma: PrismaService);
    triggerAiRetraining(): Promise<any>;
}
