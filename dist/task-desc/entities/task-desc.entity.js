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
exports.TaskDesc = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let TaskDesc = class TaskDesc {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], TaskDesc.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255, nullable: false }),
    __metadata("design:type", String)
], TaskDesc.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'applicant', referencedColumnName: 'id', foreignKeyConstraintName: 'applicantId' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TaskDesc.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 4, nullable: false }),
    __metadata("design:type", String)
], TaskDesc.prototype, "cabinet", void 0);
TaskDesc = __decorate([
    (0, typeorm_1.Entity)()
], TaskDesc);
exports.TaskDesc = TaskDesc;
//# sourceMappingURL=task-desc.entity.js.map