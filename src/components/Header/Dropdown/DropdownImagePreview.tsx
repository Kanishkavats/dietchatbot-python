"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DropdownOption } from "./NavbarDropdown";

interface Props {
  imageOptions: DropdownOption[];
}

export const DropdownImagePreview = ({ imageOptions }: Props) => {
  return (
    <AnimatePresence>
      {imageOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-[-340px] mt-2 bg-white rounded-lg shadow-lg p-6 z-50"
        >
          <div className="flex flex-wr gap-8">
            {imageOptions.map((opt, idx) => (
              <motion.a
                href={opt.href || "#"}
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
                transition={{ duration: 0.3 }}
                className="w-32 sm:w-50 h-80 bg-white rounded-lg overflow-hidden cursor-pointer relative"
              >
                <div className="relative h-[calc(100%-50px)] w-full">
                  <Image
                    src={opt.image!}
                    alt={opt.name || opt.label || "Preview"}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <motion.div
                    variants={{
                      rest: { opacity: 0, y: -50 },
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex bg-black/30 items-center justify-center"
                  >
                    <button className="bg-yellow-400 cursor-pointer transition transform duration-500 hover:bg-white hover:text-black text-white font-semibold px-4 py-2 rounded-full shadow-lg w-[180px]">
                      Click
                    </button>
                  </motion.div>
                </div>
                <div className="p-2 text-center">
                  <span className="text-sm font-semibold text-gray-800">
                    {opt.name || opt.label}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
