"use client";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { string } from "zod";


interface DynamicButtonProps {
  type?: "button" | "submit" | "reset"; 
  text?: string;
  icon?: string;
  hoverBg?: string;
  textColor?: string;
  hoverTextColor?: string;
  onClick?: () => void;
  bgColor?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  rounded?: string;
  paddingx?: string;
  paddingy?: string;
}


const Button: React.FC<DynamicButtonProps> = ({
  type,
  text,
  icon = "mdi:arrow-top-right",
  hoverBg = "before:bg-green",
  textColor = "text-foreground",
  hoverTextColor = "group-hover:text-white",
  bgColor = "bg-yellow",
  onClick,
  disabled = false,
  children,
  rounded = "rounded-full",
  paddingx = "px-10",
  paddingy = "py-4",
}) => {
  const iconControls = useAnimationControls();

  return (
    <motion.button
      type={type || "button"}
      {...(onClick ? { onClick } : {})}
      disabled={disabled}
      onHoverStart={() => iconControls.start({ rotate: 45 })}
      onHoverEnd={() => iconControls.start({ rotate: 0 })}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { backgroundSize: "0% 100%", backgroundPosition: "center" },
        hover: {
          backgroundSize: "100% 100%",
          transition: { duration: 0.4, ease: "easeInOut" },
        },
      }}
      className={`w-full relative  cursor-pointer font-semibold font-nunito
        ${bgColor}   ${rounded} ${paddingx} ${paddingy} 
        overflow-hidden group
        before:content-[''] before:absolute before:inset-0 ${hoverBg} 
        before:transition-transform before:duration-500 
        before:origin-center before:scale-x-0 hover:before:scale-x-100 before:z-0
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div
        className={`flex items-center justify-center gap-2 relative z-10 font-bold transition-colors duration-300 ${textColor} ${hoverTextColor} 
        whitespace-nowrap`}
      >
        {children ? (
          children
        ) : (
          <>
            <span className="leading-none">{text}</span>
            {icon && (
              <motion.div
                className="flex items-center justify-center leading-none"
                animate={iconControls}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Icon icon={icon} width={18} height={18} />
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.button>
  );
};

export default Button;
