"use client";

import { Provider } from "react-redux";
import ThemeApplier from "@/helper/ThemeApplier";
import { store } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeApplier />
      {children}
    </Provider>
  );
}
