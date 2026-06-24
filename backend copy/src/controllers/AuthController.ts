import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { generateToken } from "../utils/jwt";

export class AuthController {
    private service = new AuthService()

    async login(req: Request, res:Response) {
        try {
            const {email, password} = req.body
            const user = await this.service.login(email, password)

            const token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            const safe = {...user}
            delete(safe as any).password

            return res.status(200).json({user: safe, token})
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }   
    }
}