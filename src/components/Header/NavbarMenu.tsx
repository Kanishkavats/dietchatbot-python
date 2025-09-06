"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import FadeInUp from "@/src/animations/FadeInUp";
import { NavbarDropdown } from "./Dropdown/NavbarDropdown";
import { usePathname } from "next/navigation";

interface Props {
  navItems: any[];
  open: string | null;
  setOpen: (v: string | null) => void;
  route: any;
}

const NavbarMenu = ({ navItems, open, setOpen, route }: Props) => {
  const pathname = usePathname();

  return (
    <ul className="hidden xl:flex items-center gap-x-6 px-10 rounded-full font-medium text-black relative bg-[var(--yellow)]">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href;
        return (
          <li
            key={i}
            className="relative cursor-pointer"
            onMouseEnter={() => setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <div
              className={`flex items-center gap-1 font-semibold font-nunito py-6 transition-colors duration-200
            ${isActive ? "text-[var(--brown)]" : "text-[var(--foreground)]/90 hover:text-[var(--brown)]"}`}
              onClick={() => {
                if (item?.href) route.push(item?.href);
              }}
            >
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
              <FadeInUp initialYExis={30}>
                <NavbarDropdown options={item.dropdown} />
              </FadeInUp>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarMenu;
