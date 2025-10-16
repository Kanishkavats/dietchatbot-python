"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import EventList from "./EventList";
import PageBanner from "@/src/components/common/PageBanner";
import { oureventbanner } from "@/public/assets";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <PageBanner bgImage={oureventbanner} title="Our Event" />
      {/* Header Section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="animate-fade-in"
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-12 mb-2 animate-fade-in-down">
            <i className="text-xl text-[#00715D] hand-icon mt-4 sm:mt-8 "></i>
            <span className="text-[#00715D] font-caveat text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-8">
              Start Donating Poor People
            </span>
          </div>

          <h2 className="w-full max-w-[600px] text-5xl sm:text-5xl md:text-5xl lg:text-[48px] leading-snug font-extrabold font-nunito text-dark-green mt-[15px] mb-0 text-center px-2 animate-slide-up">
            Checkout Our Upcoming<br />
            Full{" "}
            <span className="text-[#FFC107]">Event</span> List
          </h2>

           
        </div>
      </motion.div>

      {/* Event List + Pagination */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="px-4 sm:px-6 md:px-8"
      >
        <EventList 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />

      </motion.div>
    </>
  );
};

export default Event;