"use client";
import { Dispatch, SetStateAction } from "react";
import { MobileBackdrop } from "./MobileDrawer/MobileBackdrop";
import { MobileDrawer } from "./MobileDrawer/MobileDrawer";

interface Props {
  isClosing: boolean;
  backdropDone: boolean;
  drawerDelay: number;
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>; // ✅ FIXED
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>; // ✅ also fix
}

const NavbarMobile = ({
  isClosing,
  backdropDone,
  drawerDelay,
  open,
  setOpen,
  setMobileMenuOpen,
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
      />
    )}
  </>
);

export default NavbarMobile;
