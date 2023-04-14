import { Module } from '@nestjs/common';
import { TaskDescService } from './task-desc.service';
import { TaskDescController } from './task-desc.controller';
import { TaskDesc } from './entities/task-desc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TaskDescController],
  providers: [TaskDescService],
  imports: [TypeOrmModule.forFeature([TaskDesc])],
  exports: [TaskDescService]
})
export class TaskDescModule {}
