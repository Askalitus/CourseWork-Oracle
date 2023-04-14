import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDescService } from 'src/task-desc/task-desc.service';

@Injectable()
export class TasksService {
  constructor( @InjectRepository(Task)
  private taskRepository: Repository<Task>, private taskDesk: TaskDescService){}
  
  create(createTaskDto: CreateTaskDto):Promise<Task>{
    const task = new Task();
    task.worker = createTaskDto.worker
    task.description = createTaskDto.description
    task.status = createTaskDto.status
    task.comment = createTaskDto.comment
    task.endDate = createTaskDto.endDate
    task.status = createTaskDto.status
    return this.taskRepository.save(task);
  }

  async findAll():Promise<any>{
    let tasks = await this.taskRepository.find()
    let descTask = await this.taskDesk.findAll()

    let tasksResult = []

    tasks.forEach( task => {
      descTask.forEach(el => {
        let res = {}
        if(task.description == el.id){
          Object.keys(task).forEach(key => res[key] = task[key])
          Object.keys(el).forEach(key => res[key] = el[key])
          tasksResult.push(res)
        }
      })
    })
    return tasksResult;
  }

  findOne(id: number):Promise<Task> {
    return this.taskRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto):Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
    task.worker = updateTaskDto.worker
    task.comment = updateTaskDto.comment
    task.endDate = updateTaskDto.endDate
    task.status = updateTaskDto.status
    return this.taskRepository.save(task);
  }

  async remove(id: number):Promise<void> {
    await this.taskRepository.delete(id);
  }

  async findForWorker(id: number){
    let tasks = await this.taskRepository.find()
    let middleArr = []

    tasks.forEach(el => {
      if(id == el.worker){
        middleArr.push(el)
      }
    })

    let descTask = await this.taskDesk.findAll()
    let tasksResult = []

    middleArr.forEach( task => {
      descTask.forEach(el => {
        let res = {}
        if(task.description == el.id){
          Object.keys(task).forEach(key => res[key] = task[key])
          Object.keys(el).forEach(key => res[key] = el[key])
          tasksResult.push(res)
        }
      })
    })
    return tasksResult
  }

  async findForUser(id: number){
    let descTask = await this.taskDesk.findAll()
    let middleArr = []
    descTask.forEach(el => {
      if(id == el.applicant){
        middleArr.push(el)
      }
    })

    let tasks = await this.taskRepository.find()
    let tasksResult = []

    middleArr.forEach( task => {
      tasks.forEach(el => {
        let res = {}
        if(task.id == el.description){
          Object.keys(task).forEach(key => res[key] = task[key])
          Object.keys(el).forEach(key => res[key] = el[key])
          tasksResult.push(res)
        }
      })
    })
    return tasksResult
  }
}
