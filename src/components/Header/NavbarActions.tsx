"use client";
import { Icon } from "@iconify/react";
import Button from "../common/Buttons/Button";
import LanguageSwitcher from "../LanguageSwitcher";

interface Props {
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  mobileMenuOpen: boolean;
}

const NavbarActions = ({ setSearchOpen, setMobileMenuOpen, mobileMenuOpen }: Props) => (
  <div className="flex items-center gap-4">
    {/* Search Icon */}
    {/* <div className="font-bold">
     <LanguageSwitcher />
    </div> */}

    {/* Donate Button */}
    <div className="hidden md:block">
      <Button text="Donate Now" />
    </div>

    {/* Menu Icon (Mobile) */}
    <div className="xl:hidden block">
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-green">
        <Icon icon="ci:menu-alt-02" width={36} height={38} />
      </button>
    </div>
  </div>
);

export default NavbarActions;
