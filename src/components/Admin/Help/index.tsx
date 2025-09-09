"use client";
import React, { JSX } from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface HelpItem {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const Help = () => {
  const helpItems: HelpItem[] = [
    { id: 1, title: "FAQ", description: "Frequently asked questions about Charifund platform.", icon: <FaQuestionCircle size={24} /> },
    { id: 2, title: "Contact Support", description: "Reach out to our support team via email or phone.", icon: <FaPhoneAlt size={24} /> },
    { id: 3, title: "Submit a Ticket", description: "Have an issue? Submit a ticket and we will assist you.", icon: <FaEnvelope size={24} /> },
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
      <Breadcrumb lable="Help" />


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {helpItems.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -3 }}
            className="bg-white shadow-lg rounded-xl p-6 flex gap-4 cursor-pointer"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-primaryColor/10 text-primaryColor rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Help;
