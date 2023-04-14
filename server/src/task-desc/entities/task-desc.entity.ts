import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskDesc {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 255, nullable: false })
    problem:string

    @ManyToOne(type => User, user => user.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: 'applicant', referencedColumnName: 'id', foreignKeyConstraintName: 'applicantId'})
    @Column()
    applicant: number

    @Column("varchar", { length: 4, nullable: false})
    cabinet: string

}
