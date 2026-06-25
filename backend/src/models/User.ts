import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 255})
    name: string

    @Column({nullable: false, unique: true, length: 255})
    email: string

    @Column({nullable: false, length: 255})
    password: string

    @Column({nullable: false, unique: true, length: 11})
    cpf: string

    @Column({nullable: false})
    role: 'admin' | 'cerimonialista'
}