"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const tasks_module_1 = require("./tasks/tasks.module");
const task_entity_1 = require("./tasks/entities/task.entity");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const role_guards_1 = require("./auth/roles/role.guards");
const photo_module_1 = require("./photo/photo.module");
const platform_express_1 = require("@nestjs/platform-express");
const task_desc_module_1 = require("./task-desc/task-desc.module");
const task_desc_entity_1 = require("./task-desc/entities/task-desc.entity");
const role_entity_1 = require("./role/entities/role.entity");
const role_module_1 = require("./role/role.module");
const status_module_1 = require("./status/status.module");
const status_entity_1 = require("./status/entities/status.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'course_project',
                entities: [user_entity_1.User, task_entity_1.Task, task_desc_entity_1.TaskDesc, role_entity_1.Role, status_entity_1.Status],
                synchronize: true,
            }),
            user_module_1.UserModule,
            tasks_module_1.TasksModule,
            auth_module_1.AuthModule,
            photo_module_1.PhotoModule,
            photo_module_1.PhotoModule,
            platform_express_1.MulterModule.register({
                dest: './upload',
            }),
            task_desc_module_1.TaskDescModule,
            role_module_1.RoleModule,
            status_module_1.StatusModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guards_1.RolesGuard,
            }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map