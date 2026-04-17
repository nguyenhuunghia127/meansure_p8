"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourcesModule = void 0;
const common_1 = require("@nestjs/common");
const system_module_1 = require("../system/system.module");
const data_sources_controller_1 = require("./data-sources.controller");
const data_sources_service_1 = require("./data-sources.service");
let DataSourcesModule = class DataSourcesModule {
};
exports.DataSourcesModule = DataSourcesModule;
exports.DataSourcesModule = DataSourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.SystemModule],
        controllers: [data_sources_controller_1.DataSourcesController],
        providers: [data_sources_service_1.DataSourcesService],
        exports: [data_sources_service_1.DataSourcesService],
    })
], DataSourcesModule);
//# sourceMappingURL=data-sources.module.js.map