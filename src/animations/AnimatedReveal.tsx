"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  distance?: number; // 👈 NEW: how far to slide before appearing
}

/**
 * Reusable animation wrapper.
 * - direction: sets slide direction
 * - distance: how far it slides (default 40px)
 * - duration & delay: control speed
 * - fully accepts MotionProps overrides
 */
const AnimatedReveal = ({
  children,
  className = "",
  direction = "up",
  duration = 0.6,
  delay = 0,
  distance = 40,
  initial,
  animate,
  transition,
  ...rest
}: AnimatedRevealProps) => {
  // ✅ Dynamic variants based on direction + distance
  const variants: Record<string, any> = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: -distance },
    right: { opacity: 0, x: distance },
  };

  return (
    <motion.div
      initial={initial || variants[direction]}
      animate={
        typeof animate === "object"
          ? { opacity: 1, x: 0, y: 0, ...animate }
          : { opacity: 1, x: 0, y: 0 }
      }
      transition={transition || { duration, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedReveal;
