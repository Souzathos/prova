import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const header = req.headers.authorization

    if(!header) {
        return res.status(401).json('Token não fornecido')
    }

    const token = header.split(' ')[1]
    const decoded = verifyToken(token)
    if(!decoded)  {
        return res.status(403).json('Token inválido')
    }

    (req as any).user = decoded

    next()
}