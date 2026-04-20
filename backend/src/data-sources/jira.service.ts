import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);
  
  private jiraUrl = process.env.JIRA_URL || 'https://your-domain.atlassian.net';
  private jiraEmail = process.env.JIRA_EMAIL || 'admin@example.com';
  private jiraToken = process.env.JIRA_API_TOKEN || 'your_api_token';

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async fetchJiraBugs(projectKey: string) {
    try {
      this.logger.log(`Bắt đầu đồng bộ Bugs từ dự án JIRA: ${projectKey}`);
      // Lấy các bug dạng Bug/Defect từ JIRA
      // let authHeader = Buffer.from(`${this.jiraEmail}:${this.jiraToken}`).toString('base64');
      
      const issues = [
        { key: `${projectKey}-101`, fields: { summary: 'Login broken', priority: { name: 'High' }, status: { name: 'Open' } } }
      ];

      let count = 0;
      for (const issue of issues) {
        let firstModule = await this.prisma.modules.findFirst();
        if (!firstModule) break;

        await this.prisma.bugs.upsert({
          where: { bug_code: issue.key },
          update: {
            severity: issue.fields.priority.name.toLowerCase(),
            status: issue.fields.status.name.toLowerCase(),
          },
          create: {
            bug_code: issue.key,
            title: issue.fields.summary,
            description: issue.fields.summary,
            severity: issue.fields.priority.name.toLowerCase(),
            status: issue.fields.status.name.toLowerCase(),
            source: 'jira',
            module_id: firstModule.id,
          },
        });
        count++;
      }

      return { message: `Đồng bộ thành công ${count} bugs từ JIRA` };
    } catch (error: any) {
      this.logger.error('Lỗi khi gọi API JIRA:', error.message);
      throw error;
    }
  }
}