import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceUtility from "../../../components/ui/utility/axiosInstanceUtility";
import { toast } from "react-toastify";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.post("/user/login", {
        email,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ username, email, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.post("/user/register", {
        username,
        email,
        password,
        gender,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.post("/user/logout",);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.error);
      const errorMessage =
        error?.response?.data?.errorMessage || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const userProfileThunk = createAsyncThunk(
  "user/profile",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.get("/user/profile",);
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

export const getOtherUserThunk = createAsyncThunk(
  "user/otheruser",
  async ({otherUsename},{ rejectWithValue }) => {
    console.log(otherUsename)
    try {
      const response = await axiosInstanceUtility.post("/user/getOtherUsers",{otherUsename});
      console.log(response);
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

export const getUserThunk = createAsyncThunk(
  "user/user",
  async ({id},{ rejectWithValue }) => {
    try {
      const response = await axiosInstanceUtility.post("/user/getUser",{id});
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