"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import Button from "../common/Buttons/Button";
import { useInView } from "react-intersection-observer";

const SendMsg: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <section
      className="relative flex items-center justify-center min-h-screen w-full bg-[url('/assets/contactbg.png')]  bg-[length:250%] bg:
    bg-center 
    bg-no-repeat
    overflow-hidden
    bg-gradient-to-r from-black/90 to-transparent  before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/60 before:to-transparent before:z-10 "
    >
      <motion.div
        className="absolute top-[-40] left-0 w-1/3 md:w-1/4 h-1/2 md:h-2/3 overflow-hidden z-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/section2/shapeleft.png"
          alt="Decorative shape"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="relative ml-[0%] md:ml-[35%] z-10 w-[50%] min-w-[400px] min-h-screen  bg-[#00715d] p-6 sm:p-8 md:p-10 shadow-lg  overflow-y-auto py-8 ">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mt-6 md:mt-0 lg:md-8 xl:md-10 text-start px-6"
        >
          <div className="flex gap-2">
            <i className="text-2xl text-[#FFC107] hand-icon"></i>
            <span className=" text-[#FFC107] font-caveat font-semibold block text-2xl ">
              Start Donating Poor People
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-white mt-2 font-nunito leading-tight whitespace-nowrap">
            Send Us <span className="text-yellow-400">Message</span>For <br />
            Donation!
          </h2>
        </motion.div>

        <form className="space-y-4 px-6">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="relative">
              <input
                type="email"
                placeholder="your email..."
                className="w-full rounded-md border border-gray-400/50 bg-black/18 px-4 py-4 
                 text-white  focus:outline-none "
              />
              <Send className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 w-5 h-5" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="your phone..."
                className="w-full rounded-md border border-gray-400/50 bg-black/18 px-4 py-4 text-white  focus:outline-none"
              />
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 w-5 h-5" />
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="your address..."
              className="w-full rounded-md border border-gray-400/50 bg-black/18 px-4 py-4 text-white  focus:outline-none"
            />
            <FaLocationDot className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 w-5 h-5" />
          </div>

          <div className="relative text-white">
            <textarea
              rows={4}
              placeholder="your message..."
              className="w-full rounded-md border border-gray-400/50  bg-black/18 px-4 py-4  focus:outline-none resize-none"
            />
            <FaEnvelope className="absolute right-3 top-3 text-yellow-400 w-5 h-5" />
          </div>

          <div className="w-55  text-black">
            <Button
              text="Get A Quote"
              bgColor="bg-[#FFC107]"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-black"
              className="h-16"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SendMsg;
