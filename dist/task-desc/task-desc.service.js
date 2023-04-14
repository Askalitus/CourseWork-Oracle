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
exports.TaskDescService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_desc_entity_1 = require("./entities/task-desc.entity");
let TaskDescService = class TaskDescService {
    constructor(taskDescRepository) {
        this.taskDescRepository = taskDescRepository;
    }
    create(createTaskDescDto, req) {
        const taskDesc = new task_desc_entity_1.TaskDesc();
        taskDesc.problem = createTaskDescDto.problem;
        taskDesc.applicant = req.cookies.userId;
        taskDesc.cabinet = createTaskDescDto.cabinet;
        return this.taskDescRepository.save(taskDesc);
    }
    async findAll() {
        return await this.taskDescRepository.find();
    }
    async findOne(id) {
        return await this.taskDescRepository.findOneBy({ id: id });
    }
    async update(id, updateTaskDescDto) {
        const taskDesc = await this.taskDescRepository.findOneBy({ id: id });
        taskDesc.problem = updateTaskDescDto.problem;
        taskDesc.applicant = updateTaskDescDto.applicant;
        taskDesc.cabinet = updateTaskDescDto.cabinet;
        return this.taskDescRepository.save(taskDesc);
    }
    async remove(id) {
        await this.taskDescRepository.delete(id);
    }
};
TaskDescService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_desc_entity_1.TaskDesc)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskDescService);
exports.TaskDescService = TaskDescService;
//# sourceMappingURL=task-desc.service.js.map