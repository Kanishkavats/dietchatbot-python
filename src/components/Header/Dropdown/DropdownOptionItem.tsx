"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { DropdownOption } from "./NavbarDropdown";
import { DropdownSubmenu } from "./DropdownSubmenu";
import { DropdownImagePreview } from "./DropdownImagePreview";

interface Props {
  opt: DropdownOption;
  options: DropdownOption[];
  open: string | null;
  setOpen: (v: string | null) => void;
  hovered: string | null;
  setHovered: (v: string | null) => void;
}

export const DropdownOptionItem = ({
  opt,
  options,
  open,
  setOpen,
  hovered,
  setHovered,
}: Props) => {
  const hasChildren = opt.children && opt.children.length > 0;
  const displayLabel = opt.label || opt.name || "Item";
  const imageOptions = options.filter((o) => o.image);

  return (
    <div
      key={displayLabel}
      className="relative group border-b border-gray-100 last:border-b-0"
      onMouseEnter={() => {
        setHovered(displayLabel);
        if (hasChildren) setOpen(displayLabel);
      }}
      onMouseLeave={() => {
        setHovered(null);
        if (hasChildren) setOpen(null);
      }}
    >
      {/* Standard dropdown link */}
      {!opt.image && (
        <a
          href={opt.href || "#"}
          className="flex items-center justify-between gap-2 px-4 py-2 text-gray-700  hover:text-palate-brown transition-colors duration-200 relative"
        >
          <motion.span
            initial={{ x: -8, opacity: 0 }}
            animate={hovered === displayLabel ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-2"
          >
            <Icon icon="mdi:minus" width="16" height="16" />
          </motion.span>

          <motion.span
            animate={hovered === displayLabel ? { x: 10 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {displayLabel}
          </motion.span>

          {hasChildren && <Icon icon="mdi:chevron-right" width="16" height="16" />}
        </a>
      )}

      {/* Nested dropdown */}
      <DropdownSubmenu parent={opt} open={open} displayLabel={displayLabel} />

      {/* Image preview */}
      {opt.image && (
        <DropdownImagePreview imageOptions={imageOptions} />
      )}
    </div>
  );
};
