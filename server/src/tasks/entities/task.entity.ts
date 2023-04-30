import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { TaskDesc } from "src/task-desc/entities/task-desc.entity";
import { User } from "src/user/entities/user.entity";
import { Status } from "src/status/entities/status.entity";
@Entity()
export class Task {

    @PrimaryGeneratedColumn("increment")
    id: number

    @OneToOne(type => TaskDesc, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({name: 'description', referencedColumnName: 'id', foreignKeyConstraintName: 'descriptionId'})
    @Column()
    description: number

    @ManyToOne(type => User, user => user.id, { cascade: true, onDelete: "SET NULL", onUpdate: "SET NULL"})
    @JoinColumn({name: 'worker', referencedColumnName: 'id', foreignKeyConstraintName: 'workerId'})
    @Column({nullable: true})
    worker: number

    @ManyToOne(type => Status, status => status.id, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: 'status', referencedColumnName: 'id', foreignKeyConstraintName: 'statusId'})
    @Column()
    status: number

    @CreateDateColumn()
    startDate: Date

    @Column({nullable: true})
    endDate: Date

    @Column("varchar", { length: 30, nullable: true})
    comment: string
}
