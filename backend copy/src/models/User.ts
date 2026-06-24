import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { nullable } from "zod";

@Entity('users')
export class User  {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 255})
    name: string

    @Column({nullable: false, length: 255, unique: true})
    email: string
    
    @Column({nullable: false, length: 11, unique: true})
    cpf: string

    @Column({nullable: false, length: 255})
    password: string

    @Column({nullable: false})
    role: 'admin' | 'recepcionista'
}