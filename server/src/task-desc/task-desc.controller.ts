import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Res, Req } from '@nestjs/common';
import { TaskDescService } from './task-desc.service';
import { CreateTaskDescDto } from './dto/create-task-desc.dto';
import { UpdateTaskDescDto } from './dto/update-task-desc.dto';
import { TaskDesc } from './entities/task-desc.entity';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { Public } from 'src/auth/roles/public';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('task-desc')
export class TaskDescController {
  constructor(private readonly taskDescService: TaskDescService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Post()
  create(@Body() createTaskDescDto: CreateTaskDescDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.taskDescService.create(createTaskDescDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  findAll():Promise<TaskDesc[]> {
    return this.taskDescService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDescDto: UpdateTaskDescDto,  @Res({ passthrough: true }) res: Response):Promise<TaskDesc> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.taskDescService.update(id, updateTaskDescDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.taskDescService.remove(id);
  }
}
