"use client";
import React from "react";

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EventPagination: React.FC<EventPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const allowedPages = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
      
      <button
        onClick={() => {
          const currentIndex = allowedPages.indexOf(currentPage);
          if (currentIndex > 0) onPageChange(allowedPages[currentIndex - 1]);
        }}
        disabled={currentPage === allowedPages[0]}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-[#ffffff] 
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === allowedPages[0]
            ? "bg-[#e5e7eb] cursor-not-allowed"
            : "bg-green-700 hover:bg-[#046B59]"} 
          `}
      >
        «
      </button>

      
      {allowedPages.map((page, index) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full  
            transition-all duration-300 transform hover:scale-110 animate-slide-up card-stagger-${index + 1}
            ${page === currentPage
              ? "bg-yellow-400 text-black font-bold shadow-lg"
              : "bg-[#ffffff] text-black hover:bg-[#F3F4F6]"} 
            `}
        >
          {page}
        </button>
      ))}

      
      <button
        onClick={() => {
          const currentIndex = allowedPages.indexOf(currentPage);
          if (currentIndex < allowedPages.length - 1)
            onPageChange(allowedPages[currentIndex + 1]);
        }}
        disabled={currentPage === allowedPages[allowedPages.length - 1]}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-[#ffffff]
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === allowedPages[allowedPages.length - 1]
            ? "bg-[#e5e7eb] cursor-not-allowed"
            : "bg-green-700 hover:bg-[#046B59]"} 
          `}
      >
        »
      </button>
    </div>
  );
};

export default EventPagination;

