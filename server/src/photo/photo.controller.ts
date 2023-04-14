import { Controller, Get, Post,UseInterceptors, UploadedFile, Res, Param, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { UserService } from 'src/user/user.service';
import { Express } from 'express';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { Public } from 'src/auth/roles/public';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('photo')
export class PhotoController {
  constructor() {}

  // upload single file

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './photo-storage',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './photo-storage' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
