import { Request, Response } from "express";
import { GuestService } from "../services/GuestService";
import { guestSchema } from "../validators/guestValidator";

export class GuestController {
    private service = new GuestService()

    async register(req:Request, res:Response) {
        try  {
            const data = guestSchema.parse(req.body)
            const user = await this.service.register(data)

            return res.status(201).json(user)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }

    async list(req: Request, res:Response) {
        try {
            const {name} = req.query
            const guest = await this.service.list(name as string)

            return res.status(200).json(guest)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    } 

    async update(req:Request, res:Response) {
        try {
            const guest = await this.service.update(Number(req.params.id), req.body)

            return res.status(201).json(guest)
        } catch(e:any) {
            return res.status(400).json({message: e.message})
        }
    }

    async delete(req:Request, res:Response) {
        try {
            const guest = await this.service.delete(Number(req.params.id))

            return res.status(200).json(guest)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }

    async checkin(req:Request, res:Response) {
        try {
            const guest = await this.service.checkin(Number(req.params.id))
            
            return res.status(200).json(guest)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }

    async dashboard(req:Request, res:Response) {
        try {
            const dash = await this.service.dashboard()

            return res.status(200).json(dash)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }
}