

"use client";

import React, { useState, useEffect } from 'react';
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchgetcomments } from '@/src/services/commentsApi';
import { mergeComments, CommentType } from '@/src/utils/mergedComment';
import Button from '@/src/components/common/Buttons/Button';

interface Comment {
  id: string;
  name: string;
  comment: string;
  image?: string;
  likeCount?: number;
  timeAgo?: string;
  createdAt?: string;
  replies?: Comment[];
  isPending?: boolean;
}

interface CommentsProps {
  campaignId: string; // blogId
}

export default function Comments({ campaignId }: CommentsProps) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => fetchgetcomments(campaignId),
  });

  useEffect(() => {
   
    if (data?.comments) {
     
      // Merge API comments with localStorage comments
      const mergedComments = mergeComments(data.comments, campaignId);
      setAllComments(mergedComments);
    } else {
      // If no API comments, still show localStorage comments
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: CommentType) => comment.blogId === campaignId);
      setAllComments(filteredLocalComments);
    }
  }, [data, campaignId, isLoading]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: CommentType) => comment.blogId === campaignId);
      
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

  // Function to calculate time difference
  const getTimeAgo = (commentTime: string) => {
    const commentDate = new Date(commentTime);
    const now = currentTime;
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Function to handle load more
  const handleLoadMore = () => {
    setVisibleCommentsCount(prev => prev + 5);
  };

  // Get visible comments
  const visibleComments = allComments.slice(0, visibleCommentsCount);
  const hasMoreComments = allComments.length > visibleCommentsCount;

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
        {visibleComments.map((comment) => (
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
                  {comment.createdAt ? getTimeAgo(comment.createdAt) : (comment.timeAgo || "Just now")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
     
       {hasMoreComments && (
        <div className="flex justify-start mt-8">
          <button
            onClick={handleLoadMore}
            className="relative flex items-center justify-center px-28 py-4 bg-transparent border-0 transition-all duration-300 group min-w-[55rem]"
          >
            {/* Left gray line */}
            <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-80 h-0.5 bg-gray-300"></div>
            
            {/* Yellow text in center with arrow */}
            <span className="text-black font-bold font-nunito text-lg px-3 py-3 z-8 bg-white flex items-center gap-3 rounded-full hover:shadow-sm hover:px-3 hover:bg-yellow hover:text-black hover:cursor-pointer duration-300">
              Load More comments
               <span className="text-black text-1xl group-hover:text-black">↓</span>
            </span>
            
            {/* Right gray line */}
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-80 h-0.5 bg-gray-300"></div>
          </button>
        </div>
      )}
      
    </div>
  );
}

