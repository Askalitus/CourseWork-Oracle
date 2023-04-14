import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(res: Response): Promise<User[]>;
    findApplicant(id: number, res: Response): Promise<{
        name: string;
        surname: string;
        patronymic: string;
        role: number;
    }>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    getRole(req: Request, res: Response): Promise<string>;
}
