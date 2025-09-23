"use client";

import Image from "next/image";
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useFetchCommentById } from "@/src/hooks/useComments";

interface CommentsProps {
  blogId: string;
}

interface CommentType {
  id: string;
  name: string;
  comment: string;
  image?: string; // optional if user has no avatar
  timeAgo?: string;
}

export default function Comments({ blogId }: CommentsProps) {
  const { data, isLoading, isError } = useFetchCommentById(blogId);
  console.log(blogId);
  
  


  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Failed to load comments.</p>;

  // Ensure data is an array
  const comments: CommentType[] = data?.comments || [];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        {comments.length.toString().padStart(2, "0")} Comments
      </h2>
      <div className="space-y-10 mb-8">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow-400 p-1 bg-white">
              <Image
                src={comment.image || "/default-avatar.jpg"} // fallback image
                alt={comment.name}
                width={98.4}
                height={98.4}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h5 className="text-lg sm:text-xl font-bold font-nunito">{comment.name}</h5>
              <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                {comment.comment}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiHeart /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiCornerUpLeft /> Reply
                </button>
                {comment.timeAgo && <span className="text-gray-600">{comment.timeAgo}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


