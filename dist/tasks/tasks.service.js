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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const task_desc_service_1 = require("../task-desc/task-desc.service");
let TasksService = class TasksService {
    constructor(taskRepository, taskDesk) {
        this.taskRepository = taskRepository;
        this.taskDesk = taskDesk;
    }
    create(createTaskDto) {
        const task = new task_entity_1.Task();
        task.worker = createTaskDto.worker;
        task.description = createTaskDto.description;
        task.status = createTaskDto.status;
        task.comment = createTaskDto.comment;
        task.endDate = createTaskDto.endDate;
        task.status = createTaskDto.status;
        return this.taskRepository.save(task);
    }
    async findAll() {
        let tasks = await this.taskRepository.find();
        let descTask = await this.taskDesk.findAll();
        let tasksResult = [];
        tasks.forEach(task => {
            descTask.forEach(el => {
                let res = {};
                if (task.description == el.id) {
                    Object.keys(task).forEach(key => res[key] = task[key]);
                    Object.keys(el).forEach(key => res[key] = el[key]);
                    tasksResult.push(res);
                }
            });
        });
        return tasksResult;
    }
    findOne(id) {
        return this.taskRepository.findOneBy({ id: id });
    }
    async update(id, updateTaskDto) {
        const task = await this.taskRepository.findOneBy({ id: id });
        task.worker = updateTaskDto.worker;
        task.comment = updateTaskDto.comment;
        task.endDate = updateTaskDto.endDate;
        task.status = updateTaskDto.status;
        return this.taskRepository.save(task);
    }
    async remove(id) {
        await this.taskRepository.delete(id);
    }
    async findForWorker(id) {
        let tasks = await this.taskRepository.find();
        let middleArr = [];
        tasks.forEach(el => {
            if (id == el.worker) {
                middleArr.push(el);
            }
        });
        let descTask = await this.taskDesk.findAll();
        let tasksResult = [];
        middleArr.forEach(task => {
            descTask.forEach(el => {
                let res = {};
                if (task.description == el.id) {
                    Object.keys(task).forEach(key => res[key] = task[key]);
                    Object.keys(el).forEach(key => res[key] = el[key]);
                    tasksResult.push(res);
                }
            });
        });
        return tasksResult;
    }
    async findForUser(id) {
        let descTask = await this.taskDesk.findAll();
        let middleArr = [];
        descTask.forEach(el => {
            if (id == el.applicant) {
                middleArr.push(el);
            }
        });
        let tasks = await this.taskRepository.find();
        let tasksResult = [];
        middleArr.forEach(task => {
            tasks.forEach(el => {
                let res = {};
                if (task.id == el.description) {
                    Object.keys(task).forEach(key => res[key] = task[key]);
                    Object.keys(el).forEach(key => res[key] = el[key]);
                    tasksResult.push(res);
                }
            });
        });
        return tasksResult;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository, task_desc_service_1.TaskDescService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map