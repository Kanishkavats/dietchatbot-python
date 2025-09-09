








"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EventList from "./EventList";
import EventPagination from "./Eventpaginations";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
 
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <i className="text-xl text-[#00715D] hand-icon mt-4 sm:mt-8"></i>
            <span className="text-[#00715D] font-caveat text-lg sm:text-xl md:text-2xl font-semibold mt-2 sm:mt-8">
              Start Donating Poor People
            </span>
          </div>

          
          <h2 className="w-full max-w-[455px] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-snug font-bold font-nunito mt-[15px] mb-0 text-center px-2">
            Checkout Our Upcoming Full{" "}
            <span className="text-yellow-500">Event</span> List
          </h2>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="px-4 sm:px-6 md:px-10"
      >
        <EventList currentPage={currentPage} />

        <div className="flex justify-center mt-6">
          <EventPagination
            totalPages={5}
            currentPage={currentPage}
            onPageChange={(page) => {
              if (page === 1 || page === 3) setCurrentPage(page);
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Event;




