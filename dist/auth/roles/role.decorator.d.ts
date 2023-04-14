import { RoleList } from './role.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RoleList[]) => import("@nestjs/common").CustomDecorator<string>;
