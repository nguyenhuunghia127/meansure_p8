import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SystemModule } from '../system/system.module';
import { DataSourcesController } from './data-sources.controller';
import { DataSourcesService } from './data-sources.service';
import { JiraService } from './jira.service';
import { GithubService } from './github.service';

@Module({
  imports: [SystemModule, HttpModule],
  controllers: [DataSourcesController],
  providers: [DataSourcesService, JiraService, GithubService],
  exports: [DataSourcesService, JiraService, GithubService],
})
export class DataSourcesModule {}
