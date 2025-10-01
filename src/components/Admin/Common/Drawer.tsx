"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AdminDrawerProps } from "@/src/types/adminCommon";


const Drawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "50%",
  className = "",
  mobileFullScreen = true,
  mode
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-foreground bg-opacity-40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 overflow-auto
              w-full sm:w-[${width}] ${mobileFullScreen ? `sm:w-[400px] md:w-[60%] ${mode === "view" ? 'lg:w-[60%]' : 'lg:w-[35%]'} ` : ""}
              ${className}
              `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-primaryColor border-b border-gray-200 z-10">
              {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
              <IoClose
                className="cursor-pointer w-6 h-6 text-foreground"
                onClick={onClose}
              />
            </div>

            {/* Content */}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
