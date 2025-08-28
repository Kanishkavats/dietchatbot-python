"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Dropdown } from "./Dropdown";

// ✅ Data arrays
const currencies = ["USD", "EUR", "INR"];

const languages = [
  { label: "English", icon: "twemoji:flag-england" },
  { label: "Spanish", icon: "twemoji:flag-united-states" },
  { label: "Chinese", icon: "twemoji:flag-china" },
  { label: "Italian", icon: "twemoji:flag-italy" },
];

const socialIcons = [
  { icon: "fa6-brands:facebook-f", label: "Facebook", link: "#" },
  { icon: "simple-icons:vimeo", label: "Vimeo", link: "#" },
  { icon: "fa6-brands:twitter", label: "Twitter", link: "#" },
  { icon: "fa6-brands:linkedin-in", label: "LinkedIn", link: "#" },
];

const InfoBar = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-[#12322D] text-white text-sm py-2 rounded-b-2xl hidden lg:block"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-2 space-y-2 md:space-y-0">
        
        {/* Left: Email & Phone */}
        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Icon icon="mdi:email-outline" className="text-yellow-500 w-4 h-4" />
            <span>support@example.com</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Icon icon="mdi:phone" className="text-yellow-500 w-4 h-4" />
            <span>+2(305) 587-3407</span>
          </motion.div>
        </div>

        {/* Right: Dropdowns & Social Icons */}
        <div className="flex items-center space-x-6">
          {/* Currency Dropdown */}
          <Dropdown options={currencies} />

          {/* Language Dropdown → pass array directly */}
          <Dropdown options={languages} />

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-gray-300">
            {socialIcons.map(({ icon, label, link }) => (
              <motion.a
                key={label}
                href={link}
                aria-label={label}
                whileHover={{ scale: 1, color: "#F3BB11" }}
                className="cursor-pointer"
              >
                <Icon icon={icon} className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoBar;
