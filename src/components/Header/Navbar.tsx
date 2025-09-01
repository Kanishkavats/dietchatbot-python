"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { logo } from "@/assets";
import { NAV_ITEMS } from "@/staticResource";
import { NavbarDropdown } from "./Dropdown/NavbarDropdown";
import { MobileBackdrop } from "./MobileDrawer/MobileBackdrop";
import { MobileDrawer } from "./MobileDrawer/MobileDrawer";
import DonateButton from "@/helper/Buttons/DonateButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Navbar = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backdropDone, setBackdropDone] = useState(false);
  const [drawerDelay, setDrawerDelay] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const DRAWER_ANIMATION_DELAY = 0.6;
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);


  // Reset backdrop animation flag on open/close
  useEffect(() => {
    if (mobileMenuOpen) {
      const timer = setTimeout(() => {
        setBackdropDone(true);
        setDrawerDelay(false);
      }, DRAWER_ANIMATION_DELAY * 1000); // convert to ms

      return () => clearTimeout(timer);
    } else {
      setBackdropDone(false);
      setDrawerDelay(true);
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setIsClosing(true);
    setBackdropDone(false);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
      setDrawerDelay(true);
    }, 900); // matches the backdrop exit delay
  };

  useEffect(() => {
    if (searchOpen) {
      const inputTimer = setTimeout(() => {
        setShowSearchInput(true);
      }, 600); // after backdrop

      const closeBtnTimer = setTimeout(() => {
        setShowCloseButton(true);
      }, 900); // after input anim finishes

      return () => {
        clearTimeout(inputTimer);
        clearTimeout(closeBtnTimer);
      };
    } else {
      setShowSearchInput(false);
      setShowCloseButton(false);
    }
  }, [searchOpen]);

  const { primaryColor } = useSelector((state: RootState) => state.theme);

  return (
    <nav className="w-full flex items-center justify-between  md:px-8 py-4 relative">
      {/* Logo */}
      <motion.img src={logo.src} alt="Logo" className="h-10" />

      {/* Main Nav Items - visible only on xl and up */}
      <ul
        style={{ backgroundColor: `var(${primaryColor})` }}
        className={`hidden xl:flex items-center gap-6  px-10 py-6 rounded-full font-medium text-black relative bg-${primaryColor}`}>
        {NAV_ITEMS.map((item, i) => (
          <li
            key={i}
            className="relative cursor-pointer"
            onMouseEnter={() => setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="flex items-center gap-1 font-semibold">
              {item.label}
              {item.dropdown && (
                <motion.span
                  animate={{ rotate: open === item.label ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon icon="mdi:chevron-down" width={16} height={16} />
                </motion.span>
              )}
            </div>

            {/* Dropdown */}
            {item.dropdown && open === item.label && (
              <NavbarDropdown options={item.dropdown} />
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Search Icon (visible on lg and down) */}
        <div className="font-bold">
          <button onClick={() => {
            setSearchOpen(true)}} className="cursor-pointer">
            <Icon icon="mdi:magnify" width={32} height={32} />
          </button>
        </div>
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
              // onClick={() => setSearchOpen(false)} // click on outside  to close
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
                    />
                    <Icon icon="mdi:magnify" width={24} height={24} className="text-black opacity-60" />
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
                  className="fixed top-1/2 left-1/2 w-17 h-17 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-palate-white rounded-full shadow-md cursor-pointer"
                >
                  <div className="bg-palate-yellow w-17 h-17  flex items-center justify-center  rounded-full relative -top-[2px]">
                    <Icon icon="mdi:close" width={26} height={26} className="text-black" />
                  </div>
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Donate Button (visible on all sizes) */}
        <div className="hidden md:block">
          <DonateButton />
        </div>

        {/* Menu Icon (visible on lg and down) */}
        <div className="xl:hidden block">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-palate-green">
            <Icon icon="ci:menu-alt-02" width={36} height={38} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - shown only when toggled */}
      <AnimatePresence>
        {(mobileMenuOpen || isClosing) && (
          <>
            <MobileBackdrop
              isClosing={isClosing}
              drawerDelay={drawerDelay}
            />
            {(backdropDone || isClosing) && (
              <MobileDrawer
                drawerDelay={DRAWER_ANIMATION_DELAY}
                isClosing={isClosing}
                open={open}
                setOpen={setOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            )}
          </>
        )}
      </AnimatePresence>




    </nav>
  );
};

export default Navbar;
