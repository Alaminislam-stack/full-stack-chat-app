import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getConversations, getMessages } from "../controllers/conversation.controller.js";

const router = express.Router();

 router.post("/sendMessage/:receiverId", authMiddleware, sendMessage );
 router.post("/getMessage/:conversationId", authMiddleware, getMessages );
 router.get("/getConversation", authMiddleware, getConversations );
 router.get("/getMessages/:conversationId", authMiddleware, getMessages);

export default router;