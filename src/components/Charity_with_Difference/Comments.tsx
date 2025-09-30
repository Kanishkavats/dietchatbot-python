"use client";

import React, { useState, useEffect } from 'react';
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchgetcomments, likeComment } from '@/src/services/commentsApi';
import { mergeComments, CommentType,updateLikeCount } from '@/src/utils/mergedComment';
import ReplyComment from '../comments/Reply';
import FadeUpCard from '@/src/animations/FadeButtomUp';
import { useGetReplies } from '@/src/hooks/useComments';
import ButtonLoader from '../common/Loader/ButtonLoader';
import CustomLoader from '../common/Loader/CustomLoader';
import ShowReply from '../comments/ShowReplies';

interface Comment {
  id: string;
  name: string;
  comment: string;
  image?: string;
  likeCount?: number;
  timeAgo?: string;
  createdAt?: string;
  totalReplies?: number;
  isPending?: boolean;
  isLiked?: boolean;
}

interface CommentsProps {
  campaignId: string; // blogId
}

export default function Comments({ campaignId }: CommentsProps) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpenReply,setIsOpenReply]=useState<boolean>(false);
  const [replyCommentId,setReplyCommentId]=useState<string|null>(null);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  useEffect(() => {
  if (isOpenReply) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return () => {
    document.body.classList.remove("overflow-hidden");
  };
}, [isOpenReply]);

  // Load liked state from localStorage
  const getLikedComments = () =>
    JSON.parse(localStorage.getItem("LikedComments") || "[]");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => fetchgetcomments(campaignId),
  });
  
  useEffect(() => {
    // Update allComments when data changes
    console.log("data is updating")
    if (data?.comments) {
      console.log("Comments is updating")
      // Merge API comments with localStorage comments
      const mergedComments = mergeComments(data.comments, campaignId);
      console.log(data.comments);
      // Mark liked comments
      const liked = getLikedComments();
      const updated = mergedComments.map((c: Comment) => ({
        ...c,
        isLiked: liked.includes(c.id),
      }));
      
      setAllComments(updated);
    } else {
      // If no API comments, still show localStorage comments
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: CommentType) => comment.blogId === campaignId);
      
      const liked = getLikedComments();
      const updated = filteredLocalComments.map((c: Comment) => ({
        ...c,
        isLiked: liked.includes(c.id),
      }));
      
      setAllComments(updated);
    }
  }, [data, campaignId, isLoading]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const localComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");
      const filteredLocalComments = localComments.filter((comment: CommentType) => comment.blogId === campaignId);
      
      const liked = getLikedComments();
      
      if (data?.comments) {
        const mergedComments = mergeComments(data.comments, campaignId);
        const updated = mergedComments.map((c: Comment) => ({
          ...c,
          isLiked: liked.includes(c.id),
        }));
        setAllComments(updated);
      } else {
        const updated = filteredLocalComments.map((c: Comment) => ({
          ...c,
          isLiked: liked.includes(c.id),
        }));
        setAllComments(updated);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('commentAdded', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('commentAdded', handleStorageChange);
    };
  }, [data, campaignId]);

  
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

  // Handle like toggle
  const handleLike = async (commentId: string) => {
    const updatedComments = allComments.map((c) => {
      if (c.id === commentId) {
        const isLiked = !c.isLiked;
        const newCount = isLiked
          ? (c.likeCount || 0) + 1
          : Math.max((c.likeCount || 1) - 1, 0);

        // Update localStorage for liked state
        let liked = getLikedComments();
        if (isLiked) {
          liked.push(commentId);
        } else {
          liked = liked.filter((id: string) => id !== commentId);
        }
        localStorage.setItem("LikedComments", JSON.stringify(liked));

        // Update like count in localStorage
        updateLikeCount(commentId, newCount);

        // Call API
        try {
          likeComment(commentId, isLiked ? 1 : -1);
        } catch (error) {
          console.error("Error liking comment:", error);
        }

        return { ...c, isLiked, likeCount: newCount };
      }
      return c;
    });

    setAllComments(updatedComments);
  };
    const handleReplyModel=(value:boolean)=>{
      setIsOpenReply(value);
    }
  // Function to handle load more
  const handleLoadMore = () => {
    setVisibleCommentsCount(prev => prev + 5);
  };

  const toggleReplies = (commentId: string) => {
  setShowReplies((prev) => ({
    ...prev,
    [commentId]: !prev[commentId],
  }));
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
            key={comment.id} 
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
            
              <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                {comment.comment}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                <button 
                  className={`flex items-center gap-1 hover:text-olive-brown ${
                    comment.isLiked ? "text-red" : ""
                  }`}
                  onClick={() => handleLike(comment.id)}
                >
                  <div className="w-[15px] h-[15px]">
                  {comment.isLiked ? (
                    <FaHeart />
                  ) : (
                    <FiHeart />
                  )}
                  </div>
                  
                  Like {comment.likeCount || 0}
                </button>
                <button onClick={()=>{
                  setReplyCommentId(comment.id);
                  setIsOpenReply(true)}} className="flex items-center gap-1 cursor-pointer hover:text-olive-brown">
                  <FiCornerUpLeft /> Reply
                </button>
                <span className="text-gray-500">
                  {comment.createdAt ? getTimeAgo(comment.createdAt) : (comment.timeAgo || "Just now")}
                </span>
              </div>
              {(comment?.totalReplies||0)>0&&(
                <>
                <div className='flex items-center mt-5 space-x-3 justify-start'>
                  <div className='border border-gray-300 w-[4vh]'></div>
                <div>{(comment?.totalReplies||0)>0&&(
                  <div onClick={()=>{
                    setReplyCommentId(comment.id)
                    toggleReplies(comment.id)}} className='cursor-pointer font-bold text-xs md:text-sm text-gray-green'>
                    {showReplies[comment.id] 
                       ? "Hide replies" 
                      : `View ${comment?.totalReplies || 0} more replies`}</div>
                )}</div>
              </div>
              {showReplies[comment.id] && (
              <ShowReply commentId={comment.id} />
              )}
              </>
              )}
            </div>
          </div>
        ))}
      </div>
      {isOpenReply && (
  <div
    className="fixed z-50 flex items-center justify-center inset-0 bg-black/80 md:bg-black/40"
    onClick={() => setIsOpenReply(false)} 
  >
    <FadeUpCard delay={0.3}>
      <div
        onClick={(e) => e.stopPropagation()} 
      >
        <ReplyComment id={replyCommentId} handleReplyModel={handleReplyModel} />
      </div>
    </FadeUpCard>
  </div>
)}

      {/* Load More Button */}
   
    </div>
  );
}