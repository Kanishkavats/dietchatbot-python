'use client';
import Image from "next/image";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { ppOne, ppTwo } from "@/public/assets";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";



export default function BlogPost() {
  const { data } = useFetchAllBlogs(1, 1);
  const blog = data?.blogs[0];
  const BannerImageUrl = blog?.images[0];
  const title = blog?.title;
  const summary = blog?.summary;
  const description = blog?.description;
  const keyPoints = blog?.keyPoints;
  const location = blog?.location;
  const createdDate = blog?.createdAt?.split("T")[0];

  return (
    <div>
      {/* Featured Image */}
      <div className="relative rounded-lg overflow-hidden h-96 w-full">
        <Image
          src={BannerImageUrl}
          alt="African children running outdoors"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center space-x-4 text-foreground mb-6">
          <span className="flex items-center gap-1">
            <IoCalendarSharp className="text-yellow" /> {createdDate}
          </span>
          <span className="flex items-center gap-1">
            <IoLocationSharp className="text-yellow" /> {location}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight font-nunito">
          {title}
        </h1>

        <p className="text-gray-600 mb-8 font-nunito">{description}</p>

        <h2 className="text-3xl font-bold text-foreground mb-4 font-nunito">
          Summary
        </h2>

        <p className="text-gray-600 mb-8 font-nunito">{summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground font-bold mb-8">
          {keyPoints?.map((item: string, index: number) => (
            <div key={index} className="flex items-start gap-2 font-nunito">
              <FaRegCheckCircle className="text-green text-xl" /> {item}
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={ppOne}
              alt="Young child smiling"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={ppTwo}
              alt="Group of children laughing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <Comments />

      {/* Leave Comment Section */}
      <LeaveComment />
    </div>
  );
}
