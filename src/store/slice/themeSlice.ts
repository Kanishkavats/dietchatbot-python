"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: {primaryColor: string; } = {
  primaryColor: "palate-yellow", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
   setPrimaryColor: (state, action) => {
  state.primaryColor = action.payload;
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--primary-color",
      `var(--${action.payload})`
    );
  }
},
  },
});

export const { setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
