import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskDescModule } from 'src/task-desc/task-desc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskDescModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
