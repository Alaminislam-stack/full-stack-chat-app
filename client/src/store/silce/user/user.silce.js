import { createSlice } from "@reduxjs/toolkit";
import { getOtherUserThunk, getUserThunk, loginUserThunk, logoutUserThunk, registerUserThunk, userProfileThunk } from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: true,
  },

  extraReducers: (builder) => {
     //register user
     builder.addCase(registerUserThunk.pending, (state) => {
      state.status = "loading";
      state.screenLoading = true
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.screenLoading = false
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
      state.screenLoading = false
    });

    // Login User
    builder.addCase(loginUserThunk.pending, (state) => {
      state.status = "loading";
      state.buttonLoading = true
      state.screenLoading = true
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.buttonLoading = false;
      state.screenLoading = false
      state.isAuthenticated = true;
      state.userProfile = action.payload.user;
      state.data = action.payload;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
      state.screenLoading = false
    });

    // logout User
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.status = "loading";
      state.buttonLoading = true
      state.screenLoading = true
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.buttonLoading = false
      state.isAuthenticated = false;
      state.screenLoading = false
      state.userProfile = null;
      state.data = action.payload;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
      state.screenLoading = false
    });

    // user profile
    builder.addCase(userProfileThunk.pending, (state) => {
      state.status = "loading";
      state.buttonLoading = true
      state.screenLoading = true
    });
    builder.addCase(userProfileThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.buttonLoading = false
      state.screenLoading = false
      state.isAuthenticated = true;
      state.userProfile = action.payload.user;
      state.data = action.payload;
    });
    builder.addCase(userProfileThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
      state.isAuthenticated = false;
      state.screenLoading = false
    });
     
    // other user profile
    builder.addCase(getOtherUserThunk.pending, (state) => {
      state.status = "loading";
      state.buttonLoading = true
    });
    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.buttonLoading = false
      // state.userProfile = action.payload.user;
      state.data = action.payload;
    });
    builder.addCase(getOtherUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
    });

    // get user 
    builder.addCase(getUserThunk.pending, (state) => {
      state.status = "loading";
      state.buttonLoading = true
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.buttonLoading = false
      // state.userProfile = action.payload.user;
      state.data = action.payload;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.buttonLoading = false
    });

  },
});


export default userSlice.reducer;
