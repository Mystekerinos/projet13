// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, fetchUserProfile } from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    error: null,
    token: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.profile = null;
      state.token = null;
    },
    updateName: (state, action) => {
      const { firstName, lastName } = action.payload;
      if (state.profile) {
        state.profile.firstName = firstName;
        state.profile.lastName = lastName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        console.log(
          "Token updated in fetchUserProfile.fulfilled:",
          state.token
        );
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        console.log(
          "Token updated in authenticateUser.fulfilled:",
          state.token
        );
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, updateName } = userSlice.actions;

export default userSlice.reducer;
