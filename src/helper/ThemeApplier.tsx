"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

export default function ThemeApplier() {
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    // get actual color value from the CSS variable
    const color = getComputedStyle(root).getPropertyValue(primaryColor).trim();

    // set it as the current primary
    root.style.setProperty("--color-primary", color);
  }, [primaryColor]);

  return null;
}
