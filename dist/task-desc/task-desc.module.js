"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDescModule = void 0;
const common_1 = require("@nestjs/common");
const task_desc_service_1 = require("./task-desc.service");
const task_desc_controller_1 = require("./task-desc.controller");
const task_desc_entity_1 = require("./entities/task-desc.entity");
const typeorm_1 = require("@nestjs/typeorm");
let TaskDescModule = class TaskDescModule {
};
TaskDescModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_desc_controller_1.TaskDescController],
        providers: [task_desc_service_1.TaskDescService],
        imports: [typeorm_1.TypeOrmModule.forFeature([task_desc_entity_1.TaskDesc])],
        exports: [task_desc_service_1.TaskDescService]
    })
], TaskDescModule);
exports.TaskDescModule = TaskDescModule;
//# sourceMappingURL=task-desc.module.js.map