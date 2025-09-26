



"use client";

import Image from "next/image";
import { IoCalendarSharp, IoLocationSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";

import { FaRegCalendarAlt } from "react-icons/fa";

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
      <div className="container mx-auto">
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
            
            
            <p className="flex items-center font-nunito text-sm text-[#667471]">
              <FaRegCalendarAlt className="mr-2" />

              {data?.createdAt
                ? new Date(data.createdAt).toLocaleDateString()
                : "No date"}
            </p>
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

          {/* Summary */}
          {data?.summary && (
            <>
              <h2 className="lg:text-5xl font-extrabold mt-10 mb-4 text-dark-green font-nunito">
                Summary
              </h2>
              <p className="text-gray-green mt-4 lg:text-lg mb-8 font-nunito">{data?.summary}</p>
            </>
          )}



          {/* Key Points */}

          {data?.keyPoints?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-green font-bold md:text-[18px] mb-8">
              {data.keyPoints.map((point: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2 lg:text-lg font-nunito"
                >
                  <FaRegCheckCircle className="text-green text-xl mt-1" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}


          {/* Comments */}
          <Comments campaignId={data.id} />
          <LeaveComment blogId={data.id} />
        </main>
      </div>
    </motion.div>
  );
};

export default CampaignInfo;
