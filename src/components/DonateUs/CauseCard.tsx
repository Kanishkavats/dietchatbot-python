"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Cause } from "@/src/types/donateUs";

const CauseCard = ({ cause }: { cause: Cause }) => (
  <motion.div
    transition={{ duration: 0.3 }}
    className="flex items-center gap-4 mb-4"
  >
    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
      <Image src={cause.image} alt={cause.title} fill className="object-cover" />
    </div>
    <div>
      <div className="flex items-center text-gray-500 text-sm gap-1">
        <Icon icon="mdi:calendar" className=" text-gray-500" />
        <span>{cause.date}</span>
      </div>
      <h4 className="font-medium text-[19px] pt-3 text-black hover:text-green-600">
        {cause.title}
      </h4>
    </div>
  </motion.div>
);

export default CauseCard;
