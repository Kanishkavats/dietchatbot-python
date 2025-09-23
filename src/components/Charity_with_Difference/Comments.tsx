


"use client";

import Image from 'next/image';
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchgetcomments } from '@/src/services/commentsApi';// make sure path is correct

interface Comment {
  id: string;
  name: string;
  comment: string;
  image?: string; // optional if you want to display a placeholder
  timeAgo?: string;
  likeCount?: number;
  replies?: Comment[];
}

interface CommentsProps {
  campaignId: string; // or blogId depending on usage
}

export default function Comments({ campaignId }: CommentsProps) {
  const { data, isLoading,isError } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => fetchgetcomments(campaignId),
    select: (data) => data || [],
  });

  if (isLoading) {
    return <p>Loading comments...</p>;
  }
if(isError){
  return <p>No comments comments</p>
}
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {data?.comments.length.toString().padStart(2, "0")} Comments
      </h2>
      <div className="space-y-10 mb-8">
        {data?.comments.map((comment: Comment) => (
          <div
            key={comment.id}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow-400 p-1 bg-white flex items-center justify-center">
             
              <span className="text-2xl font-bold text-gray-700">
                {comment.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h5 className="text-lg sm:text-xl font-bold font-nunito">{comment.name}</h5>
              <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                {comment.comment}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiHeart /> Like {comment.likeCount || 0}
                </button>
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiCornerUpLeft /> Reply
                </button>
                <span className="text-gray-600">{comment.timeAgo || "Just now"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


