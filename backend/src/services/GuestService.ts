import { Like } from "typeorm";
import { AppDatSource } from "../config/data-source";
import { Guest } from "../models/Guest";

export class GuestService {
    private repo = AppDatSource.getRepository(Guest)

    async register(data: any) {
        const exists = await this.repo.findOneBy({email: data.email})
        if(exists) throw new Error('Email já cadastrado')
        
        const guest = this.repo.create(data)

        return this.repo.save(guest)
    }

    async list(name?:string) {
        const guests = await this.repo.find({
            where: name ? {name: Like(`%${name}%`)} : {}
        })

        return guests
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

        return this.list()
    }

    async checkin(id: number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado nao encontrado')
        if(guest.checked_in) throw new Error('Check-in Ja realizado')

        guest.checked_in = true

        return this.repo.save(guest)
    }

    async dashboard() {
        const guests = await this.repo.find()

        const total = guests.length
        const confirmed = guests.filter(g => g.checked_in).length
        const pending = total - confirmed
        const occupancy = Number((confirmed/total)*100).toFixed(2)

        return {
            total,
            confirmed,
            pending,
            occupancy
        }
    }
}