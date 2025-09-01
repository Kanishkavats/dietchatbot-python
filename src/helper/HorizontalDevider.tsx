"use client";

import React from "react";

interface DividerProps {
  color?: string;   // Tailwind color classes (default: bg-yellow-500)
  longWidth?: string; // Tailwind width classes (default: w-24)
  shortWidth?: string; // Tailwind width classes (default: w-4)
  height?: string; // Tailwind height classes (default: h-[3px])
  gap?: string; // Tailwind spacing classes (default: gap-2)
  center?: boolean; // If true, center align
}

const Divider: React.FC<DividerProps> = ({
  color = "bg-palate-yellow",
  longWidth = "w-24",
  shortWidth = "w-4",
  height = "h-[2px]",
  gap = "gap-2",
  center = false,
}) => {
  return (
    <div
      className={`flex items-center ${gap} ${
        center ? "justify-center" : ""
      }`}
    >
      <span className={`${height} ${longWidth} ${color}`}></span>
      <span className={`${height} ${shortWidth} ${color}`}></span>
      <span className={`${height} ${shortWidth} ${color}`}></span>
    </div>
  );
};

export default Divider;
