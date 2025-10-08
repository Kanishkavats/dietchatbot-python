"use client";

import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { VolunteerCardProps } from "@/src/types";
import AnimatedReveal from "@/src/animations/AnimatedReveal";

export const SocialBar = () => {
    const socials = [
        { icon: <FaFacebookF />, color: "bg-white" },
        { icon: <FaTwitter />, color: "bg-white" },
        { icon: <FaInstagram />, color: "bg-white" },
        { icon: <FaBehance />, color: "bg-white" },
    ];

    return (
        <div className="flex flex-col gap-2 p-2 ">
            {socials.map((social, idx) => (
                <button
                    key={idx}
                    className={`w-12 h-12 cursor-pointer flex items-center justify-center rounded-full shadow-md text-black transition-colors duration-300 ${social.color} hover:bg-yellow-400`}
                >
                    {social.icon}
                </button>
            ))}
        </div>
    );
};


export const VolunteerCard: React.FC<VolunteerCardProps> = ({ member, idx }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) controls.start({ opacity: 1, y: 0 });
    }, [inView, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
            className="relative  shadow rounded-2xl overflow-hidden group"
            whileHover="hover"
        >
            <Link href={`/volunteer/${member.id}`} className="block">
                <div className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden">
                   <Image
                        src={member.image  || "/assets/default-avatar.png"}
                        alt={member.name || "Member"}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            
                    />


                    <motion.div
                        initial={{ opacity: 0 }}
                        variants={{
                            hover: {
                                opacity: 1,
                                transition: { duration: 0.4 },
                            },
                        }}
                        className="absolute bottom-0 left-[20%] transform -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
                        //style={{
                           // background: `radial-gradient(circle, var(--color-green) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)`,
                       // }}
                    />



                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        variants={{
                            hover: { y: 0, opacity: 1, transition: { duration: 0.4 } },
                        }}
                        className="absolute top-[30%] right-2 z-20"
                    >
                        <SocialBar />
                    </motion.div>
                </div>
                </Link>
            


            <div className="relative bg-[#f1f0ee] h-28 p-8 flex flex-col items-start transition-colors duration-500 group-hover:bg-[#122f2a]">
                <h6 className="font-semibold  cursor-pointer text-md text-black transition-colors duration-300 group-hover:text-white">
                    {member.name}
                </h6>
                <p className="text-sm text-black transition-colors duration-300 group-hover:text-yellow-400 mt-2">
                    {member.role || member.position}
                </p>

                <button className="absolute top-[-22px] right-4 w-12 h-12 flex items-center justify-center bg-black text-white rounded-full transition-colors duration-300 group-hover:bg-yellow-400 overflow-visible">
                    <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                        <FiPlus size={24} />
                    </span>
                </button>
            </div>
            
        </motion.div>
    
    );
};
