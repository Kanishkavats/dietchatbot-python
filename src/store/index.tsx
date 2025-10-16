'use client'
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import navScrollReducer from "./slice/navScrollSlice";
import DonationReducer  from "./slice/donationSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navScroll: navScrollReducer,
    donation:DonationReducer,
  },
});

// Types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
