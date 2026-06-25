import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Guest } from "./Guest";

@Entity('table_config')
export class TableConfig {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable: false})
    table_number: number

    @Column({nullable: false})
    max_length: number

    @OneToMany(() => Guest, (g) => g.table_number)
    guests: Guest[]
}