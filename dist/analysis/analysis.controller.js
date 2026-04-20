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
exports.AnalysisController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const analysis_service_1 = require("./analysis.service");
const retrain_service_1 = require("./retrain.service");
const platform_express_1 = require("@nestjs/platform-express");
let AnalysisController = class AnalysisController {
    analysisService;
    retrainService;
    constructor(analysisService, retrainService) {
        this.analysisService = analysisService;
        this.retrainService = retrainService;
    }
    triggerRetrain() {
        return this.retrainService.triggerAiRetraining();
    }
    refresh(body) {
        return this.analysisService.refreshAiAnalysis(body?.projectName);
    }
    analyzeUploadedFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('Please choose a file before running AI test.');
        }
        return this.analysisService.analyzeUploadedFile(file);
    }
    detectLowCoverageAreas(projectName) {
        return this.analysisService.detectLowCoverageAreas(projectName);
    }
    predictFailureModules(projectName) {
        return this.analysisService.predictFailureModules(projectName);
    }
    suggestTestCases(projectName) {
        return this.analysisService.suggestTestCases(projectName);
    }
    identifyRiskAreas(projectName) {
        return this.analysisService.identifyRiskAreas(projectName);
    }
};
exports.AnalysisController = AnalysisController;
__decorate([
    (0, common_1.Post)('retrain'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "triggerRetrain", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "analyzeUploadedFile", null);
__decorate([
    (0, common_1.Get)('low-coverage'),
    __param(0, (0, common_1.Query)('projectName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "detectLowCoverageAreas", null);
__decorate([
    (0, common_1.Get)('failure-predictions'),
    __param(0, (0, common_1.Query)('projectName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "predictFailureModules", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    __param(0, (0, common_1.Query)('projectName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "suggestTestCases", null);
__decorate([
    (0, common_1.Get)('risk-areas'),
    __param(0, (0, common_1.Query)('projectName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "identifyRiskAreas", null);
exports.AnalysisController = AnalysisController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('analysis'),
    __metadata("design:paramtypes", [analysis_service_1.AnalysisService,
        retrain_service_1.RetrainingService])
], AnalysisController);
//# sourceMappingURL=analysis.controller.js.map