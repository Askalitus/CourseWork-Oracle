export class CreateUserDto {
    id: number
    login:string
    password:string
    name: string
    surname: string
    patronymic: string
    role: number
    createdAt: Date
    updatedAt: Date
    refreshToken: string
    photo: string
}
