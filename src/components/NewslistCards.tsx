"use client";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

interface BlogCardProps {
  category: string;
  image: string;
  author: string;
  comments: number;
  title: string;
  description: string;
}

export default function NewslistCard({
  category,
  image,
  author,
  comments,
  title,
  description,
}: BlogCardProps) {
  return (
    <div className="mb-12">
     
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full h-[400px]"
        />
        <span className="absolute top-4 left-4 bg-[#122f2a] text-[#ffffff] text-sm px-4 py-1 rounded">
          {category}
        </span>
      </div>

      
      <div className="flex items-center gap-6 text-[#667471] text-sm mt-4">
        <div className="flex items-center gap-2">
          <FaUser className="text-[#FFC107]" />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCommentDots className="text-[#FFC107]" />
          <span>Comments ({comments.toString().padStart(2, "0")})</span>
        </div>
      </div>

     
      <h2 className="text-2xl font-bold text-[#000000] mt-2">{title}</h2>

   
      <p className=" text-[#667471] mt-2 leading-relaxed">{description}</p>

      
      <button className="mt-4 flex items-center gap-2 text-[#000000] font-semibold hover:gap-3 transition-all duration-300">
        READ MORE →
      </button>
    </div>
  );
}
