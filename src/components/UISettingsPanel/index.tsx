"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrimaryColor } from "@/src/store/themeSlice";
import { RootState } from "@/src/store";
import Button from "../common/Buttons/Button";

// ✅ Static color mapping for Tailwind
const colorClassMap: Record<
  string,
  { bg: string; text: string; hoverText: string }
> = {
  "orange": {
    bg: "bg-orange",
    text: "text-orange",
    hoverText: "hover:text-orange",
  },
  "palate-yellow": {
    bg: "bg-yellow",
    text: "text-yellow",
    hoverText: "hover:text-yellow",
  },
  "palate-brown": {
    bg: "bg-brown",
    text: "text-brown",
    hoverText: "hover:text-brown",
  },
  "palate-lime": {
    bg: "bg-lime",
    text: "text-lime",
    hoverText: "hover:text-lime",
  },
  "palate-blue": {
    bg: "bg-blue",
    text: "text-blue",
    hoverText: "hover:text-blue",
  },
  "palate-purple": {
    bg: "bg-purple",
    text: "text-purple",
    hoverText: "hover:text-purple",
  },
  "palate-teal": {
    bg: "bg-teal",
    text: "text-teal",
    hoverText: "hover:text-teal",
  },
  "palate-red": {
    bg: "bg-red",
    text: "text-red",
    hoverText: "hover:text-red",
  },
};

// ✅ Available colors (keys of the map)
const colors = Object.keys(colorClassMap);

const UISettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  const drawerWidth = 320;


  useEffect(()=>{
    dispatch(setPrimaryColor({
    bg: "bg-yellow",
    text: "text-yellow",
    hoverText: "hover:text-yellow",
    }))
  },[])

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggleDrawer}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-blue text-white rounded-tr rounded-br flex items-center justify-center cursor-pointer z-50"
        style={{ minWidth: 48, minHeight: 48 }}
        animate={{ x: isOpen ? drawerWidth : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ display: "inline-block", transformOrigin: "50% 50%" }}
        >
          <Icon icon="lets-icons:setting-fill" width={24} height={24} />
        </motion.div>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-container"
            className="fixed top-14 left-0 h-full bg-white shadow-lg p-6 overflow-auto z-40"
            initial={{ x: -drawerWidth }}
            animate={{ x: 0 }}
            exit={{ x: -drawerWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: drawerWidth }}
          >
            <h2 className="text-center font-bold mb-4">MULTIPLE COLORS</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {colors.map((color) => {
                const { bg } = colorClassMap[color];
                return (
                  <button
                    key={color}
                    onClick={() => dispatch(setPrimaryColor(color))}
                    className={`h-12 rounded cursor-pointer ${bg} `}
                  />
                );
              })}
            </div>

            <h2 className="text-center font-bold mb-4">BOXED VERSION</h2>
            <div className="flex justify-center gap-4 mb-8">
              <Button text="BOXED" />
              <Button text="FULL WIDTH" />
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button text="NO" />
              <Button text="YES" bgColor="bg-black" />
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button text="YES" />
              <Button text="NO" bgColor="bg-black" />
            </div>

            <p className="text-center text-gray-500 text-sm">
              You Will Find Much More Options For Colors And Styling In Admin
              Panel. This Color Picker Is Used Only For Demonstration Purposes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UISettingsPanel;
