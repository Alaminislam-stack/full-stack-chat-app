import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getConversations = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    { user1Id: loggedInUserId },
                    { user2Id: loggedInUserId },
                ],
            },
            include: {
                user1: {
                    select: { id: true, username: true, avatar: true },
                },
                user2: {
                    select: { id: true, username: true, avatar: true },
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
        });

        // Filter out the current user from conversation details
        const userConversations = conversations.map(conv => {
            const otherUser = conv.user1.id === loggedInUserId ? conv.user2 : conv.user1;
            return {
                ...conv,
                otherUser,
            };
        });

        res.status(200).json(userConversations);
    } catch (error) {
        console.error("Error in getConversations: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};