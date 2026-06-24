import { Router } from "express";
import { TableController } from "../controllers/TableController";
import { authMiddleware } from "../middlewares/authMiddleware";

const tableRoutes = Router()
const table = new TableController()

tableRoutes.post('/create', authMiddleware,  table.create.bind(table))
tableRoutes.get('/list', authMiddleware, table.list.bind(table))

export default tableRoutes