import { Like } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Guest } from "../models/Guest";
import { TableConfig } from "../models/TableConfig";

export class GuestService {
    private repo = AppDataSource.getRepository(Guest)
    private tableRepo = AppDataSource.getRepository(TableConfig)

    async register(data:any) {
        const exists = await this.repo.findOne({where: {email: data.email}})
        if(exists) throw new Error('Convidado já cadastrado')

        const tableConfig = await this.tableRepo.findOne({
            where: {table_number: data.table_number },
            relations: {guests : true}
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

        const guests = await this.repo.find({
            where,
            relations: {table_number: {guests: true}}
        })

        const tables = await this.tableRepo.find({ relations: { guests: true } })
        const countByTableId: Record<number, number> = {}
        for (const t of tables) {
            countByTableId[t.id] = t.guests?.length || 0
        }

        return guests.map(g => ({
            ...g,
            table_number: g.table_number ? {
                id: g.table_number.id,
                table_number: g.table_number.table_number,
                max_length: g.table_number.max_length,
                guest_count: countByTableId[g.table_number.id] || 0
            } : null
        }))
    }

    async update(guestId:number, data: any) {
        const exists = await this.repo.findOneBy({id: guestId})
        if(!exists) throw new Error('Convidado não encontrado')
        if(data.table_number) {
            const tableConfig = await this.tableRepo.findOne({
                where: {table_number: data.table_number},
                relations: {guests: true}
            })
            if(!tableConfig) throw new Error('Mesa não encontrada')
            if(tableConfig.guests.length >= tableConfig.max_length) {
                throw new Error(`Mesa ${tableConfig.table_number} está lotada. Capacidade máxima: ${tableConfig.max_length}`)
            }
            data.table_number = tableConfig
        }

        const guest = await this.repo.update(guestId, data)
        return {message: 'Convidado atualizado com sucesso!'}
    }

   async delete(id: number) {
    const guest = await this.repo.findOneBy({id})
    if(!guest) throw new Error('Convidado não encontrado')

    this.repo.delete(id)
    return {message: 'Convidado deletado com sucesso!'}
   }

   async checkin(id:number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado não encontrado')
        if(guest.checked_in) throw new Error('Check-in já realizado')

        guest.checked_in = true
        guest.checked_at = new Date(Date.now() - 3 * 60 * 60 * 1000)

        return this.repo.save(guest)

   }

   async undoCheckin(id:number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado não encontrado')
        if(!guest.checked_in) throw new Error('Check-in já pendente')

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
