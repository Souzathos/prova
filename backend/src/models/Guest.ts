import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('guests')
export class Guest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 255})
    name: string

    @Column({nullable: false, length: 255, unique: true}) 
    email: string

    @Column({nullable: false, length: 11, unique: true}) 
    phone: string

    @Column({nullable: false})
    table_number: number

    @Column({nullable: false, default: false})
    checked_in: boolean
    
}