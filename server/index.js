import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();
import { errorMeddleware } from "./middlewares/error.meddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.FRONTEND_URL

console.log(CLIENT_URL)
app.use(
  cors({
  origin: [CLIENT_URL],
  credentials: true,
})
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookieParser());
export const io = new Server(server,{
  cors:{
    origin: [CLIENT_URL],
  }
});

io.sockets.setMaxListeners(20);
connectDB()

// Sample route
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const userScoketMap = {
  // userId: socketId

}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  userScoketMap[userId] = socket.id;
  io.emit("online-users", Object.keys(userScoketMap));

  // এখানে io নয়, socket ব্যবহার করো
  socket.on("disconnect", () => {
    delete userScoketMap[userId];
    io.emit("online-users", Object.keys(userScoketMap));
  });

  // console.log(Object.keys(userScoketMap));
});

export const gatSockedIdByUserId = (userId) => {
  return userScoketMap[userId];
}

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

// Error handling middleware should be the last middleware
app.use(errorMeddleware)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
