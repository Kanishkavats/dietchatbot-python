"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { checkAndClearState } from "./_utils/clearOldState";

export default function Providers({ children }) {
  useEffect(() => {
    // Check and clear old state on app mount
    checkAndClearState();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
