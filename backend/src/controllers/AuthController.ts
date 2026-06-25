import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { generateToken } from "../utils/jwt";
import { loginSchema } from "../schemas/authSchema";

export class AuthController {
    private service = new AuthService()

    async login(req: Request, res:Response) {
        try {
            const { email, password } = loginSchema.parse(req.body)
            const user = await this.service.login(email, password)

            const safe = {...user}
            delete(safe as any).password

            const token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })
            return res.status(200).json({safe, token})
        } catch(e: any) {
            if (e?.issues) {
                const msg = e.issues.map((i: any) => i.message).join('; ')
                return res.status(400).json({ message: msg })
            }
            return res.status(404).json({ message: e.message })
        }
    }
}
