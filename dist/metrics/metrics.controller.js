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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const metrics_service_1 = require("./metrics.service");
let MetricsController = class MetricsController {
    metricsService;
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    getSummary() {
        return this.metricsService.getSummary();
    }
    getDashboardOverview() {
        return this.metricsService.getDashboardOverview();
    }
    getEffectivenessMetrics() {
        return this.metricsService.getEffectivenessMetrics();
    }
    getTestEffectivenessMetricsCompat() {
        return this.metricsService.getEffectivenessMetrics();
    }
    getCoverageMetrics() {
        return this.metricsService.getCoverageMetrics();
    }
    getDefectTrends() {
        return this.metricsService.getDefectTrends();
    }
    getDefectsCompat() {
        return this.metricsService.getDefectTrends();
    }
    renderCharts() {
        return this.metricsService.renderCharts();
    }
    filterByTimeRange(range = 'all') {
        return this.metricsService.filterByTimeRange(range);
    }
    filterByModule(moduleName) {
        return this.metricsService.filterByModule(moduleName);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getDashboardOverview", null);
__decorate([
    (0, common_1.Get)('effectiveness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getEffectivenessMetrics", null);
__decorate([
    (0, common_1.Get)('test-effectiveness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getTestEffectivenessMetricsCompat", null);
__decorate([
    (0, common_1.Get)('coverage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getCoverageMetrics", null);
__decorate([
    (0, common_1.Get)('defect-trends'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getDefectTrends", null);
__decorate([
    (0, common_1.Get)('defects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getDefectsCompat", null);
__decorate([
    (0, common_1.Get)('charts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "renderCharts", null);
__decorate([
    (0, common_1.Get)('filter/time-range'),
    __param(0, (0, common_1.Query)('range')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "filterByTimeRange", null);
__decorate([
    (0, common_1.Get)('filter/module'),
    __param(0, (0, common_1.Query)('moduleName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "filterByModule", null);
exports.MetricsController = MetricsController = __decorate([
    (0, common_1.Controller)('metrics'),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map