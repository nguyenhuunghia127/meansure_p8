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
var GithubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../prisma/prisma.service");
let GithubService = GithubService_1 = class GithubService {
    httpService;
    prisma;
    logger = new common_1.Logger(GithubService_1.name);
    constructor(httpService, prisma) {
        this.httpService = httpService;
        this.prisma = prisma;
    }
    async fetchGithubActions(repoName) {
        try {
            this.logger.log(`Fetching Github Actions test results for repo: ${repoName}`);
            const actionResults = [
                { runId: 'ga-123', status: 'completed', conclusion: 'success' },
                { runId: 'ga-124', status: 'completed', conclusion: 'failure' }
            ];
            return { message: `Đồng bộ thành công ${actionResults.length} Github Actions runs`, actions: actionResults };
        }
        catch (e) {
            this.logger.error('Error fetching Github actions', e);
            throw e;
        }
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = GithubService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], GithubService);
//# sourceMappingURL=github.service.js.map