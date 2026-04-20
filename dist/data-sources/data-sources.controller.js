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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourcesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const data_sources_service_1 = require("./data-sources.service");
const jira_service_1 = require("./jira.service");
const github_service_1 = require("./github.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DataSourcesController = class DataSourcesController {
    dataSourcesService;
    jiraService;
    githubService;
    constructor(dataSourcesService, jiraService, githubService) {
        this.dataSourcesService = dataSourcesService;
        this.jiraService = jiraService;
        this.githubService = githubService;
    }
    syncJira() {
        return this.jiraService.fetchJiraBugs('PROJ');
    }
    syncGithub() {
        return this.githubService.fetchGithubActions('my-repo');
    }
    getTemplates() {
        return this.dataSourcesService.getTemplates();
    }
    importFromFile(file, body) {
        if (!file) {
            throw new common_1.BadRequestException('Please choose a file to import.');
        }
        return this.dataSourcesService.importFromStructuredFile(file, body ?? {});
    }
    importTestCaseRepository(body) {
        return this.dataSourcesService.importTestCases(body);
    }
    importExecutionReport(body) {
        return this.dataSourcesService.importTestExecution(body);
    }
    importBugTracking(body) {
        return this.dataSourcesService.syncBugData(body);
    }
    importCodeRepository(body) {
        return this.dataSourcesService.connectRepo(body);
    }
};
exports.DataSourcesController = DataSourcesController;
__decorate([
    (0, common_1.Post)('jira/sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "syncJira", null);
__decorate([
    (0, common_1.Post)('github/actions/sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "syncGithub", null);
__decorate([
    (0, common_1.Get)('templates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('import-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "importFromFile", null);
__decorate([
    (0, common_1.Post)('test-case-repositories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "importTestCaseRepository", null);
__decorate([
    (0, common_1.Post)('execution-reports'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "importExecutionReport", null);
__decorate([
    (0, common_1.Post)('bug-tracking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "importBugTracking", null);
__decorate([
    (0, common_1.Post)('code-repository'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataSourcesController.prototype, "importCodeRepository", null);
exports.DataSourcesController = DataSourcesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('data-sources'),
    __metadata("design:paramtypes", [data_sources_service_1.DataSourcesService,
        jira_service_1.JiraService,
        github_service_1.GithubService])
], DataSourcesController);
//# sourceMappingURL=data-sources.controller.js.map