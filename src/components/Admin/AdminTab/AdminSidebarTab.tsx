"use client";
import { logo } from "@/public/assets";
import { AdminSideBarTabProps } from "@/src/types/admin";
import { sidebarAd } from "@/src/utils/AdminSidebarData";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowForwardIos, MdMenu } from "react-icons/md";

const AdminSideBarTab = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
}: AdminSideBarTabProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { t } = useTranslation();

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Header with Menu Icon */}
      {isMobile && (
        <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md md:hidden z-50">
          <Image src={logo.src} alt="logo" width={120} height={40} className="h-10 w-auto" />
          <button onClick={() => setMobileDrawerOpen(true)} className="text-2xl">
            <MdMenu />
          </button>
        </div>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setMobileDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobile && mobileDrawerOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full overflow-y-auto md:overflow-auto bottom-0 w-64 bg-white z-50 shadow-lg rounded-r-3xl flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileDrawerOpen(false)} className="text-xl">
                <MdArrowForwardIos />
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src={logo.src} alt="logo" width={140} height={40} />
            </div>

            {/* Sidebar Items */}
            <div className="flex flex-col">
              {sidebarAd.map((item, i) => {
                const isActive = activeTab === item.nav;
                return (
                  <motion.div
                    key={i}
                    onClick={() => {
                      setActiveTab(item.nav);
                      setMobileDrawerOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex items-center  gap-3 py-4 px-6 cursor-pointer rounded-r-lg ${
                      isActive ? "bg-primaryColor text-white" : "text-black"
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{t(item.lable)}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop & Tablet Sidebar */}
      {!isMobile && (
        <>
          {/* Overlay for mobile is skipped */}
          <motion.div
            animate={{ width: isOpen ? 270 : 80 }}
            transition={{ duration: 0.3, type: "tween" }}
            className={`bg-white rounded-r-3xl shadow-md flex flex-col z-50 sticky top-0 bottom-0 `}
          >
            {/* Logo */}
            <div className="flex flex-col items-center pb-4 pt-8">
              {isOpen ? (
                <Image
                  src={logo.src}
                  alt="logo"
                  width={180}
                  height={80}
                  className="mb-6 h-15 w-auto"
                />
              ) : (
                <div className="h-10" />
              )}
            </div>

            {/* Sidebar Items */}
            <div className="flex flex-col w-full font-medium flex-grow border-t border-gray-200 relative overflow-y-scroll scrollbar-hide">
              {sidebarAd.map((item, i) => {
                const isActive = activeTab === item.nav;

                return (
                  <div
                    onClick={() => setActiveTab(item.nav)}
                    key={i}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{
                        x: isOpen ? 8 : 0,
                        scale: 1.05,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`py-4 cursor-pointer pl-5 pr-8 flex gap-2 items-center border-b border-gray-200 relative`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeBackground"
                            className="absolute inset-0 bg-primaryColor rounded-r-md -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                      </AnimatePresence>

                      {item.icon && (
                        <item.icon
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? "text-white" : "text-black"
                          }`}
                        />
                      )}

                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={isActive ? "text-white" : "text-black"}
                        >
                          {t(item.lable)}
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Toggle Button */}
            <motion.div
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.15, backgroundColor: "#f3f3f3" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`w-fit h-fit absolute top-20 right-[-15px] cursor-pointer bg-white shadow-md p-2 rounded-full`}
            >
              <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
                <MdArrowForwardIos className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AdminSideBarTab;
