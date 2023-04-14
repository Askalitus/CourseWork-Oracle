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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const constants_1 = require("./constants");
const role_service_1 = require("../role/role.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, roleService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.roleService = roleService;
    }
    async signIn(data, res) {
        const user = await this.userService.findOneByLogin(data.username);
        if (!user)
            throw new common_1.BadRequestException('Неправильно введен логин!');
        const { password, login, refreshToken, id, role, createdAt, updatedAt } = user, userData = __rest(user, ["password", "login", "refreshToken", "id", "role", "createdAt", "updatedAt"]);
        const passwordMatches = await bcrypt.compare(data.password, password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Неправильно введен пароль!');
        const roleName = await this.roleService.findOne(user.role);
        const tokens = await this.getTokens(user.id, user.login);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        res.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: false });
        res.cookie('role', roleName.role_name, { httpOnly: true, secure: false });
        res.cookie('userId', user.id, { httpOnly: true, secure: false });
        return userData;
    }
    async logout(userId, res) {
        res.cookie('accessToken', null, { httpOnly: true, secure: false });
        res.cookie('refreshToken', null, { httpOnly: true, secure: false });
        res.cookie('role', null, { httpOnly: true, secure: false });
        res.cookie('userId', null, { httpOnly: true, secure: false });
        return this.userService.update(userId, { refreshToken: null });
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getTokens(userId, username) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {
                secret: constants_1.jwtConstants.secret,
                expiresIn: '1h',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {
                secret: constants_1.jwtConstants.secret,
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService, role_service_1.RoleService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map