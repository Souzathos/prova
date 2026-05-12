import { Router } from "express";
import { GuestController } from "../controllers/GuestController";

const guestRoutes = Router()
const guest = new GuestController()
guestRoutes.post('/register', guest.register.bind(guest))
guestRoutes.get('/list', guest.list.bind(guest))
guestRoutes.put('/update/:id', guest.update.bind(guest))
guestRoutes.delete('/delete/:id', guest.delete.bind(guest))
guestRoutes.post('/checkin/:id', guest.checkin.bind(guest))

export default guestRoutes