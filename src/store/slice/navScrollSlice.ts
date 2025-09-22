// src/store/slice/navScrollSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  navScrolled: boolean;
}

const initialState: ScrollState = {
  navScrolled: false,
};

const scrollSlice = createSlice({
  name: 'navScroll',
  initialState,
  reducers: {
    setNavScrolled: (state, action: PayloadAction<boolean>) => {
      state.navScrolled = action.payload;
    },
  },
});

export const { setNavScrolled } = scrollSlice.actions;
export default scrollSlice.reducer;
