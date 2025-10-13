/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";
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
      className=" font-sans text-gray-green"
    >
      {/* Inner padding: Responsive, but reduced since parent main has padding */}
      <div className="w-full "> 
        {/* Main Image: Responsive height */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] mb-4 sm:mb-6 rounded-3xl overflow-hidden shadow-md">
          <Image
            src={data?.images?.[0] || "/default-image.jpg"}
            alt={data?.title || "Campaign"}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Date & Location: Stack on mobile, row on sm+ */}
<<<<<<< Updated upstream
        <div className="flex flex-col sm:flex-row items-start sm:items-center  text-foreground space-y-1 md:space-x-8 mb-4 xs:mb-6">
          <p className="flex items-center font-nunito  text-[14px] xs:text-sm sm:text-foreground lg:text-base  lg:text-foreground">
            <FaCalendarAlt className="mr-2 text-yellow w-[15px] xs:text-[18px] sm:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px]" />
=======
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-[#000000] mb-4 sm:mb-6">
          <p className="flex items-center font-nunito  text-[14px] sm:text-sm sm:text-[#000000] lg:text-base lg:text-[#000000]">
            <FaRegCalendarAlt className="mr-2 text-yellow w-[15px] sm:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px]" />
>>>>>>> Stashed changes
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : formattedDate || "No date"}
          </p>
<<<<<<< Updated upstream
          <span className="flex items-center gap-1 font-nunito text-[14px] xs:text-[16px] sm:text-foreground lg:text-base lg: text-foreground">
            <IoLocationSharp className="w-[15px] xs:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px] text-yellow" />
=======
          <span className="flex items-center gap-1 font-nunito text-[14px] sm:text-sm sm:text-[#000000] lg:text-base lg: text-[#000000]">
            <IoLocationSharp className="w-[15px] sm:w-[18px] lg:w-[22px] h-[18px] sm:h-[20px] lg:h-[24px] text-yellow" />
>>>>>>> Stashed changes
            {data?.location || "New York"}
          </span>
        </div>
        {/* Title: Responsive sizing, left-aligned */}
<<<<<<< Updated upstream
        <h1 className="xl:text-[36px] text-[22px] md:text-[30px] lg:text-[30px] font-extrabold text-dark-green mb-4 sm:mb-6 leading-tight font-nunito text-left">
          {data?.title || "Campaign Title Here"}
        </h1>
        {/* Description: Responsive text */}
        <p className="text-gray-green mb-6 sm:mb-8 text-[16px] leading-5  md:leading-6 md:text-[18px] font-nunito">
=======
        <h1 className="xl:text-[36px] text-[24px] lg:text-[30px] font-extrabold text-dark-green mb-4 sm:mb-6 leading-tight font-nunito text-left">
          {data?.title || "Campaign Title Here"}
        </h1>
        {/* Description: Responsive text */}
        <p className="text-gray-green mb-6 sm:mb-8 text-[18px]  lg:text-[18px] font-nunito">
>>>>>>> Stashed changes
          {data?.description}
        </p>
        {/* Summary: Conditional, responsive */}
        {data?.summary && (
          <>
<<<<<<< Updated upstream
            <h2 className="xl:text-[36px] text-[22px] md:text-[30px] lg:text-[30px] font-extrabold mt-6 sm:mt-8 mb-2 sm:mb-4 text-dark-green font-nunito">
              Summary
            </h2>
            <p className="text-gray-green mb-6 sm:mb-8 text-[16px] leading-5 md:text-[18px] md:leading-6 font-nunito">
=======
            <h2 className="xl:text-[36px] text-[24px] lg:text-[30px] font-extrabold mt-6 sm:mt-8 mb-2 sm:mb-4 text-dark-green font-nunito">
              Summary
            </h2>
            <p className="text-gray-green mb-6 sm:mb-8 text-[18px]  lg:text-[18px] font-nunito">
>>>>>>> Stashed changes
              {data?.summary}
            </p>
          </>
        )}
        {/* Key Points: Grid stacks on mobile, responsive text */}
        {data?.keyPoints?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-dark-green font-bold text-[10px] sm:text-base md:text-[16px] lg:text-[18px] mb-6 sm:mb-8">
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
            <div className="relative w-full h-[200px]  lg:h-[300px] rounded-md overflow-hidden">
              <Image
                src={data.images[1]}
                alt="Additional Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[200px]  lg:h-[300px] rounded-lg overflow-hidden">
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

 