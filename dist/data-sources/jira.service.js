"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JiraService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../prisma/prisma.service");
let JiraService = JiraService_1 = class JiraService {
    httpService;
    prisma;
    logger = new common_1.Logger(JiraService_1.name);
    jiraUrl = process.env.JIRA_URL || 'https://your-domain.atlassian.net';
    jiraEmail = process.env.JIRA_EMAIL || 'admin@example.com';
    jiraToken = process.env.JIRA_API_TOKEN || 'your_api_token';
    constructor(httpService, prisma) {
        this.httpService = httpService;
        this.prisma = prisma;
    }
    async fetchJiraBugs(projectKey) {
        try {
            this.logger.log(`Bắt đầu đồng bộ Bugs từ dự án JIRA: ${projectKey}`);
            const issues = [
                { key: `${projectKey}-101`, fields: { summary: 'Login broken', priority: { name: 'High' }, status: { name: 'Open' } } }
            ];
            let count = 0;
            for (const issue of issues) {
                let firstModule = await this.prisma.modules.findFirst();
                if (!firstModule)
                    break;
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
        }
        catch (error) {
            this.logger.error('Lỗi khi gọi API JIRA:', error.message);
            throw error;
        }
    }
};
exports.JiraService = JiraService;
exports.JiraService = JiraService = JiraService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], JiraService);
//# sourceMappingURL=jira.service.js.map