


"use client";
import React from "react";
import { motion } from "framer-motion";
import EventList from "./EventList";

const Event = () => {
  return (
    <>
      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="flex items-center gap-3 mb-6">
            <i className="text-xl mr-2 text-[#00715D] hand-icon mt-8 "></i>
            <span className="text-[#00715D] font-caveat text-xl md:text-2xl font-semibold mt-8">
              Start Donating Poor People
            </span>
          </div>
          <h2 className="w-[455.99px] h-[150px] text-[40px] font-bold font-nunito mt-[15px] mb-0 ml-0 mr-0">
            Checkout Our Upcoming Full{" "}
            <span className="text-yellow-500">Event</span> List
          </h2>
          <div className="w-full max-w-5xl mx-auto"></div>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <EventList />
      </motion.div>
    </>
  );
};

export default Event;



