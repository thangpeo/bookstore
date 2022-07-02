import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const isLoggedIn = cookies.get("isLoggedIn");
const userInfo = cookies.get("userInfo");

const initialState = {
  isLoggedIn,
  userInfo,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  const { data } = await authApi.login(payload);
  console.log(data)
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      cookies.remove("isLoggedIn", false);
      cookies.remove("userInfo", {});
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      console.log(action.payload, action);
      cookies.set("isLoggedIn", true, { maxAge: 60 * 60 * 24 * 2 });
      cookies.set("userInfo", action.payload, { maxAge: 60 * 60 * 24 * 2 });
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.error;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
