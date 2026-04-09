import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import { getMessage, sendMessage } from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
