import { Request, Response } from "express";
import { AppDatSource } from "../config/data-source";
import { TableConfig } from "../models/TableConfig";

export class TableController {
    private repo = AppDatSource.getRepository(TableConfig)

    async list(req:Request, res:Response) {
        try{const tables = await this.repo.find({order: {table_number : 'ASC'}})

        return res.status(200).json(tables)}
        catch(e:any) {
            return res.status(400).json({message: e.message})
        }

    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body
            const exists = await this.repo.findOne({ where: { table_number: data.table_number } })
            if (exists) throw new Error('Messa já existe')

            const table = this.repo.create(data)
            await this.repo.save(table)

            return res.status(201).json(table)
        } catch (e: any) {
            return res.status(400)
                .json({ message: e.message })
        }
    }
}