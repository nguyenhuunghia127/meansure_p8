"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const node_path_1 = require("node:path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, node_path_1.join)(process.cwd(), 'frontend'));
    app.setGlobalPrefix('api/v1', {
        exclude: [{ path: '', method: common_1.RequestMethod.GET }],
    });
    app.enableCors();
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
}
void bootstrap();
//# sourceMappingURL=main.js.map