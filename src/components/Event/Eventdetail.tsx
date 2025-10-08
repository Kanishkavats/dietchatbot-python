"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import {
  FaRegCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaTumblr,
} from "react-icons/fa";
import { eventdetail, eventdetail1, oureventbanner } from '@/public/assets';
import Comments from '../Charity_with_Difference/Comments';
import LeaveComment from '../Charity_with_Difference/LeaveComment';
import PageBanner from '../common/PageBanner';
import { Event, defaultEventData, socialMediaButtons, googleMapsEmbedUrl } from '@/src/staticResource';
// import Sidebar from '../Charity_with_Difference/Sidebar';
import Sidebar from "../common/sideBar";

interface BlogPageProps {
  blogId?: string;
  event?: Event;
}

export default function BlogPage({ blogId = "event-details", event }: BlogPageProps) {
  return (
    <>
      <style jsx>{`
        /* Below 420px: 2-column layout */
        @media (max-width: 419px) {
          .social-grid-796 {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-flow: row dense;
          }
          /* Make the last item (Tumblr) span full width like in the screenshot */
          .social-grid-796 > a:last-child {
            grid-column: 1 / -1 !important;
          }
        }
        /* Between 420px and 699px: 6-column grid.
           Row 1: items 1-3 each span 2 columns (fills 6 cols)
           Row 2: items 4-5 each span 3 columns (fills 6 cols) */
        @media (min-width: 420px) and (max-width: 699px) {
          .social-grid-796 {
            grid-template-columns: repeat(6, 1fr) !important;
            grid-template-rows: repeat(2, auto) !important;
          }
          .social-grid-796 > a:nth-child(1) { grid-column: 1 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(2) { grid-column: 3 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(3) { grid-column: 5 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(4) { grid-column: 1 / span 3; grid-row: 2; }
          .social-grid-796 > a:nth-child(5) { grid-column: 4 / span 3; grid-row: 2; }
          .social-grid-796 a {
            height: 7rem; /* match h-28 (sm) */
          }
          .social-grid-796 a :global(svg) {
            font-size: 1.5rem; /* match text-2xl (sm) */
          }
          .social-grid-796 a span {
            font-size: 0.875rem; /* match text-sm (sm) */
          }
        }
        /* Between 580px and 795px: same placement as above for consistency */
        @media (min-width: 580px) and (max-width: 795px) {
          .social-grid-796 {
            grid-template-columns: repeat(6, 1fr) !important;
            grid-template-rows: repeat(2, auto) !important;
          }
          .social-grid-796 > a:nth-child(1) { grid-column: 1 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(2) { grid-column: 3 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(3) { grid-column: 5 / span 2; grid-row: 1; }
          .social-grid-796 > a:nth-child(4) { grid-column: 1 / span 3; grid-row: 2; }
          .social-grid-796 > a:nth-child(5) { grid-column: 4 / span 3; grid-row: 2; }
        }
        /* From 796px and up, force single-line with 5 columns */
        @media (min-width: 796px) {
          .social-grid-796 {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
      <PageBanner 
        bgImage={oureventbanner} 
        title="Event Details" 
        tagline="Start Donating Poor People"
        smallIcon="mdi:calendar-heart"
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#ffffff] font-sans text-[#667471] pt-12 md:pt-16 lg:pt-20;"
      >
        <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-3/5 lg:ml-8 p-4 sm:p-6">
            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[450px] mb-6 rounded-lg overflow-hidden">
              <Image
                src={event?.image || defaultEventData.image}
                alt={event?.title || "Smiling African children running"}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-[#000000] mb-6">
              <span className="flex items-center gap-1">
                <IoCalendarSharp className="text-[#FFC107]" /> {event?.date || defaultEventData.date}
              </span>
              <span className="flex items-center gap-1">
                <IoLocationSharp className="text-[#FFC107]" /> {event?.location || defaultEventData.location}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] mb-6 leading-tight font-nunito">
              {event?.title || defaultEventData.title}
            </h1>
            <p className="text-[#667471] text-xl mb-8 font-nunito">
              {event?.summary || defaultEventData.summary}
            </p>
            <h2 className="text-3xl font-extrabold text-[#000000] mb-4 font-nunito">Summary</h2>
            <p className="text-[#667471] mb-8 text-xl font-nunito">
              {event?.summary || defaultEventData.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#000000] font-bold mb-8">
              {(event?.keyPoints || defaultEventData.keyPoints).map((point, index) => (
                <div key={index} className="flex items-center gap-2  font-bold font-nunito">
                  <FaRegCheckCircle className="text-[#046B59] text-xl" /> {point}
                </div>
              ))}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={eventdetail}
                  alt="Young child smiling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-[220px] sm:h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={eventdetail1}
                  alt="Group of children laughing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-between mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full social-grid-796">
                {[
                  { icon: FaFacebookF, bg: socialMediaButtons[0].bg, label: socialMediaButtons[0].label },
                  { icon: FaTwitter, bg: socialMediaButtons[1].bg, label: socialMediaButtons[1].label },
                  { icon: FaPinterest, bg: socialMediaButtons[2].bg, label: socialMediaButtons[2].label },
                  { icon: FaLinkedinIn, bg: socialMediaButtons[3].bg, label: socialMediaButtons[3].label },
                  { icon: FaTumblr, bg: socialMediaButtons[4].bg, label: socialMediaButtons[4].label },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-full h-20 sm:h-28 lg:h-32 flex flex-col justify-center items-center rounded-md shadow-md text-[#ffffff] hover:opacity-90 transition-all"
                    style={{ backgroundColor: s.bg }}
                  >
                    <s.icon className="text-xl sm:text-2xl lg:text-3xl mb-2" />
                    <span className="text-xs sm:text-sm lg:text-lg font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
              <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] rounded-lg overflow-hidden ">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                 
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            {/* Dynamic Comments Section */}
            <div className="mt-6 sm:mt-8 md:mt-12">
              <Comments campaignId={blogId} />
            </div>

            {/* Dynamic Leave Comment Section */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <LeaveComment blogId={blogId} />
            </div>


          </main>


          <aside className="lg:w-1/3">
       {/* <Sidebar/> */}
       <Sidebar/>
          </aside>
        </div>
      </div>
    </motion.div>
    </>
  );
}
































