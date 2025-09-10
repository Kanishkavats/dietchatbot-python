'use client'
import React, { JSX } from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import { FaPlayCircle, FaUserAlt, FaDonate, FaBullseye } from "react-icons/fa";

interface GuideStep {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const Guide = () => {
  const steps: GuideStep[] = [
    { id: 1, title: "Sign Up", description: "Create your Charifund account to start donating or volunteering.", icon: <FaUserAlt size={24} /> },
    { id: 2, title: "Explore Campaigns", description: "Browse through campaigns and choose the ones you want to support.", icon: <FaBullseye size={24} /> },
    { id: 3, title: "Donate or Volunteer", description: "Contribute by donating funds or volunteering for campaigns.", icon: <FaDonate size={24} /> },
    { id: 4, title: "Track Progress", description: "Monitor your donations and campaign participation from your dashboard.", icon: <FaPlayCircle size={24} /> },
    { id: 5, title: "Sign Up", description: "Create your Charifund account to start donating or volunteering.", icon: <FaUserAlt size={24} /> },
    { id: 6, title: "Explore Campaigns", description: "Browse through campaigns and choose the ones you want to support.", icon: <FaBullseye size={24} /> },
    { id: 7, title: "Donate or Volunteer", description: "Contribute by donating funds or volunteering for campaigns.", icon: <FaDonate size={24} /> },
    { id: 8, title: "Track Progress", description: "Monitor your donations and campaign participation from your dashboard.", icon: <FaPlayCircle size={24} /> },
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
      <Breadcrumb lable="Guide" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -3 }}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-14 h-14 bg-primaryColor/10 text-primaryColor rounded-full flex items-center justify-center mb-3">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
