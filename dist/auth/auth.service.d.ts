import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { RoleService } from 'src/role/role.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private roleService;
    constructor(userService: UserService, jwtService: JwtService, roleService: RoleService);
    signIn(data: AuthDto, res: Response): Promise<{
        name: string;
        surname: string;
        patronymic: string;
        photo: string;
    }>;
    logout(userId: number, res: Response): Promise<import("../user/entities/user.entity").User>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    hashData(data: string): any;
    getTokens(userId: number, username: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
