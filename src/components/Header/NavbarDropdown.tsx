"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface DropdownOption {
  label: string;
  href?: string;
  children?: DropdownOption[];
}

interface DropdownProps {
  options: DropdownOption[];
}

export const NavbarDropdown = ({ options }: DropdownProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const renderOption = (opt: DropdownOption, depth = 0) => {
    const hasChildren = opt.children && opt.children.length > 0;

    return (
      <div
        key={opt.label}
        className="relative group border-b border-gray-100 last:border-b-0" // ✅ border bottom
        onMouseEnter={() => {
          setHovered(opt.label);
          if (hasChildren) setOpen(opt.label);
        }}
        onMouseLeave={() => {
          setHovered(null);
          if (hasChildren) setOpen(null);
        }}
      >
        <a
          href={opt.href || "#"}
          className="flex items-center justify-between gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 relative"
        >
          {/* Icon on hover (always aligned left) */}
          <motion.span
            initial={{ x: -8, opacity: 0 }}
            animate={
              hovered === opt.label
                ? { x: 0, opacity: 1 }
                : { x: -8, opacity: 0 }
            }
            transition={{ duration: 0.2 }}
            className="absolute left-2"
          >
            <Icon icon="mdi:minus" width="16" height="16" />
          </motion.span>

          {/* Label with shift */}
          <motion.span
            animate={hovered === opt.label ? { x: 10 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {opt.label}
          </motion.span>

          {/* Chevron if children */}
          {hasChildren && (
            <Icon icon="mdi:chevron-right" width="16" height="16" />
          )}
        </a>

        {/* Nested Dropdown */}
        <AnimatePresence>
          {open === opt.label && hasChildren && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-full bg-white rounded-md shadow-lg py-2 w-44"
            >
              {opt.children?.map((sub) => renderOption(sub, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 bg-white rounded-md shadow-lg py-2 z-50 w-48"
    >
      {options.map((opt) => renderOption(opt))}
    </motion.div>
  );
};
