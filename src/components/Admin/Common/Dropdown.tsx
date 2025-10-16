"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminDropdownProps } from "@/src/types/adminCommon";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = <T extends string | number>({
  options,
  value,
  onChange,
  label,
  icon,
  placeholder,
  error,
  className = "",
  disabled = false,
  readOnly

}: AdminDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (disabled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [disabled]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full min-w-[100px] relative" ref={containerRef}>
      {label && <label className={`block mb-1 font-medium text-blue-50 text-[14px] `}>{label}</label>}

      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer relative
        ${error ? "border-red" : "border-transparent"}
        ${readOnly ? "bg-gray-100" : "bg-gray-200/60"}
        
        ${className}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {icon && !readOnly && (
          <Icon
            icon={icon}
            className="text-gray-500/60 text-lg font-bold "
          />
        )}

        <span className={`flex-1 whitespace-nowrap text-[13px]`}>
          {selectedOption ? selectedOption.label : placeholder || "Select"}
        </span>
        {!readOnly && (<motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 text-[13px]"
        >
          <IoMdArrowDropdown />
        </motion.span>)}

      </div>

      {/* Animated options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full bg-white  rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 text-[14px] cursor-pointer hover:bg-primaryColor ${opt.value === value ? "bg-primaryColor font-medium" : ""
                  }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="text-[10px] text-red mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
