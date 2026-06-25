import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableConfig } from "./TableConfig";

@Entity('guests')
export class Guest {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable: false, length: 255})
    name: string

    @Column({nullable: false, unique: true, length: 255})
    email: string

    @Column({nullable: false, unique: true, length: 11})
    phone: string

    @Column({nullable: true, type: 'timestamp'})
    checked_at: Date | null

    @Column({nullable: false, default: false})
    checked_in: boolean

    @ManyToOne(() => TableConfig, (t) => t.guests, {nullable: false, onDelete: 'RESTRICT'})
    @JoinColumn()
    table_number: TableConfig
}