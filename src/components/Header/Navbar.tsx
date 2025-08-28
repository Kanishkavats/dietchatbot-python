"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownOption } from "./Dropdown";
import { homeOne, homeTwo, homeThree, homeFour, homeFive, logo } from "@/assets";
import { label } from "framer-motion/client";

interface NavItem {
  label: string;
  dropdown: DropdownOption[] | null;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    dropdown: [
      { name: "Home One", image: homeOne.src },
      { name: "Home Two", image: homeTwo.src },
      { name: "Home Three", image: homeThree.src },
      { name: "Home Four", image: homeFour.src },
      { name: "Home Five", image: homeFive.src },
    ],
  },
  { label: "About Us", dropdown: null },
  {
    label: "Causes",
    dropdown: [
      { label: "Our Causes", href: "/causes" },
      { label: "Cause Details", href: "/causes/details" },
    ],
  },
  {
    label: "Pages",
    dropdown: [
      { label: "FAQ", href: "/faq" },
      { label: "Donate Us", href: "/donate" },
      { label: "Become Volunteer", href: "/volunteer" },
      { label: "Team", 
        children: [
          {label: "Our Teams", href: "/team" },
          {label: "Team Details", href: "/team" },
        ]
       },
      { label: "Shop", 
        children: [
          { label: "Our Shop", href: "/shop" },
          { label: "Product Detials", href: "/shop" },
          { label: "View Cart", href: "/shop" },
          { label: "Checkout", href: "/shop" },
        ],
      },
      {
        label: "Events",
        children: [
          { label: "Events", href: "/events" },
          { label: "Event Details", href: "/events/details" },
        ],
      },
    ],
  },
  { label: "Comming soon", dropdown: null },
  { label: "Error", dropdown: null },
];

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
            {item.dropdown && <Dropdown options={item.dropdown} open={open === item.label} />}
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Icon icon="mdi:magnify" width={22} height={22} />
        <motion.button className="flex items-center gap-2 bg-yellow-400 px-6 py-3 rounded-full font-semibold text-black">
          Donate Now
          <Icon icon="mdi:arrow-top-right" width={18} height={18} />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
