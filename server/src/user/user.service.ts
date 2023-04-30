import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleRepository: RoleService
  ){}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async getWorkers(): Promise<User[]> {
    const users = await this.usersRepository.find()
    const workers = users.filter(u => u.role == 2)
    return workers
  }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<User> {
    const user = new User();
    user.login = createUserDto.login
    user.password = await bcrypt.hash(createUserDto.password, 10)
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;
    user.patronymic = createUserDto.patronymic;
    user.role = createUserDto.role;
    if(file){
      user.photo = file.filename
    }

    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User>{
    const user = await this.usersRepository.findOneBy({id: id});
    user.login = updateUserDto.login
    if(updateUserDto.password){
      user.password = await bcrypt.hash(updateUserDto.password, 10)
    }
    user.name = updateUserDto.name;
    user.surname = updateUserDto.surname;
    user.patronymic = updateUserDto.patronymic;
    user.role = updateUserDto.role;
    user.refreshToken = updateUserDto.refreshToken
    user.photo = updateUserDto.photo

    return this.usersRepository.save(user);
  }

  async updateRefreshToken(id: number, refreshToken: string){
    const user = await this.usersRepository.findOneBy({ id: id })

    user.refreshToken = refreshToken

    return this.usersRepository.save(user)
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findApplicant(userId: number){
    const {password, id, photo, login, refreshToken, createdAt, updatedAt, ...user} =  await this.usersRepository.findOneBy({ id: userId })
    return user
  }

  findOneByLogin(login: string): Promise<User> {
    return this.usersRepository.findOneBy({login: login});
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getRole(id: number):Promise<string>{
    const {role, ...user} = await this.usersRepository.findOneBy({ id: id })
    const {role_name} = await this.roleRepository.findOne(role)
    return role_name
  }
}
