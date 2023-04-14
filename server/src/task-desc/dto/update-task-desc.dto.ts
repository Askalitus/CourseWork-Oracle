import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDescDto } from './create-task-desc.dto';

export class UpdateTaskDescDto extends PartialType(CreateTaskDescDto) {}
