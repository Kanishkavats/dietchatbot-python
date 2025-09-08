"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  primaryColor: string; // stores the variable name
}

const initialState: ThemeState = {
  primaryColor: "palate-yellow", // default
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
   setPrimaryColor: (state, action) => {
  state.primaryColor = action.payload;
  // update CSS variable on <html>
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--primary-color",
      `var(--${action.payload})` // maps to your Tailwind custom palette
    );
  }
},
  },
});

export const { setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
