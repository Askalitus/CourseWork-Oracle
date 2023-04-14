import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Request, Response } from 'express';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, res: Response): Promise<Task>;
    findAll(res: Response): Promise<any>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
    findeForWorker(req: Request): Promise<any[]>;
    findeForUser(req: Request, res: Response): Promise<any[]>;
}
