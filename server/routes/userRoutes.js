import express from "express";
import { createUser, getOtherUsers, getProfile, getUser, loginUser, logoutUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware ,getProfile);
router.post("/logout", authMiddleware ,logoutUser);
router.post("/getOtherUsers", authMiddleware, getOtherUsers)
router.post("/getUser", authMiddleware, getUser)



export default router;