"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

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

  /* CONFLICTED IMPORTS AND LOGIC FROM DEVELOP BRANCH - COMMENTED OUT TO PRESERVE
  import { InfoBarDropdown } from "./InfoBarDropdown";
  import { currencies, languages, socialIcons } from "@/staticResource";
  import { useSelector } from "react-redux";
  import { RootState } from "@/store";
  const { primaryColor } = useSelector((state: RootState) => state.theme);
  */

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

          {/* CONFLICTED STYLING FROM DEVELOP BRANCH - COMMENTED OUT TO PRESERVE
          Different styling approach with theme support:
          className="w-full bg-palate-green text-white text-sm py-2 rounded-b-2xl hidden lg:block"
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-2 space-y-2 md:space-y-0">
            <motion.div whileHover={{ cursor: 'pointer' }} className={`flex items-center space-x-2 transition duration-111 hover:text-${primaryColor}`}>
              <Icon icon="mdi:email-outline" className={` w-5 h-5  text-${primaryColor} `} />
              <span className="">support@example.com</span>
            </motion.div>
            <motion.div whileHover={{ cursor: 'pointer' }} className={`flex items-center space-x-2 hover:text-${primaryColor}`}>
              <Icon icon="mdi:phone" className={` w-5 h-5  text-${primaryColor}`} />
              <span className="">+2(305) 587-3407</span>
            </motion.div>
          */
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

          {/* CONFLICTED DROPDOWN APPROACH FROM DEVELOP BRANCH - COMMENTED OUT TO PRESERVE
          Different dropdown implementation using reusable component:
          <InfoBarDropdown options={currencies} label="Currency" />
          <InfoBarDropdown options={languages} label="Menu" />
          <div className="flex items-center space-x-4 text-palate-white2">
          */
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

              {/* CONFLICTED STYLING FROM DEVELOP BRANCH - COMMENTED OUT TO PRESERVE
              Different approach without motion.a and theme-based colors:
              <a
                className={`cursor-pointer text-palate-white hover:text-${primaryColor} transition-colors duration-200`}
              >
                <Icon icon={icon} className="w-[18px] h-[18px]" />
              </a>
              */
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default InfoBar;
