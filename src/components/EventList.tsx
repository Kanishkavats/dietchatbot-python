



"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { events, Event } from "@/src/staticResource";
import Eventdetail from "./Eventdetail";

interface EventListProps {
  currentPage: number;
}

export default function EventList({ currentPage }: EventListProps) {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  if (currentPage === 2 || currentPage === 3) {
    return <Eventdetail />;
  }

  return (
    <section className="py-16 bg-white">
      <div
        className="
          flex flex-col items-center gap-6
          lg:flex-row lg:gap-[30px] lg:w-[1170px] lg:h-[600px] lg:mx-auto
        "
      >
        
        {currentEvents[0] && (
          <div
            className="
              relative w-full h-[250px] sm:h-[350px]
              lg:w-[570px] lg:h-[600px]
              bg-black rounded-[4px] overflow-hidden
            "
          >
            <motion.img
              src="/assets/yellowspade.png"
              alt="yellow heart"
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                x: [-50, 0, -50],
                scale: [0.8, 1.1, 0.5],
              }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[80px] sm:w-[120px] h-auto z-20"
            />

            <Link href="/event-details" className="absolute inset-0">
              <img
                src={currentEvents[0].image}
                alt={currentEvents[0].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Link>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute left-4 sm:left-8 bottom-6 sm:bottom-10 flex flex-col gap-2 max-w-[255px] text-white">
              <span className="text-sm">{currentEvents[0].date}</span>
              <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                <Link href="/event-details">{currentEvents[0].title}</Link>
              </h3>
              <p className="text-sm flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-primary"></i>
                {currentEvents[0].location}
              </p>
            </div>
          </div>
        )}

        
        <div
          className="
            flex flex-col gap-6 w-full
            lg:w-[570px] lg:h-[600px]
          "
        >
          {currentEvents.slice(1).map((event: Event) => (
            <div
              key={event.id}
              className="
                relative w-full h-[200px] sm:h-[250px]
                lg:w-[570px] lg:h-[284px]
                bg-black rounded-[4px] overflow-hidden
              "
            >
              <Link href="/event-details" className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 text-white max-w-[250px]">
                <span className="text-sm">{event.date}</span>
                <h3 className="text-base sm:text-xl font-semibold leading-snug">
                  <Link href="/event-details">{event.title}</Link>
                </h3>
                <p className="text-sm flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-primary"></i>
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
