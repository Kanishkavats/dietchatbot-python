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
  
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); 

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages); 
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-[#ffffff] 
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === 1
            ? "bg-[#9ca3af] cursor-not-allowed"
            : "bg-[#046b59]  hover:bg-[#122f2a]cursor-pointer"} 
        `}
      >
        «
      </button>

      
        {pages.map((page, index) =>
         page === "..." ? (
           <span key={index} className="px-2 text-gray-500">...</span>
         ) : (
           <button
             key={page}
             onClick={() => onPageChange(Number(page))}
             className={`w-10 h-10 flex items-center justify-center rounded-full  
               transition-all duration-300 transform hover:scale-110 animate-slide-up card-stagger-${index + 1}
               ${page === currentPage
                 ? "bg-hsl(55,90%,52,52%) text-black font-bold shadow-lg"
                 : "bg-white text-black hover:bg-gray-100 cursor-pointer"} 
             `}
           >
             {page}
           </button>
         )
       )} 
     


      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-lime-green cursor-pointer hover:bg-green"} 
        `}
      >
        »
      </button>
    </div>
  );
};

export default EventPagination;
