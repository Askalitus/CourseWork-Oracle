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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const task_desc_entity_1 = require("../../task-desc/entities/task-desc.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const status_entity_1 = require("../../status/entities/status.entity");
let Task = class Task {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => task_desc_entity_1.TaskDesc, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'description', referencedColumnName: 'id', foreignKeyConstraintName: 'descriptionId' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'worker', referencedColumnName: 'id', foreignKeyConstraintName: 'workerId' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Task.prototype, "worker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => status_entity_1.Status, status => status.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'status', referencedColumnName: 'id', foreignKeyConstraintName: 'statusId' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Task.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30, nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "comment", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)()
], Task);
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map