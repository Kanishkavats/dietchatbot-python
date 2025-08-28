"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

export interface DropdownOption {
    label?: string;
    icon?: string;
    image?: string;
    name?: string;
    href?: string;
}

interface DropdownProps {
    options: DropdownOption[];
    open: boolean; // ✅ controlled by parent
}

const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export const Dropdown = ({ options, open }: DropdownProps) => {
    const isImagePreview = options.every((opt) => opt.image);

    console.log(options)

    return (
        <AnimatePresence>
            {open && (
                <>
                    {isImagePreview ? (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute left-[-340px]  mt-2 bg-white rounded-lg shadow-lg p-6 z-50"
                        >
                            <div className="flex flex-wra gap-8">
                                {options.map((opt, idx) => (
                                    <motion.a
                                        href={opt.href || "#"}
                                        key={idx}
                                        whileHover="hover"       // <-- changed: trigger hover from parent
                                        initial="rest"           // <-- added initial state
                                        animate="rest"
                                        transition={{ duration: 0.3 }}
                                        className="w-32 sm:w-50 h-80 bg-white rounded-lg overflow-hidden cursor-pointer relative"
                                    >
                                        {/* Image */}
                                        <div className="relative h-[calc(100%-50px)] w-full">
                                            <Image
                                                src={opt.image!}
                                                alt={opt.name || opt.label || "Preview"}
                                                fill
                                                className="object-cover rounded-t-lg"
                                            />

                                            {/* Hover click button */}
                                            <motion.div
                                                variants={{
                                                    rest: { opacity: 0, y: -50 },
                                                    hover: { opacity: 1, y: 0 },
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0 flex bg-black/30 items-center justify-center "
                                            >
                                                <button className="bg-yellow-400 cursor-pointer transition transform duration-500 hover:bg-white hover:text-black text-white font-semibold px-4 py-2 rounded-full shadow-lg w-[180px]">
                                                    Click
                                                </button>
                                            </motion.div>
                                        </div>

                                        {/* Label */}
                                        <div className="p-2 text-center">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {opt.name || opt.label}
                                            </span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                        </motion.div>
                    ) : (
                        <motion.ul
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 min-w-[180px] bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50"
                        >
                            {options.map((opt, idx) => (
                                <motion.li
                                    key={idx}
                                    className="relative"
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    <a
                                        href={opt.href || "#"}
                                        className="px-4 py-2 cursor-pointer flex items-center gap-2"
                                    >
                                        {opt.icon && <Icon icon={opt.icon} className="w-5 h-5" />}
                                        <span>{opt.label}</span>
                                        {opt.children && (
                                            <Icon icon="mdi:chevron-right" className="ml-auto w-4 h-4" />
                                        )}
                                    </a>
                                    {opt.children && (
                                        <motion.ul
                                            variants={{
                                                rest: { opacity: 0, x: 10, pointerEvents: "none" },
                                                hover: { opacity: 1, x: 0, pointerEvents: "auto" },
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-0 left-full mt-0 ml-2 min-w-[180px] bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50"
                                        >
                                            {opt.children.map((subOpt, subIdx) => (
                                                <motion.li
                                                    key={subIdx}
                                                    className="relative"
                                                    initial="rest"
                                                    whileHover="hover"
                                                >
                                                    <a
                                                        href={subOpt.href || "#"}
                                                        className="px-4 py-2 cursor-pointer flex items-center gap-2"
                                                    >
                                                        {subOpt.icon && <Icon icon={subOpt.icon} className="w-5 h-5" />}
                                                        <span>{subOpt.label}</span>
                                                        {subOpt.children && (
                                                            <Icon icon="mdi:chevron-right" className="ml-auto w-4 h-4" />
                                                        )}
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>


                    )}
                </>
            )}
        </AnimatePresence>
    );
};
