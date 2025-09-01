"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

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
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-[#1E3C33] text-white text-sm py-2"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-1 space-y-2 md:space-y-0">
        
        {/* Left: Email & Phone */}
        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Icon icon="mdi:email-outline" className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-medium">support@example.com</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Icon icon="mdi:phone" className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-medium">+2(305) 587-3407</span>
          </motion.div>
        </div>

        {/* Right: Dropdowns & Social Icons */}
        <div className="flex items-center space-x-4">
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenCurrency(!openCurrency)}
              className="flex items-center space-x-1 cursor-pointer text-sm font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              <span>{selectedCurrency}</span>
              <Icon icon="mdi:chevron-down" className="w-3 h-3" />
            </button>
            {openCurrency && (
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[80px]">
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setOpenCurrency(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenLanguage(!openLanguage)}
              className="flex items-center space-x-1 cursor-pointer text-sm font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              <Icon icon="mdi:earth" className="w-4 h-4 text-red-500" />
              <span>{selectedLanguage}</span>
              <Icon icon="mdi:chevron-down" className="w-3 h-3" />
            </button>
            {openLanguage && (
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[120px]">
                {languages.map((lang) => (
                  <button
                    key={lang.label}
                    onClick={() => {
                      setSelectedLanguage(lang.label);
                      setOpenLanguage(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2 text-sm"
                  >
                    <Icon icon={lang.icon} className="w-4 h-4" />
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-white">
            {socialIcons.map(({ icon, label, link }) => (
              <motion.a
                key={label}
                href={link}
                aria-label={label}
                whileHover={{ scale: 1.1, color: "#F3BB11" }}
                className="cursor-pointer transition-colors duration-200"
              >
                <Icon icon={icon} className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoBar;
