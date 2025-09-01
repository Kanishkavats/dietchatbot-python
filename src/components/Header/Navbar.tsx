"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownOption } from "./Dropdown";
import { homeOne, homeTwo, homeThree, homeFour, homeFive, logo } from "../../../public/assets";

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
  { 
    label: "News", 
    dropdown: [
      { label: "News List View", href: "/news/list" },
      { label: "News Grid View", href: "/news/grid" },
      { label: "News Details", href: "/news/details" },
    ]
  },
  { label: "Contact Us", dropdown: null },
];

const Navbar = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <img src={logo.src} alt="Charifund Logo" className="h-12" />
          <span className="text-2xl font-bold text-gray-800 font-charifund"></span>
        </motion.div>

        {/* Menu - All items in single yellow box */}
        <ul className="flex items-center bg-[#FFCC00] px-8 py-3 rounded-full font-medium text-black font-charifund">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={i}
              className="relative cursor-pointer"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <div className="flex items-center space-x-1 px-3">
                <span className="font-medium text-sm">{item.label}</span>
                {item.dropdown && (
                  <motion.span
                    animate={{ rotate: open === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon icon="mdi:chevron-down" width={14} height={14} />
                  </motion.span>
                )}
              </div>

              {/* Dropdown */}
              {item.dropdown && <Dropdown options={item.dropdown} open={open === item.label} />}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 text-gray-600 hover:text-[#FFCC00] transition-colors duration-200"
          >
            <Icon icon="mdi:magnify" width={20} height={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-[#FFCC00] hover:bg-[#E6B800] px-6 py-3 rounded-full font-semibold text-white transition-colors duration-200 shadow-md"
          >
            <span className="text-sm">Donate Now</span>
            <Icon icon="mdi:arrow-top-right" width={16} height={16} />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
