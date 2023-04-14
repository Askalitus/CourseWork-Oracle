import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/role.guards';
import { PhotoModule } from './photo/photo.module';
import { MulterModule } from '@nestjs/platform-express';
import { TaskDescModule } from './task-desc/task-desc.module';
import { TaskDesc } from './task-desc/entities/task-desc.entity';
import { Role } from './role/entities/role.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { Status } from './status/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'course_project',
    entities: [User, Task, TaskDesc, Role, Status],
    synchronize: true,
  }),
  UserModule,
  TasksModule,
  AuthModule,
  PhotoModule,
  PhotoModule,
  MulterModule.register({
    dest: './upload',
  }),
  TaskDescModule,
  RoleModule,
  StatusModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }],
})
export class AppModule {}
