import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = { value: Cookies.get("token") };

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    token_refresh: (state) => {
      state.value = Cookies.get("token");
    },
  },
});

export const { token_refresh } = tokenSlice.actions;

export default tokenSlice.reducer;
