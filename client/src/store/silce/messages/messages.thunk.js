import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceUtility from "../../../components/ui/utility/axiosInstanceUtility";

export const getConversationThunk = createAsyncThunk(
  "messages/getConversation",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.get("/message/getConversation");
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "messages/getMessages",
  async ({conversationId},{ rejectWithValue }) => {
    // console.log(conversationId)
    try {
      const response = await axiosInstanceUtility.get(`/message/getMessages/${conversationId}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const sendMessagesThunk = createAsyncThunk(
  "messages/sendMessages",
  async ({receiverId, content},{ rejectWithValue }) => {
    console.log(receiverId,content)
    try {
      const response = await axiosInstanceUtility.post(`/message/sendMessage/${receiverId}`, {content});
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);