"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../role/role.service");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(usersRepository, roleRepository) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async getWorkers() {
        const users = await this.usersRepository.find();
        const workers = users.filter(u => u.role == 2);
        return workers;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User();
        user.login = createUserDto.login;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        user.name = createUserDto.name;
        user.surname = createUserDto.surname;
        user.patronymic = createUserDto.patronymic;
        user.role = createUserDto.role;
        user.photo = createUserDto.photo;
        return this.usersRepository.save(user);
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOneBy({ id: id });
        user.login = updateUserDto.login;
        if (updateUserDto.password) {
            user.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        user.name = updateUserDto.name;
        user.surname = updateUserDto.surname;
        user.patronymic = updateUserDto.patronymic;
        user.role = updateUserDto.role;
        user.refreshToken = updateUserDto.refreshToken;
        user.photo = updateUserDto.photo;
        return this.usersRepository.save(user);
    }
    async updateRefreshToken(id, refreshToken) {
        const user = await this.usersRepository.findOneBy({ id: id });
        user.refreshToken = refreshToken;
        return this.usersRepository.save(user);
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id: id });
    }
    async findApplicant(userId) {
        const _a = await this.usersRepository.findOneBy({ id: userId }), { password, id, photo, login, refreshToken, createdAt, updatedAt } = _a, user = __rest(_a, ["password", "id", "photo", "login", "refreshToken", "createdAt", "updatedAt"]);
        return user;
    }
    findOneByLogin(login) {
        return this.usersRepository.findOneBy({ login: login });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async getRole(id) {
        const _a = await this.usersRepository.findOneBy({ id: id }), { role } = _a, user = __rest(_a, ["role"]);
        const { role_name } = await this.roleRepository.findOne(role);
        return role_name;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        role_service_1.RoleService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map