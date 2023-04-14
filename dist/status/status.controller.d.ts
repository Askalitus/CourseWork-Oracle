import { Status } from './entities/status.entity';
import { StatusService } from './status.service';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    findAll(): Promise<Status[]>;
    findOne(id: number): Promise<Status>;
}
