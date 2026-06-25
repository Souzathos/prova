import { Request, Response } from "express";
import { GuestService } from "../services/GuestService";
import { guestSchema } from "../schemas/guestSchema";

export class GuestController {
    private service = new GuestService()

    async register(req:Request, res:Response) {
        try {
            const data = guestSchema.parse(req.body)
            const guest = await this.service.register(data)

            return res.status(201).json({ message: 'Convidado cadastrado com sucesso!' })
        } catch(e: any) {
            if (e?.issues) {
                const msg = e.issues.map((i: any) => i.message).join('; ')
                return res.status(400).json({ message: msg })
            }
            return res.status(400).json({ message: e.message })
        }
    }

    async list(req:Request, res:Response) {
        try {
            const {name, table_number} = req.query
            const guest = await this.service.list(name as string, Number(table_number))

            return res.status(200).json(guest)
        } catch(e: any) {
            return res.status(404).json({ message: e.message })
        }
    }

    async update(req:Request, res:Response) {
        try {
            const id = req.params.id
            const data = guestSchema.parse(req.body)
            const guest = await this.service.update(Number(id), data)

            return res.status(200).json(guest)
        } catch(e: any){
            if (e?.issues) {
                const msg = e.issues.map((i: any) => i.message).join('; ')
                return res.status(400).json({ message: msg })
            }
            return res.status(400).json({ message: e.message })
        }
    }

    async delete(req:Request, res:Response){
        try {
            const id = req.params.id
            const guest = await this.service.delete(Number(id))

            return res.status(200).json(guest)
        } catch(e: any) {
            return res.status(400).json({ message: e.message })
        }
    }

    async checkin(req:Request, res:Response) {
        try {
            const id = req.params.id
            const guest = await this.service.checkin(Number(id))

            return res.status(200).json({ message: 'Check-in realizado com sucesso!' })
        } catch(e: any) {
            return res.status(400).json({ message: e.message })
        }
    }

     async undoCheckin(req:Request, res:Response) {
        try {
            const id = req.params.id
            const guest = await this.service.undoCheckin(Number(id))

            return res.status(200).json({ message: 'Check-in desfeito com sucesso!' })
        } catch(e: any) {
            return res.status(400).json({ message: e.message })
        }
    }

    async dashboard(req:Request, res:Response) {
        try {
            const dash = await this.service.dashboard()

            return res.status(200).json(dash)
        }catch(e: any) {
            return res.status(404).json({ message: e.message })
        }
    }
}
