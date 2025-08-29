'use client';
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { NavItem } from "@/header";

interface MobileDropdownItemProps {
  item: NavItem;
  open: string | null;
  setOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

const MobileDropdownItem = ({ item, open, setOpen }: MobileDropdownItemProps) => {
  const isDropdownOpen = open === item.label;

  return (
    <li className="border-b first:border-t border-gray-200 pl-10 pr-3">
      <button
        className={`w-full flex justify-between font-medium text-left ${isDropdownOpen ? 'text-palate-brown' : 'text-palate-black'}`}
        onClick={() => setOpen(prev => (prev === item.label ? null : item.label))}
      >
        <span className="flex justify-center items-center py-3 font-bold">{item.label}</span>
        {item.dropdown && (
          <div className="py-4 w-12 h-full border-l-2 border-gray-200 flex justify-center items-center">
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                icon={isDropdownOpen ? "ic:baseline-minus" : "ic:baseline-plus"}
                width={18}
                height={18}
              />
            </motion.div>
          </div>
        )}
      </button>

      <AnimatePresence>
        {item.dropdown && isDropdownOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-1 text-sm text-gray-700"
          >
            {item.dropdown.map((subItem, j) => (
              <li
                key={j}
                className="flex items-center border-b first:border-t border-gray-200 py-4 gap-2 text-palate-black font-bold cursor-pointer group"
              >
                {subItem.image && (
                  <motion.img
                    src={subItem.image}
                    alt=""
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
                {subItem.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MobileDropdownItem;
