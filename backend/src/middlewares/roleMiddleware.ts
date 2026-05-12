import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (role: string) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if ((req as any).user.role !== role) {
                return res.status(401).json('Acesso negado')
            }
        } catch {
            return null
        }

        next()
    }


}