import { Repository } from 'typeorm';
import { CreateTaskDescDto } from './dto/create-task-desc.dto';
import { UpdateTaskDescDto } from './dto/update-task-desc.dto';
import { TaskDesc } from './entities/task-desc.entity';
import { Request } from 'express';
export declare class TaskDescService {
    private taskDescRepository;
    constructor(taskDescRepository: Repository<TaskDesc>);
    create(createTaskDescDto: CreateTaskDescDto, req: Request): Promise<TaskDesc>;
    findAll(): Promise<TaskDesc[]>;
    findOne(id: any): Promise<TaskDesc>;
    update(id: any, updateTaskDescDto: UpdateTaskDescDto): Promise<TaskDesc>;
    remove(id: number): Promise<void>;
}
