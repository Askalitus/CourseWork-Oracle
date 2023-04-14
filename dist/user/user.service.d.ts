import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from 'src/role/role.service';
import { User } from './entities/user.entity';
export declare class UserService {
    private usersRepository;
    private roleRepository;
    constructor(usersRepository: Repository<User>, roleRepository: RoleService);
    findAll(): Promise<User[]>;
    getWorkers(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    updateRefreshToken(id: number, refreshToken: string): Promise<User>;
    findOne(id: number): Promise<User>;
    findApplicant(userId: number): Promise<{
        name: string;
        surname: string;
        patronymic: string;
        role: number;
    }>;
    findOneByLogin(login: string): Promise<User>;
    remove(id: string): Promise<void>;
    getRole(id: number): Promise<string>;
}
