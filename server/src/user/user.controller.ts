import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Headers, UseGuards, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/roles/public';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin)
  @Get()
  findAll(@Res({ passthrough: true }) res: Response): Promise<User[]> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin, RoleList.Worker)
  @Get(':id')
  findApplicant(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.userService.findApplicant(id);
  }


  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './photo-storage',
      })
    }),
  )
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<User> {
    return this.userService.create(createUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Admin)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Post('role')
  getRole(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.userService.getRole(req.cookies.userId)
  }
}
