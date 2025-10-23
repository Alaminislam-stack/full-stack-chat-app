import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

export const sockitSlice = createSlice({
  name: "sockit",
  initialState: {
    socket: null,
    onlineUsers: null,
  },reducers: {
     initializeSocket: (state, action) => {
        const socket = io(import.meta.env.VITE_SOCKET_URL,{
          query: {
            userId: action.payload.userId
          }
        });
        socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
        });
        state.socket = socket;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

  }
});

export const { initializeSocket, setOnlineUsers} = sockitSlice.actions;
export default sockitSlice.reducer;
