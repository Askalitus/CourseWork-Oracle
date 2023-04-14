import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Status {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 20, nullable: false })
    status_name: string
}
