import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableConfig } from "./TableConfig";

@Entity('guests')
export class Guest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @Column({ nullable: false, length: 255, unique: true })
    email: string

    @Column({ nullable: false, length: 11, unique: true })
    cpf: string

    @Column({ nullable: false, length: 11, unique: true })
    phone: string

    @Column({ nullable: false, default: false })
    checked_in: boolean

    @Column({type: 'timestamp', nullable: true})
    checked_at: Date | null

    @ManyToOne(() => TableConfig, (t) => t.guests, {nullable: false, onDelete: 'RESTRICT'})
    @JoinColumn()
    table_number: TableConfig
    
}