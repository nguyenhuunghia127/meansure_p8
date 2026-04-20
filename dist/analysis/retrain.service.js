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
var RetrainingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrainingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../prisma/prisma.service");
const rxjs_1 = require("rxjs");
let RetrainingService = RetrainingService_1 = class RetrainingService {
    httpService;
    prisma;
    logger = new common_1.Logger(RetrainingService_1.name);
    constructor(httpService, prisma) {
        this.httpService = httpService;
        this.prisma = prisma;
    }
    async triggerAiRetraining() {
        this.logger.log('Đang thu thập dữ liệu module để gửi cho AI...');
        const modulesRes = await this.prisma.modules.findMany({
            include: { bugs: true, test_cases: { include: { test_results: true } } }
        });
        const trainingData = modulesRes.map((mod) => {
            const prodBugs = mod.bugs.filter((b) => b.source === 'production').length;
            const testBugs = mod.bugs.filter((b) => b.source === 'testing').length;
            let riskLabel = 0;
            if (prodBugs > 2)
                riskLabel = 2;
            else if (prodBugs > 0 || testBugs > 5)
                riskLabel = 1;
            return {
                reqCoverage: Math.random() * 100,
                passRate: Math.random() * 100,
                testingBugs: testBugs,
                productionBugs: prodBugs,
                riskLevel: riskLabel
            };
        });
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('http://localhost:5000/train', trainingData));
            this.logger.log(`Kết quả train: ${JSON.stringify(response.data)}`);
            return response.data;
        }
        catch (e) {
            this.logger.error('Lỗi khi gọi API AI:', e.message);
            throw e;
        }
    }
};
exports.RetrainingService = RetrainingService;
exports.RetrainingService = RetrainingService = RetrainingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], RetrainingService);
//# sourceMappingURL=retrain.service.js.map