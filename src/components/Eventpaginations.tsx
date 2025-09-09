
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
  
  const allowedPages = [1,2,3];

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      
      <button
        onClick={() => {
          const currentIndex = allowedPages.indexOf(currentPage);
          if (currentIndex > 0) onPageChange(allowedPages[currentIndex - 1]);
        }}
        disabled={currentPage === allowedPages[0]}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white 
          ${currentPage === allowedPages[0]
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-800"} 
          transition`}
      >
        «

      {allowedPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full  
            ${page === currentPage
              ? "bg-yellow-400 text-black font-bold"
              : "bg-white text-black hover:bg-gray-100"} 
            transition`}
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
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white
          ${currentPage === allowedPages[allowedPages.length - 1]
            ? "bg-green-700 hover:bg-green-800"
            : "bg-green-700 hover:bg-green-800"} 
          transition`}
      >
        »
      </button>
    </div>
  );
};

export default EventPagination;
