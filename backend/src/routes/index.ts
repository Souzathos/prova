import { Router } from "express";
import userRoutes from "./userRoutes";
import guestRoutes from "./guestRoutes";
import dashboardRoutes from "./dashboardRoutes";
import tableRoutes from "./tableRoutes";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/guest', guestRoutes)
routes.use('/dashboard', dashboardRoutes)
routes.use('/table', tableRoutes)

export default routes