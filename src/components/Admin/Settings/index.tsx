"use client";
import React, { JSX, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import { FaUserCog, FaBell, FaShieldAlt, FaEnvelope } from "react-icons/fa";

interface SettingItem {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  type: "toggle" | "info";
}

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const settings: SettingItem[] = [
    { id: 1, title: "Profile Settings", description: "Update your profile info and password.", icon: <FaUserCog size={24} />, type: "info" },
    { id: 2, title: "Notifications", description: "Enable or disable platform notifications.", icon: <FaBell size={24} />, type: "toggle" },
    { id: 3, title: "Email Updates", description: "Receive email updates about campaigns and donations.", icon: <FaEnvelope size={24} />, type: "toggle" },
    { id: 4, title: "Privacy Settings", description: "Manage your privacy and security preferences.", icon: <FaShieldAlt size={24} />, type: "info" },
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
            className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-primaryColor/10 text-primaryColor rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            </div>
            {item.type === "toggle" && (
              <div
                onClick={() => item.id === 2 ? setNotificationsEnabled(!notificationsEnabled) : setEmailUpdates(!emailUpdates)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  (item.id === 2 && notificationsEnabled) || (item.id === 3 && emailUpdates)
                    ? "bg-secondaryColor"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    (item.id === 2 && notificationsEnabled) || (item.id === 3 && emailUpdates)
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
