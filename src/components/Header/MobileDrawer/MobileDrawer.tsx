'use client';
import { motion} from "framer-motion";
import { Icon } from "@iconify/react";
import { NAV_ITEMS, socialIcons } from "@/src/staticResource";
import MobileDropdownItem from "./MobileDropdownItem";
import { logo } from "../../../../public/assets";
import Button from "../../common/Buttons/Button";

interface MobileDrawerProps {
  drawerDelay: number; // <-- Change from boolean to number
  isClosing: boolean;
  open: string | null;
  setOpen: React.Dispatch<React.SetStateAction<string | null>>;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileDrawer = ({
  drawerDelay,
  isClosing,
  open,
  setOpen,
  setMobileMenuOpen
}: MobileDrawerProps) => {


  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{
        duration: 0.6,
        delay: !isClosing ? drawerDelay : 0, 
        ease: 'easeInOut',
      }}
      className="fixed top-0 left-0 h-full w-full md:w-104 bg-[var(--white)] shadow-lg z-50 pt-6 pb-20 xl:hidden overflow-y-auto"
    >

      {/* Close Button */}
      <div className="flex justify-end mr-4 text-[var(--brown)] ">
        <button onClick={() => setMobileMenuOpen(false)}>
          <Icon icon="line-md:menu-to-close-alt-transition" className="font-extrabold" width={34} height={34} />
        </button>
      </div>

      <div className="ps-8 my-10">
        <motion.img src={logo.src} alt="Logo" className="h-10" />
      </div>

      {/* Navigation Items with Dropdowns */}
      <ul>
        {NAV_ITEMS.map((item, i) => (
          <MobileDropdownItem
            key={i}
            item={item}
            open={open}
            setOpen={setOpen}
             setMobileMenuOpen={setMobileMenuOpen} 
          />
        ))}
      </ul>

      {/* Social Icons */}
      <div className="px-8 mt-5">
        <Button text="Donate Now" />
      </div>
      <div className="flex  items-center justify-center space-x-4 mt-10 ">

        {socialIcons.map(({ icon, label, link }) => (
          <motion.a
            key={label}
            href={link}
            aria-label={label}
            whileHover={{ scale: 1, color: "#F3BB11" }}
            className="cursor-pointer bg-[var(--dark-green)] p-3 rounded-full text-[var(--white)]"
          >
            <Icon icon={icon} className="w-5 h-5" />
          </motion.a>
        ))}
      </div>

    </motion.div>
  );
};
