

import Link from "next/link";
import { events, Event } from "@/src/staticResource";

export default function EventList() {
    return (
        <section className="py-16 bg-white">
            <div className="w-[1170px] h-[600px] mx-auto flex gap-[30px]">
               
                <div className="relative w-[570px] h-[600px] bg-black rounded-[4px] overflow-hidden">
                     <Link href="/event-details" className="absolute inset-0">
                        <img
                        src={events[0].image}
                        alt={events[0].title}
                        className="absolute inset-0 w-full h-full object-cover"
                        />
                     </Link>
                   
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute left-8 bottom-10 flex flex-col gap-2 max-w-[255px] text-white">
                        <span className="text-sm">{events[0].date}</span>
                        <h3 className="text-2xl font-semibold leading-snug">
                            <Link href="/event-details">{events[0].title}</Link>
                        </h3>
                        <p className="text-sm flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-primary"></i>
                            {events[0].location}
                        </p>

                    </div>
                </div>

                
                <div className="flex flex-col gap-[32px] w-[570px] h-[600px]">

                    <div className="relative w-[570px] h-[284px] bg-black rounded-[4px] overflow-hidden">
                        <Link href="/event-details" className="absolute inset-0">
                           <img
                           src={events[0].image}
                           alt={events[0].title}
                           className="absolute inset-0 w-full h-full object-cover"
                           />

                        </Link>
                        
                        
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute left-6 bottom-6 text-white max-w-[250px]">
                            <span className="text-sm">{events[1].date}</span>
                            <h3 className="text-xl font-semibold leading-snug">
                                <Link href="/event-details">{events[1].title}</Link>
                            </h3>
                            <p className="text-sm flex items-center gap-2">
                                <i className="fa-solid fa-location-dot text-primary"></i>
                                {events[1].location}
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative w-[570px] h-[284px] bg-black rounded-[4px] overflow-hidden">
                        {events.slice(1, 2).map((event: Event) => (
                            <div
                                key={events[2].id}
                                className="relative w-[270px] h-[284px] bg-black rounded-[4px] overflow-hidden"
                            >   
                                <Link href="/event-details" className="absolute inset-0">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                </Link>
                                
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute left-6 bottom-6 text-white max-w-[250px]">
                                    <span className="text-sm">{event.date}</span>
                                    <h3 className="text-xl font-semibold leading-snug">
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
            </div>
        </section>    
    )}       



