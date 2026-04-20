import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('data')
export class DataAliasController {
  constructor(private readonly jiraService: JiraService) {}

  @Post('sync/jira/:projectKey')
  syncJiraWithParams(@Param('projectKey') projectKey: string) {
    return this.jiraService.fetchJiraBugs(projectKey);
  }
}
