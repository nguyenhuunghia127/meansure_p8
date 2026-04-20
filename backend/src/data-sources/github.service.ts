import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async fetchGithubActions(repoName: string) {
    try {
      this.logger.log(`Fetching Github Actions test results for repo: ${repoName}`);
      
      // Simulate Github Actions response
      const actionResults = [
        { runId: 'ga-123', status: 'completed', conclusion: 'success' },
        { runId: 'ga-124', status: 'completed', conclusion: 'failure' }
      ];

      return { message: `Đồng bộ thành công ${actionResults.length} Github Actions runs`, actions: actionResults };
    } catch (e) {
      this.logger.error('Error fetching Github actions', e);
      throw e;
    }
  }
}
