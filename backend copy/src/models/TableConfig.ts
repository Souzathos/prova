import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Guest } from "./Guest";

@Entity('tables_config')
export class TableConfig {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    table_number: number

    @Column({nullable: false})
    max_lenght: number

    @OneToMany(() => Guest, (g) => g.table_number)
    guests: Guest[] 
}