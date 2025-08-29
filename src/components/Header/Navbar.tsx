"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {  logo } from "@/assets";
import { NAV_ITEMS } from "@/staticResource";
import { NavbarDropdown } from "./Dropdown/NavbarDropdown";


const Navbar = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 relative">
      {/* Logo */}
      <motion.img src={logo.src} alt="Logo" className="h-10" />

      {/* Menu */}
      <ul className="flex items-center gap-6 bg-yellow-400 px-8 py-3 rounded-full font-medium text-black relative">
        {NAV_ITEMS.map((item, i) => (
          <li
            key={i}
            className="relative cursor-pointer"
            onMouseEnter={() => setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="flex items-center gap-1">
              {item.label}
              {item.dropdown && (
                <motion.span
                  animate={{ rotate: open === item.label ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon icon="mdi:chevron-down" width={16} height={16} />
                </motion.span>
              )}
            </div>

            {/* Dropdown */}
            {item.dropdown && open === item.label && (
              <NavbarDropdown options={item.dropdown} />
            )}
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Icon icon="mdi:magnify" width={22} height={22} />
        <motion.button className="flex items-center gap-2 bg-yellow-400 px-6 py-3 hover:bg-palate-green hover:text-white rounded-full font-semibold text-black">
          Donate Now
          <Icon icon="mdi:arrow-top-right" width={18} height={18} />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
