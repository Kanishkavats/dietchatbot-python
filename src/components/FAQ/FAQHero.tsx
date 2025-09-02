"use client";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { spradeBase } from "@/assets";
import { Icon } from "@iconify/react/dist/iconify.js";
// import faqBg from "@/assets/faq-bg.jpg"; 

const FAQHero = () => {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden ">
            {/* Background Image */}
            {/* <Image
        src={faqBg}
        alt="FAQ Background"
        fill
        className="object-cover"
        priority
      /> */}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 text-center px-6 "
            >
                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-2 text-palate-yellow font-semibold mb-4 text-2xl"
                ><Icon icon="mingcute:hand-heart-line" className="text-3xl" />
                    <span>Start Donating Poor People</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-6xl xl:text-[75px] font-bold text-white"
                >
                    Frequently Asked Questions
                </motion.h2>

            </motion.div>
            {/* Decorative Heart Bottom Left */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    duration: 3,       // total time for one cycle
                    repeat: Infinity,  // loop forever
                    ease: "easeInOut", // smooth animation
                }}
                className="absolute top-[29%] xl:top-[58%] left-40 xl:left-30 transform -translate-y-1/2 text-palate-yellow size-17"
            >
                <img src={spradeBase.src} alt="" />
            </motion.div>
        </section>
    );
};

export default FAQHero;
