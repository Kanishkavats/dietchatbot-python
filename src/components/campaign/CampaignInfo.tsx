


"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoCalendarSharp, IoLocationSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Comment from "../Charity_with_Difference/Comments"
import LeaveComment from "../Charity_with_Difference/LeaveComment"

import CampaignSidebar from "./CampaignSidebar"; 

interface CampaignInfoProps {
  data: any;
  allCampaigns: any[]; 
  formattedDate?: string;
}

const CampaignInfo: React.FC<CampaignInfoProps> = ({ data, allCampaigns, formattedDate }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white font-sans p-8 md:p-20 text-gray-green"
    >
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* Main Content */}
          <main className="lg:w-3/3 p-2 sm:p-4">
            {/* Main Image */}
            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[450px] mb-6 rounded-lg overflow-hidden shadow-md">
              <Image
                src={data?.images?.[0] || "/default-image.jpg"}
                alt={data?.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Date & Location */}
            <div className="flex items-center space-x-4 text-dark-green mb-6">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <IoCalendarSharp className="text-yellow" />
                  {formattedDate}
                </span>
              )}
              <span className="flex items-center gap-1">
                <IoLocationSharp className="text-yellow" /> {data?.location || "New York"}
              </span>
            </div>

            {/* Title */}
            <h1 className="lg:text-5xl font-extrabold text-dark-green mb-6 leading-tight font-nunito md:text-[30px]">
              {data?.title || "Campaign Title Here"}
            </h1>

            {/* Description */}
            <p className="text-gray-green lg:text-lg mb-8 font-nunito md:text-[18px]">{data?.description}</p>

            {/* Quote Section */}
            {data?.quote && (
              <div className="bg-[#EBEBEB] p-6 mt-8 border-l-4 border-green rounded-lg">
                <p className="italic text-lg font-medium text-dark-green">{`"${data?.quote}"`}</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-green font-semibold">― {data?.quoteAuthor}</span>
                </div>
              </div>
            )}

            {/* Summary */}
            {data?.summary && (
              <>
                <h2 className="lg:text-5xl font-extrabold mt-10 mb-4 text-dark-green font-nunito">
                  Summary
                </h2>
                <p className="text-gray-green mt-4 lg:text-lg mb-8 font-nunito">{data?.summary}</p>
              </>
            )}


            {data?.keyPoints && data.keyPoints.length > 0 && ( <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-green font-bold md:text-[18px] mb-8"> {data.keyPoints.map((point: string, index: number) => ( <div key={index} className="flex items-center gap-2 lg:text-lg font-nunito"> <FaRegCheckCircle className="text-green text-xl" /> {point} </div> ))} </div>)}

            
            

      

            {/* Additional Images */}
            {data?.images?.length > 2 && (
              <><div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-8 mb-8">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={data.images[1]}
                    alt="Additional Image 1"
                    fill
                    className="object-cover" />
                </div>
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={data.images[2]}
                    alt="Additional Image 2"
                    fill
                    className="object-cover" />
                </div>
              </div><Comment /><LeaveComment /></>
            )}
          </main>

          
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignInfo;
