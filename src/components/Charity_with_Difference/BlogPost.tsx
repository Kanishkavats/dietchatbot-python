


"use client";
import Image from "next/image";
import Comments from "./Comments";
import LeaveComment from "./LeaveComment";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { useFetchSingleBlog } from "@/src/hooks/useBlog";

interface BlogPostProps {
  blogId: string;
}

export default function BlogPost({ blogId }: BlogPostProps) {
  const { data, isLoading, isError } = useFetchSingleBlog(blogId);

  if (isLoading) return <p>Loading blog...</p>;
  if (isError) return <p>Failed to load blog.</p>;
  if (!data) return <p>Blog not found</p>;
  const blog = data;
  const BannerImageUrl = blog.images?.[0] || "/default-image.jpg";
  const title = blog.title;
  const summary = blog.summary;
  const description = blog.description;
  const keyPoints = blog.keyPoints || [];
  const location = blog.location;
  const createdDate = blog.createdAt?.split("T")[0];

  return (
    <div className="w-full">
      {/* Banner Image */}
      <div className="relative rounded-lg overflow-hidden h-56 sm:h-64 md:h-80 lg:h-96 w-full">
        <Image src={BannerImageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Blog Content */}
      <div className="p-0 sm:p-2 md:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-foreground mb-3 sm:mb-4 md:mb-6">
          <span className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
            <IoCalendarSharp className="text-yellow text-sm sm:text-base" /> {createdDate}
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
            <IoLocationSharp className="text-yellow text-sm sm:text-base" /> {location}
          </span>
        </div>

        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight font-nunito">
          {title}
        </h1>

        <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-nunito text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
          {description}
        </p>

        <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 font-nunito">
          Summary
        </h2>

        <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-nunito text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
          {summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-foreground font-bold mb-4 sm:mb-6 md:mb-8">
          {keyPoints.map((item: string, index: number) => (
            <div key={index} className="flex items-start gap-2 font-nunito text-xs sm:text-sm md:text-base lg:text-lg">
              <FaRegCheckCircle className="text-green text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6 sm:mt-8 md:mt-12">
        <Comments campaignId={blog.id} />
      </div>

      {/* Leave Comment Section */}
      <div className="mt-6 sm:mt-8 md:mt-12">
        <LeaveComment blogId={blog.id} />
      </div>
    </div>
  );
}
