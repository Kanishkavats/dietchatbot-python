


"use client";

import React, { useState, useEffect } from 'react';
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchgetcomments } from '@/src/services/commentsApi';
import { mergeComments, CommentType } from '@/src/utils/mergedComment';

interface Comment {
  id: string;
  name: string;
  comment: string;
  image?: string;
  likeCount?: number;
  timeAgo?: string;
  replies?: Comment[];
  isPending?: boolean;
}

interface CommentsProps {
  campaignId: string; // blogId
}

export default function Comments({ campaignId }: CommentsProps) {
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => fetchgetcomments(campaignId),
  });

  useEffect(() => {
    // Update allComments when data changes
    console.log("Supriya data is updating")
    if (data?.comments) {
      console.log("Supriya Comments is updating")
      // Merge API comments with localStorage comments
      const mergedComments = mergeComments(data.comments, campaignId);
      setAllComments(mergedComments);
    } else {
      // If no API comments, still show localStorage comments
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: any) => comment.blogId === campaignId);
      setAllComments(filteredLocalComments);
    }
  }, [data, campaignId, isLoading]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: any) => comment.blogId === campaignId);
      
      if (data?.comments) {
        const mergedComments = mergeComments(data.comments, campaignId);
        setAllComments(mergedComments);
      } else {
        setAllComments(filteredLocalComments);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('commentAdded', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('commentAdded', handleStorageChange);
    };
  }, [data, campaignId]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }
  if(isError){
    return <p>No comments available</p>
  }
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
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow-400 p-1 bg-white flex items-center justify-center">
             
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
                <span className="text-gray-500">
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


