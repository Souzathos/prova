import { Like } from "typeorm";
import { AppDatSource } from "../config/data-source";
import { Guest } from "../models/Guest";
import { TableConfig } from "../models/TableConfig";

export class GuestService {
    private repo = AppDatSource.getRepository(Guest)
    private tableRepo = AppDatSource.getRepository(TableConfig)

    async register(data: any) {
        const exists = await this.repo.findOneBy({email: data.email})
        if(exists) throw new Error('Email já cadastrado')
        const tableConfig = await this.tableRepo.findOne({
            where: {table_number: data.table_number},
            relations: ['guests']
        })

        if(!tableConfig) throw new Error('Mesa não encontrada')

        if(tableConfig.guests.length >= tableConfig.max_lenght){
            throw new Error(`Mesa ${tableConfig.table_number} está lotada (capacidade: ${tableConfig.max_lenght})`)
        }

        const guest = this.repo.create({
            name: data.name, 
            cpf: data.cpf,
            email: data.email,
            phone: data.phone,
            table_number: tableConfig
        })

        return this.repo.save(guest)
    }

    async list(name?:string, table_number?: number) {
        const where: any = {}

        if(name) where.name = Like(`%${name}%`)
        // table_number é a relação (TableConfig); filtramos pela coluna table_number dela
        if(table_number) where.table_number = {table_number: table_number}

        // status saiu daqui: a ordenação/visualização por status é feita no front
        return this.repo.find({
            where,
            relations: ['table_number']
        })
    }

    async update(guestId:number, data:any) {
        const exists = await this.repo.findOneBy({id: guestId})
        if(!exists) throw new Error('Convidado nao encontrado')
        const guest = await this.repo.update(guestId, data)
        
        return guest
    }

    async delete(id:number) {
        const exists = await this.repo.findOneBy({id})
        if(!exists) throw new Error('Convidado nao encontrado')
        
        await this.repo.delete(id)

        return {message: `${exists.name} excluído com sucesso!`}
    }

    async checkin(id: number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado nao encontrado')
        if(guest.checked_in) throw new Error('Check-in Ja realizado')

        guest.checked_in = true
        guest.checked_at = new Date()

        return this.repo.save(guest)
    }

    async removeCheckin(id: number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('convidado não encontrado')
        if(!guest.checked_in) throw new Error('Check-in não realizado')

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
            pending,
        }
    }
}