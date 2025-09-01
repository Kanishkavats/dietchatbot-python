"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { DropdownOptionItem } from "./DropdownOptionItem";

export interface DropdownOption {
  label?: string;
  href?: string;
  image?: string;
  name?: string;
  children?: DropdownOption[];
}

interface DropdownProps {
  options: DropdownOption[];
}

export const NavbarDropdown = ({ options }: DropdownProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 bg-white rounded-md shadow-lg py-2 z-50 w-48"
    >
      {options.map((opt) => (
        <DropdownOptionItem
          key={opt.label || opt.name}
          opt={opt}
          open={open}
          setOpen={setOpen}
          hovered={hovered}
          setHovered={setHovered}
          options={options}
        />
      ))}
    </motion.div>
  );
};
