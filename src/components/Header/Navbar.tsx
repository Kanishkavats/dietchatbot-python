"use cliet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/src/staticResource";
import { useRouter } from "next/navigation";
import { logo } from "../../../public/assets";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backdropDone, setBackdropDone] = useState(false);
  const [drawerDelay, setDrawerDelay] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const DRAWER_ANIMATION_DELAY = 0;
  const route = useRouter()

  // Reset backdrop animation flag on open/close
  useEffect(() => {
    if (mobileMenuOpen) {
      const timer = setTimeout(() => {
        setBackdropDone(true);
        setDrawerDelay(false);
      }, DRAWER_ANIMATION_DELAY * 1000);
      return () => clearTimeout(timer);
    } else {
      setBackdropDone(false);
      setDrawerDelay(true);
    }
  }, [mobileMenuOpen]);

  return (
    <nav className="w-full flex items-center justify-between py-4 relative">
      {/* Logo */}
      <div className="h-10 w-40 relative cursor-pointer"
        onClick={() => route.push("/")}
      >
        <Image src={logo.src} alt="Logo" fill />
      </div>

      {/* Desktop Menu */}
      <NavbarMenu
        navItems={NAV_ITEMS}
        open={open}
        setOpen={setOpen}
        route={route}
      />
      <NavbarActions
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {(mobileMenuOpen || isClosing) && (
          <NavbarMobile
            isClosing={isClosing}
            backdropDone={backdropDone}
            drawerDelay={DRAWER_ANIMATION_DELAY}
            open={open}
            setOpen={setOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;