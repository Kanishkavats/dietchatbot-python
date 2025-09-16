"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface Props {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const NavbarSearch = ({ searchOpen, setSearchOpen }: Props) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  // 🔹 Prevent background scrolling when search is open
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      const inputTimer = setTimeout(() => setShowSearchInput(true), 600);
      const closeBtnTimer = setTimeout(() => setShowCloseButton(true), 900);

      return () => {
        clearTimeout(inputTimer);
        clearTimeout(closeBtnTimer);
      };
    } else {
      setShowSearchInput(false);
      setShowCloseButton(false);
    }
  }, [searchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Search Input */}
          {showSearchInput && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 origin-center"
            >
              <div className="bg-white rounded-md w-[90vw] max-w-3xl flex items-center justify-between px-6 py-4 shadow-xl">
                <input
                  type="text"
                  placeholder="Search...."
                  className="w-full text-lg focus:outline-none"
                  autoFocus
                />
                <Icon
                  icon="mdi:magnify"
                  width={24}
                  height={24}
                  className="text-black opacity-60"
                />
              </div>
            </motion.div>
          )}

          {/* Close Button */}
          {showCloseButton && (
            <motion.button
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -100, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setSearchOpen(false)}
              className="fixed top-1/2 left-1/2 w-17 h-17 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer"
            >
              <div className="bg-yellow w-17 h-17 flex items-center justify-center rounded-full relative -top-[2px]">
                <Icon icon="mdi:close" width={26} height={26} className="text-black" />
              </div>
            </motion.button>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default NavbarSearch;
