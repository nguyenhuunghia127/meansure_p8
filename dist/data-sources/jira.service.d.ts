import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
export declare class JiraService {
    private httpService;
    private prisma;
    private readonly logger;
    private jiraUrl;
    private jiraEmail;
    private jiraToken;
    constructor(httpService: HttpService, prisma: PrismaService);
    fetchJiraBugs(projectKey: string): Promise<{
        message: string;
    }>;
}
