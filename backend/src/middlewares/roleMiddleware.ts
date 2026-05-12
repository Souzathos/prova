import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (role: string) => {
    try {
        return (req:Request, res:Response, next: NextFunction) => {
            if((req as any).user.role !== role) {
                return res.status(401).json('Acesso negado')
            }
            next()
        }
    } catch {
        return null
    }
    
}