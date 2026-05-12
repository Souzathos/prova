import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization

    if(!token || token.startsWith('Bearer ')) {
        return res.status(401).json('Token não fornecido')
    }

    

    next()
}