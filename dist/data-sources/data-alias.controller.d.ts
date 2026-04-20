import { JiraService } from './jira.service';
export declare class DataAliasController {
    private readonly jiraService;
    constructor(jiraService: JiraService);
    syncJiraWithParams(projectKey: string): Promise<{
        message: string;
    }>;
}
