/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuCircleCheckBig } from "react-icons/lu";
import { motion } from "framer-motion";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";
interface CampaignInfoProps {
  data: any;
  allCampaigns: any[]; 
  id: string; 
  formattedDate?: string;
}
const CampaignInfo: React.FC<CampaignInfoProps> = ({ data, formattedDate }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#ffffff] font-sans text-[#667471]"
    >
      {/* Inner padding: Responsive, but reduced since parent main has padding */}
      <div className="w-full p-2 sm:p-4 lg:p-8"> 
        {/* Main Image: Responsive height */}
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[450px] mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-md">
          <Image
            src={data?.images?.[0] || "/default-image.jpg"}
            alt={data?.title || "Campaign"}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Date & Location: Stack on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-[#000000] mb-4 sm:mb-6">
          <p className="flex items-center font-nunito  text-[14px] sm:text-sm sm:text-[#000000] lg:text-base lg:text-[#000000]">
            <FaRegCalendarAlt className="mr-2 text-yellow w-[15px] sm:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px]" />
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : formattedDate || "No date"}
          </p>
          <span className="flex items-center gap-1 font-nunito text-[14px] sm:text-sm sm:text-[#000000] lg:text-base lg: text-[#000000]">
            <IoLocationSharp className="w-[15px] sm:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px] text-yellow" />
            {data?.location || "New York"}
          </span>
        </div>
        {/* Title: Responsive sizing, left-aligned */}
        <h1 className="xl:text-[36px] text-[24px] lg:text-[30px] font-extrabold text-dark-green mb-4 sm:mb-6 leading-tight font-nunito text-left">
          {data?.title || "Campaign Title Here"}
        </h1>
        {/* Description: Responsive text */}
        <p className="text-gray-green mb-6 sm:mb-8 text-[18px]  lg:text-[18px] font-nunito">
          {data?.description}
        </p>
        {/* Summary: Conditional, responsive */}
        {data?.summary && (
          <>
            <h2 className="xl:text-[36px] text-[24px] lg:text-[30px] font-extrabold mt-6 sm:mt-8 mb-2 sm:mb-4 text-dark-green font-nunito">
              Summary
            </h2>
            <p className="text-gray-green mb-6 sm:mb-8 text-[18px]  lg:text-[18px] font-nunito">
              {data?.summary}
            </p>
          </>
        )}
        {/* Key Points: Grid stacks on mobile, responsive text */}
        {data?.keyPoints?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-dark-green font-bold text-sm sm:text-base md:text-[16px] lg:text-[18px] mb-6 sm:mb-8">
            {data.keyPoints.map((point: string, index: number) => (
              <div key={index} className="flex items-start gap-2 font-nunito">
                <LuCircleCheckBig className="text-green text-lg sm:text-xl mt-1 flex-shrink-0" />
                <span className="xl:text-[18px] text-[18px] lg:text-[18px]">{point}</span>
              </div>
            ))}
          </div>
        )}
        {/* Additional Images: Responsive grid/heights */}
        {data?.images?.length > 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 mb-6 sm:mb-8">
            <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={data.images[1]}
                alt="Additional Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={data.images[2]}
                alt="Additional Image 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        {/* Comments Section */}
        <Comments campaignId={data.id} />
        <LeaveComment blogId={data.id} />
      </div>
    </motion.div>
  );
};

export default CampaignInfo;

 