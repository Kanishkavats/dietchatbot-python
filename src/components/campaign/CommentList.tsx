"use client";

import React from "react";
import Image from "next/image";
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";

interface Comment {
  id: string | number;
  name: string;
  avatar: string;
  content: string;
  time: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-dark-green">
        {comments.length.toString().padStart(2, "0")} Comments
      </h2>
      <div className="space-y-10 mb-8">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-yellow">
              <Image
                src={comment.avatar}
                alt={comment.name}
                width={98.4}
                height={98.4}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h5 className="text-lg sm:text-xl font-bold font-nunito text-dark-green">
                {comment.name}
              </h5>
              <p className="text-sm sm:text-base text-gray-green font-nunito leading-snug">
                {comment.content}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-green">
                <button className="flex items-center gap-1 hover:text-blue">
                  <FiHeart /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-blue">
                  <FiCornerUpLeft /> Reply
                </button>
                <span className="text-gray-green">{comment.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
