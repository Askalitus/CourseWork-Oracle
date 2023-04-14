import { TaskDescService } from './task-desc.service';
import { CreateTaskDescDto } from './dto/create-task-desc.dto';
import { UpdateTaskDescDto } from './dto/update-task-desc.dto';
import { TaskDesc } from './entities/task-desc.entity';
import { Request, Response } from 'express';
export declare class TaskDescController {
    private readonly taskDescService;
    constructor(taskDescService: TaskDescService);
    create(createTaskDescDto: CreateTaskDescDto, res: Response, req: Request): Promise<TaskDesc>;
    findAll(): Promise<TaskDesc[]>;
    update(id: number, updateTaskDescDto: UpdateTaskDescDto, res: Response): Promise<TaskDesc>;
    remove(id: number): Promise<void>;
}
