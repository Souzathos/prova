import { Router } from "express";
import { GuestController } from "../controllers/GuestController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const dashboardRoutes = Router()
const dash = new GuestController()

dashboardRoutes.get('/', authMiddleware, roleMiddleware('admin'), dash.dashboard.bind(dash) )

export default dashboardRoutes