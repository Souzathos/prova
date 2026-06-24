import { Like } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Guest } from "../models/Guest";
import { TableConfig } from "../models/TableConfig";

export class GuestService {
    private repo = AppDataSource.getRepository(Guest)
    private tableRepo = AppDataSource.getRepository(TableConfig)

    async register(data: any) {
        const exists = await this.repo.findOne({where: {email: data.email}})
        if(exists) throw new Error('E-mail já cadastrado')
        const cpfExists = await this.repo.findOne({where: {cpf: data.cpf}})
        if(cpfExists) throw new Error('CPF já cadastrado')

        const tableConfig = await this.tableRepo.findOne({
            where: {table_number: data.table_number},
            relations: {guests: true}
        })
        if(!tableConfig) throw new Error('Mesa não encontrada')
        if(tableConfig.guests.length >= tableConfig.max_length) {
            throw new Error(`Mesa ${tableConfig.table_number} está lotada. Capacidade máxima: ${tableConfig.max_length}`)
        }

        const guest = this.repo.create({...data, table_number: tableConfig})
        return this.repo.save(guest)
    }

    async list(name?:string, table_number?:number) {
        const where: any = {}

        if(name) where.name = Like(`%${name}%`)
        if(table_number) where.table_number = {table_number: table_number}

        return this.repo.find({
            where,
            relations: {table_number: true}
        })
    }

    async update(guestId:number, data: any) {
        const exists = await this.repo.findOneBy({id: guestId})
        if(!exists) throw new Error('Convidado não encontrado')
        if(data.table_number) {
            const table = await this.tableRepo.findOne({where: {table_number: data.table_number}, relations: {guests : true}})
            if(!table) throw new Error('Mesa não encontrada')
            if(table.guests.length >= table.max_length) {
                throw new Error(`Mesa ${table.table_number} está lotada. Ocupação máxima: ${table.max_length}` )
            }
            data.table_number = table
        }

        return this.repo.update(guestId, data)
        
    }

    async delete(id:number)  {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado não encontrado')
        this.repo.delete(id)
        return {message: "Convidado deletado com sucesso!"}
    }

    async checkin(id: number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('convidado não encontrado')
        if(guest.checked_in) throw new Error('Check-in já realizado')

        guest.checked_in = true
        guest.checked_at = new Date()

        return this.repo.save(guest)
    }

    async undoCheckin(id: number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('convidado não encontrado')
        if(!guest.checked_in) throw new Error('Check-in já realizado')

        guest.checked_in = false
        guest.checked_at = null

        return this.repo.save(guest)
    }

    async dashboard() {
        const guests = await this.repo.find()

        const total = guests.length
        const confirmed = guests.filter(g => g.checked_in).length
        const pending = total - confirmed
        
        return {
            total,
            confirmed,
            pending
        }
    }
 }