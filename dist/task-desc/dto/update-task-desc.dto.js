"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDescDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_desc_dto_1 = require("./create-task-desc.dto");
class UpdateTaskDescDto extends (0, mapped_types_1.PartialType)(create_task_desc_dto_1.CreateTaskDescDto) {
}
exports.UpdateTaskDescDto = UpdateTaskDescDto;
//# sourceMappingURL=update-task-desc.dto.js.map