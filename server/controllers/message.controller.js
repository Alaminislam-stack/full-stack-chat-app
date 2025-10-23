import { PrismaClient } from '../generated/prisma/index.js';
import { gatSockedIdByUserId, io } from '../index.js';
const prisma = new PrismaClient();

export const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const  receiverId = req.params.receiverId;
        const senderId = req.user.id; // Assuming user is authenticated and senderId is available

        if (!content || !receiverId) {
            return res.status(400).json({ error: "Content and receiverId are required" });
        }

        let conversation = await prisma.conversation.findFirst({
            where: {
                OR: [
                    { user1Id: senderId, user2Id: receiverId },
                    { user1Id: receiverId, user2Id: senderId },
                ],
            },
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    user1Id: senderId,
                    user2Id: receiverId,
                },
            });
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                conversationId: conversation.id,
                content,
            },
        });

        // TODO: Add Socket.IO logic here to emit the new message to the receiver in real-time.
        // For example: getReceiverSocketId and io.to(receiverSocketId).emit("newMessage", newMessage)
        const receiverSocketId = gatSockedIdByUserId(receiverId);
        const senderSocketId = gatSockedIdByUserId(senderId);
        io.to(receiverSocketId).emit("new-message", newMessage);
        io.to(senderSocketId).emit("new-message", newMessage);


        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};