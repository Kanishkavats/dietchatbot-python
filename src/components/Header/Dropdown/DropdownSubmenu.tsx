"use client";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownOption } from "./NavbarDropdown";
import { DropdownOptionItem } from "./DropdownOptionItem";

interface Props {
  parent: DropdownOption;
  open: string | null;
  displayLabel: string;
}

export const DropdownSubmenu = ({ parent, open, displayLabel }: Props) => {
  if (!parent.children) return null;

  return (
    <AnimatePresence>
      {open === displayLabel && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-full bg-white rounded-md shadow-lg py-2 w-44"
        >
          {parent.children.map((sub) => (
            <DropdownOptionItem
              key={sub.label || sub.name}
              opt={sub}
              options={parent.children || []}
              open={open}
              setOpen={() => {}}
              hovered={null}
              setHovered={() => {}}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
