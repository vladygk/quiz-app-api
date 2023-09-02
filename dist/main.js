"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
const filter_1 = require("./auth/filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new filter_1.BadRequestExceptionFilter());
    await app.listen(5050);
}
bootstrap();
//# sourceMappingURL=main.js.map