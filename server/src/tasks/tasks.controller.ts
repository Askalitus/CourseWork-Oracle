import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { Public } from 'src/auth/roles/public';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Res({ passthrough: true }) res: Response) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  findAll(@Res({ passthrough: true }) res: Response){
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto):Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.tasksService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.Worker)
  @Post('worker')
  findeForWorker(@Req() req: Request){
    return this.tasksService.findForWorker(req.cookies.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleList.User)
  @Post('user')
  findeForUser(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    return this.tasksService.findForUser(req.cookies.userId)
  }
}
