"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { posterTwo } from "@/public/assets";
import Donation from "./Donation";

const HeroCause = () => (
  <div className="relative w-full rounded-md xl:rounded-2xl">
    <div className="relative w-full h-[350px] md:h-[450px] bg-[var(--white)] rounded-xl xl:rounded-4xl overflow-hidden">
      <Image src={posterTwo.src} alt="Hero Cause" fill className="object-cover" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative top-[-52px] left-1/2 transform -translate-x-1/2 bg-[var(--white)] rounded-2xl w-[95%] md:w-[90%] px-4 xl:px-8 py-16 shadow z-20"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Help Children Rise Out Of Poverty
      </h2>
      <p className="text-[var(--gray-green)] my-4">
        Lorem Ipsum Is Simply Dummy A Of The Printing And Type Setting Industry.
        Ipsum Has Been The Industry's Standard Dummy.
      </p>
      <Donation />
    </motion.div>
  </div>
);

export default HeroCause;
