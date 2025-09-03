"use client";

import { Provider } from "react-redux";
import ThemeApplier from "@/src/helper/ThemeApplier";
import { store } from "@/src/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeApplier />
      {children}
    </Provider>
  );
}
