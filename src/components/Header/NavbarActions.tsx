"use client";
import { Icon } from "@iconify/react";
import Button from "../common/Buttons/Button";
import LanguageSwitcher from "../LanguageSwitcher";
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";
import Link from "next/link";


interface Props {
  setMobileMenuOpen: (v: boolean) => void;
  mobileMenuOpen: boolean;
}

const NavbarActions = ({  setMobileMenuOpen, mobileMenuOpen }: Props) => {
  

    const navScrolled = useSelector((state: RootState) => state.navScroll.navScrolled);
  return (
    <div className="flex items-center gap-4">
      {/* Language Switcher */}
      {navScrolled &&(
        <div className="font-bold hidden md:block">
        <LanguageSwitcher paddingx="px-6 py-4  md:px-4 lg:px-6" paddingy="md:py-[10px] lg:py-4" />
      </div>
      )}

      {/* Donate Button */}
      <Link href="/donate-us" className="hidden md:block">
        <Button text="Donate Now" paddingx="md:px-3  lg:px-8" paddingy="md:py-[10px] lg:py-4" />
      </Link>

      {/* Menu Icon (Mobile) */}
      <div className="xl:hidden block">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-green">
          <Icon icon="ci:menu-alt-02" width={36} height={38} />
        </button>
      </div>
    </div>
  )
}


export default NavbarActions;
