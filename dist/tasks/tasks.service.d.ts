import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDescService } from 'src/task-desc/task-desc.service';
export declare class TasksService {
    private taskRepository;
    private taskDesk;
    constructor(taskRepository: Repository<Task>, taskDesk: TaskDescService);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
    findForWorker(id: number): Promise<any[]>;
    findForUser(id: number): Promise<any[]>;
}
