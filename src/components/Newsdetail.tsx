"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { FaVimeoV } from "react-icons/fa";
import { Icon } from "@iconify/react";
import {
  FaRegCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaTumblr,
  FaComment,
  FaUser,
  FaRegEnvelope,
} from "react-icons/fa";
import { comments, recentPosts, tags } from "@/src/staticResource";
import { ppOne, ppTwo } from "@/public/assets";
import { useFetchSingleBlog } from "../hooks/useBlog";
import FadeUpCard from "../animations/FadeButtomUp";
import { Comments, LeaveComment } from "./Charity_with_Difference";
import CustomLoader from "./common/Loader/CustomLoader";
import { useTranslation } from "react-i18next";
interface props {
  id: string;
}
export default function Newsdetail({ id }: props) {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useFetchSingleBlog(id);
  if (isLoading) {
    return <div className=""><CustomLoader/></div>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to fetch blogs.</p>;
  }
  const formattedDate = data?.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(data.createdAt))
    : "";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white font-sans  text-gray-green"
    >
      <div className="max-w-4xl mx-auto lg:w-full p-2 sm:p-4 lg:p-6">
        <FadeUpCard delay={0.3}>
          <div className="relative w-full  h-[250px] sm:h-[300px] lg:h-[500px] xl:h-[550px] mb-6 rounded-3xl overflow-hidden">
            <Image
              src={data?.images[0]}
              alt="Smiling African children running"
              fill
              priority
              className="object-cover object-center "
            />
          </div>
          <div className="flex flex-col md:flex-row  space-x-4 text-sm lg:text-lg mt-2 gap-3 md:gap-5 text-foreground mb-6">
            <span className="flex items-center gap-1 ">
              <IoCalendarSharp className="text-yellow" size={20} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <IoLocationSharp className="text-yellow" size={20} />{" "}
              {data?.location || "New York"}
            </span>
          </div>
          <h1 className=" text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mt-8 lg:mt-12 text-dark-green mb-4 lg:mb-6 leading-tight font-nunito">
            {data?.title || "Give African Childrens A Good Education"}
          </h1>
          <p className="text-gray-green text-sm tracking-wide leading-6 md:leading-7 lg:text-lg lg:leading-10 xl:text-xl mb-8 font-nunito">
            {data?.description}
          </p>
          <div className="bg-[#EBEBEB] p-6 xl:p-10 mt-10 lg:mt-14 border-l-4 border-green">
            <p className="italic text-sm xl:text-xl font-medium text-foreground">
              {`"${data?.quote}"`}
            </p>
            <div className="mt-4 text-sm lg:text-lg flex justify-end">
              <span className="text-green font-semibold">
                ― {data?.quoteAuthor}
              </span>
            </div>
          </div>
          <h2 className="text-xl md:text-3xl xl:text-4xl font-extrabold mt-6 md:mt-10  text-foreground mb-4 font-nunito">
            {t("Summary")}
          </h2>
          <p className="text-gray-green mt-5 lg:mt-8 text-sm tracking-wide leading-6 md:leading-7 lg:text-lg lg:leading-10 xl:text-xl   mb-8 font-nunito">
            {data?.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 text-foreground font-bold mb-8">
            {data &&
              data.keyPoints?.map((point: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm md:text-lg  font-nunito"
                >
                  <FaRegCheckCircle className="text-green text-xl" />
                  {point}
                </div>
              ))}
          </div>
{/* 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-15  mb-8">
            <div className="relative w-full h-[200px]  lg:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={data?.images[1]}
                alt="Young child smiling"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[200px]  lg:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={data?.images[2]}
                alt="Group of children laughing"
                fill
                className="object-cover"
              />
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-14 mb-20 gap-4">
            {/* Tags */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium text-lg lg:text-xl text-dark-green">
                {t("Tags")}
              </span>

              {data &&
                data?.tags?.map((tag: string, index: number) => (
                  <button
                    key={index}
                    className="border px-3 lg:px-4 py-1 transition-all duration-100  text-xs hover:border-none hover:bg-yellow"
                  >
                    {tag}
                  </button>
                ))}
            </div>

            {/* Share */}
            <div className="flex items-center  gap-3">
              <span className="font-medium text-lg lg:text-xl text-dark-green">
                {t("Share")}
              </span>
              <div className="flex space-x-2 gap-4">
                <a
                  href="#"
                  className="p-2 bg-[#EBEBEB] hover:bg-yellow rounded"
                >
                  <FaFacebookF className="text-dark-green" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#EBEBEB] hover:bg-yellow rounded"
                >
                  <FaVimeoV className="text-dark-green" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#EBEBEB] hover:bg-yellow rounded"
                >
                  <FaTwitter className="text-dark-green" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#EBEBEB] hover:bg-yellow rounded"
                >
                  <FaLinkedinIn className="text-dark-green" />
                </a>
              </div>
            </div>
          </div>
        </FadeUpCard>
        
        {/* Comments Section with proper spacing - only show if there are comments */}
        <div className="mt-12 mb-8">
          <FadeUpCard delay={0.3}>
            <div className="w-full">
              <Comments campaignId={id} />
            </div>
          </FadeUpCard>
        </div>
        
        {/* Leave Comment Section with proper spacing - always visible */}
        <div className="mt-8 mb-12">
          <FadeUpCard delay={0.3}>
            <div className="w-full flex justify-center">
              <LeaveComment blogId={id} />
            </div>
          </FadeUpCard>
        </div>
      </div>
    </motion.div>
  );
}
