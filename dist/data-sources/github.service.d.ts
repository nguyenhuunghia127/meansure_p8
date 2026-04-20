import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
export declare class GithubService {
    private httpService;
    private prisma;
    private readonly logger;
    constructor(httpService: HttpService, prisma: PrismaService);
    fetchGithubActions(repoName: string): Promise<{
        message: string;
        actions: {
            runId: string;
            status: string;
            conclusion: string;
        }[];
    }>;
}
