"use client";
import { Dispatch, SetStateAction } from "react";
import { MobileBackdrop } from "./MobileDrawer/MobileBackdrop";
import { MobileDrawer } from "./MobileDrawer/MobileDrawer";
import { NavItem } from "@/src/types/header";

interface Props {
  isClosing: boolean;
  backdropDone: boolean;
  drawerDelay: number;
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>; // ✅ FIXED
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>; // ✅ also fix
   navItems: NavItem[];
}

const NavbarMobile = ({
  isClosing,
  backdropDone,
  drawerDelay,
  open,
  setOpen,
  setMobileMenuOpen,
   navItems,
}: Props) => (
  <>
    <MobileBackdrop isClosing={isClosing} drawerDelay={drawerDelay} />
    {(backdropDone || isClosing) && (
      <MobileDrawer
        drawerDelay={drawerDelay}
        isClosing={isClosing}
        open={open}
        setOpen={setOpen}
        setMobileMenuOpen={setMobileMenuOpen}
         navItems={navItems}
      />
    )}
  </>
);

export default NavbarMobile;