import { Router } from "express";
import { GuestController } from "../controllers/GuestController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const guestRoutes = Router()
const guest = new GuestController()
guestRoutes.post('/register', authMiddleware, roleMiddleware('admin'), guest.register.bind(guest))
guestRoutes.get('/list', authMiddleware, guest.list.bind(guest))
guestRoutes.put('/update/:id', authMiddleware, roleMiddleware('admin'), guest.update.bind(guest))
guestRoutes.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), guest.delete.bind(guest))
guestRoutes.post('/checkin/:id', authMiddleware, guest.checkin.bind(guest))

export default guestRoutes