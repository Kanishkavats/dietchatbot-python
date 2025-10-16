"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import EventList from "./EventList";
import PageBanner from "@/src/components/common/PageBanner";
import { oureventbanner } from "@/public/assets";
import { Trans, useTranslation } from "react-i18next";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {t,  i18n } = useTranslation();

  const isHindi = i18n.language === 'hi';

  return (
    <>
      <PageBanner bgImage={oureventbanner} title="Our Event" />
      <section className="bg-gray-100 py-16 flex justify-center items-center w-full">

        <section className="w-11/12 xl:w-10/11">
          {/* Header Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="animate-fade-in mb-10"
          >
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-0 sm:px-6 md:px-8">
              <div className="flex flex-row items-center justify-center gap-3 mt-8 sm:mt-12 mb-2 animate-fade-in-down">
                <i className="text-xl text-green hand-icon mt-4 sm:mt-8 "></i>
                <span className={`text-green font-caveat text-lg sm:text-xl md:text-3xl lg:${isHindi ? 'text-2xl' : 'text-3xl'} font-bold mt-4 sm:mt-8`}>
                  {t("Start Donating Poor People")}
                </span>
              </div>

              <h2 className="w-full max-w-[700px] text-[30px] md:text-[40px] lg:text-[52px] leading-snug font-[900] font-nunito text-dark-green mt-[15px] mb-0 text-center px-4 animate-slide-up">
                <Trans i18nKey={t("Checkout Our Upcoming Full Event List")} components={{ 1: <span className="text-primaryColor" /> }} />
              </h2>


            </div>
          </motion.div>

          {/* Event List + Pagination */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <EventList
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />

          </motion.div>
        </section>
      </section>
    </>
  );
};

export default Event;