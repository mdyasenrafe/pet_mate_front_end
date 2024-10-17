import { createSlice } from "@reduxjs/toolkit";
import { TThemeState } from "./types";
import { RootState } from "../../store";

const initialThemeState: TThemeState = {
  isDarkModeEnabled: false,
};

const themeSlice = createSlice({
  name: "themeMode",
  initialState: initialThemeState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkModeEnabled = !state.isDarkModeEnabled;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const getDarkMode = (state: RootState) =>
  state.themeMode.isDarkModeEnabled;

export default themeSlice.reducer;
