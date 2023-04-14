import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(data: AuthDto, res: Response): Promise<{
        name: string;
        surname: string;
        patronymic: string;
        photo: string;
    }>;
    logout(req: Request, res: Response): void;
}
