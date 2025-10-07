"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { events, Event } from "@/src/staticResource";
import Eventdetail from "./Eventdetail";
import { Icon } from "@iconify/react";


interface EventListProps {
  currentPage: number;
}

export default function EventList({ currentPage }: EventListProps) {
  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  if (currentPage === 2 || currentPage === 3) {
    return <Eventdetail />;
  }

  return (
    <section className="py-16 bg-[#ffffff]">
      <div
        className="
          flex flex-col items-center gap-6
          lg:flex-row lg:gap-[20px] lg:w-[1000px] lg:h-[500px] lg:mx-auto
        "
      >
        
        {currentEvents[0] && (
          <div
            className="
              relative w-full h-[250px] sm:h-[350px]
              lg:w-[480px] lg:h-[500px]
               overflow-hidden
              charity-card animate-fade-in card-stagger-1
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
              className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[80px] sm:w-[120px] h-auto z-20 animate-float"
            />

            
            <Link href={`/event-details/${currentEvents[0].id}`} className="absolute inset-0">
              <img
                src={currentEvents[0].image}
                alt={currentEvents[0].title}
                className="absolute inset-0 w-full h-full rounded-xl  object-cover"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            
            <div className="absolute left-4  font-nunito font-extrabold sm:left-8 bottom-6 sm:bottom-10 flex flex-col gap-2 max-w-[400px] lg:max-w-[350px] text-[#ffffff] animate-slide-up-delay">
              <span className="text-lg lg:text-base font-nunito font-bold">{currentEvents[0].date}</span>
              <h3 className="text-xl sm:text-3xl lg:text-2xl font-bold  leading-snug font-nunito">
                <Link href={`/event-details/${currentEvents[0].id}`}>{currentEvents[0].title}</Link>
              </h3>
              <p className="text-base lg:text-sm flex items-center gap-2 font-nunito font-bold">
                <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
                {currentEvents[0].location}
              </p>
            </div>
          </div>
        )}

        
        <div
          className="
            flex flex-col gap-6 w-full
            lg:w-[480px] lg:h-[500px]
          "
        >
          {currentEvents.slice(1).map((event: Event, index) => (
            <div
              key={event.id}
              className={`
                relative w-full h-[200px] sm:h-[250px]
                lg:w-[480px] lg:h-[240px]
                bg-black rounded-[4px] overflow-hidden
                charity-card animate-fade-in card-stagger-${index + 2}
              `}
            >
              <Link href={`/event-details/${event.id}`} className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full rounded-xl  object-cover"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              
              <div className="absolute left-4  font-nunito  font-extrabold  sm:left-6 bottom-4 sm:bottom-6 text-[#ffffff] max-w-[350px] lg:max-w-[300px] animate-slide-up-delay">
                <span className="text-base lg:text-sm font-nunito font-bold">{event.date}</span>
                <h3 className="text-lg sm:text-2xl lg:text-xl font-bold leading-snug font-nunito">
                  <Link href={`/event-details/${event.id}`}>{event.title}</Link>
                </h3>
                <p className="text-base lg:text-sm flex items-center gap-2 font-nunito font-bold">
                  <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
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
