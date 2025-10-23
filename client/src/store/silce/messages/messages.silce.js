import { createSlice } from "@reduxjs/toolkit";
import { getConversationThunk, getMessagesThunk, sendMessagesThunk } from "./messages.thunk";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    conversations: [],
    messages: [],
    loading: false,
  },
  reducers:{
    setNewMessags: (state, action) =>{
      console.log('hello')
      state.messages = [...state.messages, action.payload]
      console.log(action.payload)
    }
  },
  extraReducers: (builder) => {
    // get conversation
    builder.addCase(getConversationThunk.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(getConversationThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.conversations = action.payload;
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getConversationThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    });

    // get messages
    builder.addCase(getMessagesThunk.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    });

    // send messages
    builder.addCase(sendMessagesThunk.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(sendMessagesThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(sendMessagesThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { setNewMessags } = messagesSlice.actions;
export default messagesSlice.reducer;