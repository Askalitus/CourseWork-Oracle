import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/roles/public';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  findAll():Promise<Status[]> {
    return this.statusService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Status> {
    return this.statusService.findOne(id);
  }
}
