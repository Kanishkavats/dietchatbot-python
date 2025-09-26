"use client";

import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchgetcomments } from "@/src/services/commentsApi";
import { useEffect, useState } from "react";
import { mergeAndCleanComments, CommentType, getLocalComments } from "@/src/utils/commentStorage";

interface CommentsProps {
  campaignId: string; // blogId
}

export default function Comments({ campaignId }: CommentsProps) {
  const [allComments, setAllComments] = useState<CommentType[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => fetchgetcomments(campaignId),
    staleTime: 5 * 60 * 1000, 
  });

  // Use useEffect to merge and clean comments whenever the API data changes
  useEffect(() => {
    const apiComments = data?.comments || [];
    
    // Use the combined function for a single source of truth
    const merged = mergeAndCleanComments(apiComments, campaignId);
    setAllComments(merged);

  }, [data, campaignId]);

  if (isLoading && allComments.length === 0) return <p>Loading comments...</p>;
  if (isError && allComments.length === 0) return <p>No comments available.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {allComments.length.toString().padStart(2, "0")} Comments
      </h2>
      <div className="space-y-10 mb-8">
        {allComments.map((comment) => (
          <div
            key={comment.id} // ID is now guaranteed to be unique across both sources
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow p-1 bg-white flex items-center justify-center">
              <span className="text-6xl font-bold text-gray-500">
                {comment.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h5 className="text-lg sm:text-xl font-bold font-nunito">
                {comment.name}
              </h5>
              {comment.isPending && (
                <span className="ml-2 bg-yellow-200 text-brown px-2 py-1 rounded text-xs font-medium">
                  Pending Approval
                </span>
              )}
              <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                {comment.comment}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                <button className="flex items-center gap-1 hover:text-brown">
                  <FiHeart /> Like {comment.likeCount || 0}
                </button>
                <button className="flex items-center gap-1 hover:text-brown">
                  <FiCornerUpLeft /> Reply
                </button>
                <span className="text-gray-600">
                  {comment.timeAgo || "Just now"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}