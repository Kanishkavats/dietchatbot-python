"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import resumeReducer from "./slices/resumeSlice";

const rootReducer = combineReducers({
  resume: resumeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["resume"], // Only persist resume state
  migrate: (state) => {
    // Migration function to handle old state structure
    if (state && typeof state === "object") {
      // If old state has unexpected keys, filter them out
      return Promise.resolve({
        resume: state.resume || {},
        _persist: state._persist,
      });
    }
    return Promise.resolve(state);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
