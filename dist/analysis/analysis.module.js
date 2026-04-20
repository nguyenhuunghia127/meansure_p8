"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const system_module_1 = require("../system/system.module");
const analysis_controller_1 = require("./analysis.controller");
const analysis_alias_controller_1 = require("./analysis-alias.controller");
const ai_controller_1 = require("./ai.controller");
const analysis_service_1 = require("./analysis.service");
const retrain_service_1 = require("./retrain.service");
let AnalysisModule = class AnalysisModule {
};
exports.AnalysisModule = AnalysisModule;
exports.AnalysisModule = AnalysisModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.SystemModule, axios_1.HttpModule],
        controllers: [analysis_controller_1.AnalysisController, analysis_alias_controller_1.AnalysisAliasController, ai_controller_1.AiController],
        providers: [analysis_service_1.AnalysisService, retrain_service_1.RetrainingService],
        exports: [analysis_service_1.AnalysisService, retrain_service_1.RetrainingService],
    })
], AnalysisModule);
//# sourceMappingURL=analysis.module.js.map