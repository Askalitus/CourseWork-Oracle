import { Controller, Get, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/role.decorator';
import { RoleList } from 'src/auth/roles/role.enum';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleList.Admin)
    @Get()
    async findAll():Promise<Role[]>{
        return await this.roleService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleList.Admin)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response){
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
        return await this.roleService.findOne(id)
    }
}
