"use client";
import React, { JSX, useRef, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import {
  FaUserCog,
  FaBell,
  FaShieldAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaLanguage,
} from "react-icons/fa";
import LanguageSetting from "../Common/LanguageSetting";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import Logout from "../Common/Logout";

interface SettingItem {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  type: "toggle" | "info" | "component" | "action";
  component?: JSX.Element;
  onClick?: () => void;
}

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const { language, toggleLanguage } = useLanguageToggle();
  const logoutButtonRef = useRef<HTMLButtonElement>(null); 
  
  
  const handleLogoutCardClick = () => {
  
    if (logoutButtonRef.current) {
      logoutButtonRef.current.click(); 
    }
  };
  const settings: SettingItem[] = [
    {
      id: 1,
      title: "Profile Settings",
      description: "Update your profile info and password.",
      icon: <FaUserCog size={24} />,
      type: "info",
    },
    {
      id: 2,
      title: "Notifications",
      description: "Enable or disable platform notifications.",
      icon: <FaBell size={24} />,
      type: "toggle",
    },
    {
      id: 3,
      title: "Email Updates",
      description: "Receive email updates about campaigns and donations.",
      icon: <FaEnvelope size={24} />,
      type: "toggle",
    },
    {
      id: 4,
      title: "Privacy Settings",
      description: "Manage your privacy and security preferences.",
      icon: <FaShieldAlt size={24} />,
      type: "info",
    },
    {
      id: 5,
      title: "Logout",
      description: "Securely sign out of your account.",
      icon: <FaSignOutAlt size={24} />,
      type: "action",
      component: <Logout ref={logoutButtonRef} />,
    },
    {
      id: 6,
      title: "Language",
      description: "Change the display language.",
      icon: <FaLanguage size={24} />,
      type: "component",
      component: (
        <LanguageSetting language={language} setLanguage={toggleLanguage} />
      ),
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 80 },
    }),
  };

  return (
    <div className="p-5 w-full">
      <Breadcrumb lable="Settings" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {settings.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -3 }}
            className={`bg-white shadow-lg rounded-xl p-6 transition-all duration-200 ${
              item.type === "action" || item.type === "component"
                ? "flex-col items-start cursor-default"
                : "flex items-center gap-4 cursor-pointer"
            }`}
           onClick={item.type === "action" ? handleLogoutCardClick : item.onClick}
          >
            {/* 1. Logout Action Card Layout */}
            {item.type === "action" ? (
              <motion.div className="flex items-center  justify-between w-full  cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Icon and text on the left */}
                  <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Logout button on the far right */}
                  {item.title==='Logout'?<div className="opacity-0">
                    <Logout ref={logoutButtonRef}/>
                  </div>:<>{item.component}</>}
              </motion.div>
            ):item.type==='component'?
            <div>{item.component}</div>
          :<>
            <div className="w-12 h-12 bg-primaryColor/10 text-primaryColor rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            </div>
            {item.type === "toggle" && (
              <div
                onClick={() =>
                  item.id === 2
                    ? setNotificationsEnabled(!notificationsEnabled)
                    : setEmailUpdates(!emailUpdates)
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  (item.id === 2 && notificationsEnabled) ||
                  (item.id === 3 && emailUpdates)
                    ? "bg-secondaryColor"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    (item.id === 2 && notificationsEnabled) ||
                    (item.id === 3 && emailUpdates)
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </div>
            )}
            </>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
