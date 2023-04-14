/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
export declare class PhotoController {
    constructor();
    uploadedFile(file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            originalname: string;
            filename: string;
        };
    }>;
    getImage(image: any, res: any): {
        status: HttpStatus;
        data: any;
    };
}
