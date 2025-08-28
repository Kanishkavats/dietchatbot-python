"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

export interface DropdownOption {
  label?: string;
  icon?: string;
  image?: string;
  name?: string;
  href?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  open: boolean; // controlled by parent
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const Dropdown: React.FC<DropdownProps> = ({ options = [], open }) => {
  const isImagePreview = options.length > 0 && options.every(opt => opt.image);

  return (
    <AnimatePresence>
      {open && (
        <>
          {isImagePreview ? (
            // Image preview grid
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 bg-gray-100 rounded-lg shadow-lg p-4 z-50"
            >
              <div className="flex flex-wrap gap-4">
                {options.map((opt, idx) => (
                  <motion.a
                    href={opt.href || "#"}
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-32 sm:w-40 bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={opt.image!}
                        alt={opt.name || opt.label || "Preview"}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <span className="text-sm font-semibold text-gray-800">
                        {opt.name || opt.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ) : (
            // Normal dropdown
            <motion.ul
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 min-w-[180px] bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50"
            >
              {options.map((opt, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <a
                    href={opt.href || "#"}
                    className="px-4 py-2 block cursor-pointer flex items-center gap-2"
                  >
                    {opt.icon && <Icon icon={opt.icon} className="w-5 h-5" />}
                    <span>{opt.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
