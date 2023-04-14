import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 20, nullable: false})
    login:string

    @Column("varchar", { length: 255, nullable: false})
    password:string

    @Column("varchar", { length: 30, nullable: false})
    name: string

    @Column("varchar", { length: 30, nullable: false})
    surname: string

    @Column("varchar", { length: 30, nullable: false})
    patronymic: string

    @ManyToOne(type => Role, role => role.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: 'role', referencedColumnName: 'id', foreignKeyConstraintName: 'roleId'})
    @Column({nullable: true})
    role: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column("varchar", { length: 255, nullable: true })
    refreshToken: string
    
    @Column("varchar", { length: 255, nullable: true })
    photo: string
}
