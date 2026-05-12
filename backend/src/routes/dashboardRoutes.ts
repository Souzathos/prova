import { Router } from "express";
import { GuestController } from "../controllers/GuestController";
import { authMiddleware } from "../middlewares/authMiddleware";

const dashboardRoutes = Router()
const dash = new GuestController()

dashboardRoutes.get('/', authMiddleware, dash.dashboard.bind(dash) )

export default dashboardRoutes