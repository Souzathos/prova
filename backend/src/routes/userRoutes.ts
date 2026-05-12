import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const userRoutes = Router()
const auth = new AuthController()

userRoutes.post('/login', auth.login.bind(auth))

export default userRoutes