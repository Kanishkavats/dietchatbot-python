"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/src/staticResource";
import Eventdetail from "./Eventdetail";
import { Icon } from "@iconify/react";
import { fetchAllEvents, EventsResponse } from "@/src/services/eventApi";
import CustomPagination from "../common/CustomPaginatioin";
import CustomLoader from "../common/Loader/CustomLoader";


interface EventListProps {
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export default function EventList({ currentPage, onPageChange }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: EventsResponse = await fetchAllEvents(currentPage, itemsPerPage);

        // Transform API data to match component expectations
        const transformedEvents: Event[] = response.events.map(event => ({
          ...event,
          date: new Date(event.startTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          image: event.images[0] || '/assets/events.jpg' 
        }));
        
        setEvents(transformedEvents);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentPage]);

  if (loading) {
    return (
      <section className="">
        <div className="flex justify-center items-center h-64">
          <CustomLoader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red">{error}</div>
        </div>
      </section>
    );
  }

  if (currentPage === 2 || currentPage === 3) {
    return <Eventdetail />;
  }

  return (
    <section className=" py-12">
      <div
        className="
          flex flex-col items-center gap-6
          lg:grid lg:grid-cols-5
           w-full
        "
      >
        
        {events[0] && (
          <div
            className=" col-span-3  relative w-full h-[250px] sm:h-[350px] lg:h-[700px] lg:w-full overflow-hidden "
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

            
            <Link href={`/event-details/${events[0].id}`} className="absolute inset-0">
              <img
                src={events[0].image}
                alt={events[0].title}
                className="absolute inset-0 w-full h-full rounded-xl  object-cover"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

            <div className="absolute left-4  font-nunito font-extrabold sm:left-8 bottom-6 sm:bottom-10 flex flex-col gap-2 max-w-[400px] lg:max-w-[350px] text-white animate-slide-up-delay">
              <span className="text-lg lg:text-base font-nunito font-bold">{events[0].date}</span>
              <h3 className="text-xl sm:text-3xl lg:text-[34px] font-bold  leading-snug font-nunito">
                <Link href={`/event-details/${events[0].id}`}>{events[0].title}</Link>
              </h3>
              <p className="text-base lg:text-base  flex items-center gap-2 font-nunito font-bold">
                <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
                {events[0].location}
              </p>
            </div>
          </div>
        )}

        
        <div
          className=" col-span-2
            flex flex-col gap-6 
            w-full h-full
          "
        >
          {events.slice(1,2).map((event: Event, index) => {
          
          return (
            <div
              key={event.id}
              className={`
                relative w-full h-[200px] sm:h-[250px] lg:h-full
                bg-black rounded-[4px] overflow-hidden
                 animate-fade-in card-stagger-${index + 2}
              `}
            >
              <Link href={`/event-details/${event.id}`} className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full rounded-xl  object-cover"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              
              <div className="absolute left-4  font-nunito  font-extrabold  sm:left-6 bottom-4 sm:bottom-6 text-white max-w-[350px] lg:max-w-[300px] animate-slide-up-delay">
                <span className="text-base lg:text-sm font-nunito font-bold">{event.date}</span>
                <h3 className="text-lg sm:text-2xl lg:text-[34px] font-bold leading-snug font-nunito">
                  <Link href={`/event-details/${event.id}`}>{event.title}</Link>
                </h3>
                <p className="text-base lg:text-base flex items-center gap-2 font-nunito font-bold">
                  <Icon icon="ion:location" width="24" height="24" className="text-white lg:w-5 lg:h-5" />
                  {event.location}
                </p>
              </div>
            </div>
          );
          })}
        </div>
      </div>
      
      {/* Pagination */}
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