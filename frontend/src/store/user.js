import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: null,
  },
  reducers: {
    login(state, action) {
      state.access_token = action.payload.access_token;
    },
    logout(state, action) {
      state.access_token = null;
    },
  },
});

export default userSlice;

export const userActions = userSlice.actions;
