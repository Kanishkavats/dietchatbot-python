
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
  console.log("blogid",blogId);
  const { data, isLoading, isError } = useFetchSingleBlog(blogId);
  console.log(data,isLoading);

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
  
     console.log(blog,BannerImageUrl,title,summary,description,keyPoints,location,createdDate);
  

  return (
    <div>
     

      {/* Banner Image */}
      <div className="relative rounded-lg overflow-hidden h-64 sm:h-80 md:h-96 w-full">
        <Image src={BannerImageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Blog Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-foreground mb-4 sm:mb-6">
          <span className="flex items-center gap-1 text-sm sm:text-base">
            <IoCalendarSharp className="text-yellow" /> {createdDate}
            
          </span>
          <span className="flex items-center gap-1 text-sm sm:text-base">
            <IoLocationSharp className="text-yellow" /> {location}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight font-nunito">
          {title}
        </h1>
        <p className="text-gray-600 mb-6 sm:mb-8 font-nunito text-sm sm:text-base">{description}</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 font-nunito">
          Summary
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 font-nunito text-sm sm:text-base">{summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-foreground font-bold mb-6 sm:mb-8">
          {keyPoints.map((item: string, index: number) => (
            <div key={index} className="flex items-start gap-2 font-nunito text-sm sm:text-base">
              <FaRegCheckCircle className="text-green text-lg sm:text-xl flex-shrink-0 mt-0.5" /> 
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-8 sm:mt-12">
    <Comments campaignId={blog.id} />
       </div>


      {/* Leave Comment Section */}
      <LeaveComment blogId={blog.id} />
    </div>
  );
}
