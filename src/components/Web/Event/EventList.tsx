"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// import { Event } from "@/src/staticResource";
import Eventdetail from "./Eventdetail";
import { Icon } from "@iconify/react";
import CustomPagination from "../../UI/web/Pagination";
import CustomLoader from "../../UI/web/Loader/CustomLoader";
import { EventListProps } from "@/src/types";
import { useFetchAllEvent } from "@/src/hooks/web/useEvent";

export default function EventList({ currentPage, onPageChange }: EventListProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
const{data,isLoading,isError}=useFetchAllEvent(currentPage,itemsPerPage);
  useEffect(() => {
     if (!data) return;
      const transformedEvents: Event[] = data.events?.map((event: any) => ({
    ...event,
    date: new Date(event.startTime).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: event.images?.[0] || "/assets/events.jpg", // safe optional chaining
  })) || [];

  setEvents(transformedEvents);
  setTotalPages(data.totalPages || 1);

  }, [data]);

  //  Loading State
  if (isLoading) {
    return (
      <section>
        <div className="flex justify-center items-center h-64">
          <CustomLoader />
        </div>
      </section>
    );
  }
  //  Error State
  if (isError) {
    return (
      <section className="py-16 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red">{'Failed to load Event data'}</div>
        </div>
      </section>
    );
  }

  //  Event detail page condition
  if (currentPage === 2 || currentPage === 3) {
    return <Eventdetail />;
  }

  //  Dynamic Layout Rendering
  return (
    <section className="py-12 w-full">
      {events.length === 1 ? (
        // Single Event - full width
        <motion.div
          key={events[0].id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[700px] overflow-hidden rounded-xl"
        >
          <Link href={`/events/${events[0].id}`} className="absolute inset-0">
            <img
              src={events[0].image}
              alt={events[0].title}
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute w-full bottom-6 left-4 sm:left-6 text-white font-nunito font-extrabold">
            <span className="text-base flex justify-center lg:text-lg">{events[0].date}</span>
            <h3 className="text-lg flex justify-center sm:text-2xl lg:text-5xl font-bold leading-snug">
              <Link href={`/events/${events[0].id}`}>{events[0].title}</Link>
            </h3>
            <p className="text-sm lg:text-lg  sm:text-base flex items-center justify-center gap-2">
              <Icon icon="ion:location" width="20" height="20" className="text-white" />
              {events[0].location}
            </p>
          </div>
        </motion.div>
      ) : events.length === 2 ? (
        // Two events - 50/50 grid
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] overflow-hidden rounded-xl"
            >
              <Link href={`/events/${event.id}`} className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-4 sm:left-6 text-white font-nunito font-extrabold">
                <span className="text-base lg:text-sm">{event.date}</span>
                <h3 className="text-lg sm:text-2xl lg:text-[28px] font-bold leading-snug">
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </h3>
                <p className="text-sm sm:text-base flex items-center gap-2">
                  <Icon icon="ion:location" width="20" height="20" className="text-white" />
                  {event.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Default layout (main + side events)
        <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-5 w-full">
          {events[0] && (
            <div className="col-span-3 relative w-full h-[250px] sm:h-[350px] lg:h-[700px] overflow-hidden">
              <Link href={`/events/${events[0].id}`} className="absolute inset-0">
                <img
                  src={events[0].image}
                  alt={events[0].title}
                  className="absolute inset-0 w-full h-full rounded-xl object-cover"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <div className="absolute left-4 sm:left-8 bottom-6 sm:bottom-10 text-white font-nunito font-extrabold animate-slide-up-delay max-w-[400px] lg:max-w-[350px]">
                <span className="text-lg lg:text-base">{events[0].date}</span>
                <h3 className="text-xl sm:text-3xl lg:text-[34px] font-bold leading-snug">
                  <Link href={`/events/${events[0].id}`}>{events[0].title}</Link>
                </h3>
                <p className="text-base lg:text-base flex items-center gap-2">
                  <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
                  {events[0].location}
                </p>
              </div>
            </div>
          )}

          <div className="col-span-2 flex flex-col gap-6 w-full h-full">
            {events.slice(1).map((event: any, index) => (
              <div
                key={event.id}
                className={`relative w-full h-[200px] sm:h-[250px] lg:h-full bg-black rounded-[4px] overflow-hidden animate-fade-in card-stagger-${index + 2}`}
              >
                <Link href={`/event-details/${event.id}`} className="absolute inset-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full rounded-xl object-cover"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 text-white font-nunito font-extrabold max-w-[350px] lg:max-w-[300px] animate-slide-up-delay">
                  <span className="text-base lg:text-sm">{event.date}</span>
                  <h3 className="text-lg sm:text-2xl lg:text-[34px] font-bold leading-snug">
                    <Link href={`/events/${event.id}`}>{event.title}</Link>
                  </h3>
                  <p className="text-base lg:text-base flex items-center gap-2">
                    <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center mt-12">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}
