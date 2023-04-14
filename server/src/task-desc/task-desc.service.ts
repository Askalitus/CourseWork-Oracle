import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDescDto } from './dto/create-task-desc.dto';
import { UpdateTaskDescDto } from './dto/update-task-desc.dto';
import { TaskDesc } from './entities/task-desc.entity';
import { Request, Response } from 'express';

@Injectable()
export class TaskDescService {
  constructor(@InjectRepository(TaskDesc)
  private taskDescRepository: Repository<TaskDesc>){}
  
  create(createTaskDescDto: CreateTaskDescDto, req: Request) {
    const taskDesc = new TaskDesc()

    taskDesc.problem = createTaskDescDto.problem
    taskDesc.applicant = req.cookies.userId 
    taskDesc.cabinet = createTaskDescDto.cabinet

    return this.taskDescRepository.save(taskDesc);
  }

  async findAll():Promise<TaskDesc[]> {
    return await this.taskDescRepository.find();
  }

  async findOne(id: any):Promise<TaskDesc> {
    return await this.taskDescRepository.findOneBy({id: id}) ;
  }

  async update(id: any, updateTaskDescDto: UpdateTaskDescDto):Promise<TaskDesc> {
    const taskDesc = await this.taskDescRepository.findOneBy({id: id})

    taskDesc.problem = updateTaskDescDto.problem
    taskDesc.applicant = updateTaskDescDto.applicant
    taskDesc.cabinet = updateTaskDescDto.cabinet

    return this.taskDescRepository.save(taskDesc);
  }

  async remove(id: number):Promise<void> {
    await this.taskDescRepository.delete(id);
  }
}
