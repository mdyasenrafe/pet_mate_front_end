import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthState, TUser } from "./types";
import { RootState } from "../../store";

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    updateUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setPremiumStatus: (state) => {
      if (state.user) {
        state.user.isPremium = true;
      }
    },
  },
});

export const { addUser, logout, updateUser, setPremiumStatus } =
  authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const getCurrentUser = (state: RootState) => state.auth.user;
