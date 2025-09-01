"use client";

import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

interface DividerProps {
  color?: string;       // Tailwind color classes (default: theme primary color)
  longWidth?: string;   // Tailwind width classes
  shortWidth?: string;  // Tailwind width classes
  height?: string;      // Tailwind height classes
  gap?: string;         // Tailwind spacing classes
  center?: boolean;     // If true, center align
}

const Divider: React.FC<DividerProps> = ({
  color,                         // leave undefined for default
  longWidth = "w-24",
  shortWidth = "w-4",
  height = "h-[2px]",
  gap = "gap-2",
  center = false,
}) => {
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  // Fallback to Redux theme color if prop not provided
  const appliedColor = color ?? `bg-${primaryColor}`;

  return (
    <div
      className={`flex items-center ${gap} ${
        center ? "justify-center" : ""
      }`}
    >
      <span className={`${height} ${longWidth} ${appliedColor}`}></span>
      <span className={`${height} ${shortWidth} ${appliedColor}`}></span>
      <span className={`${height} ${shortWidth} ${appliedColor}`}></span>
    </div>
  );
};

export default Divider;
