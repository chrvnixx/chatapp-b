import express from "express"
import { checkAuth, login, logout, signup } from "../controllers/authControllers.js"
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/signup", signup)
router.post("/logout", logout)
router.post("/login", login)
router.get("/check-auth", protectRoute, checkAuth)

export default router