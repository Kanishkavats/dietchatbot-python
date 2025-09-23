"use client";
import React from "react";

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<EventPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    const delta = 2; // Number of pages to show before/after currentPage

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Always show first page
    pages.push(1);

    // Show ellipsis if start range is far from 2
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Add the range of pages around the current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Show ellipsis if end range is far from last page
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if more than 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-lime-green hover:bg-green cursor-pointer text-white"}
        `}
      >
        «
      </button>

      {/* Page Buttons */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[#667471]">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`w-10 h-10 flex items-center justify-center rounded-full  
              transition-all duration-300 transform hover:scale-110 animate-slide-up
              ${page === currentPage
                ? "bg-yellow text-foreground font-bold shadow-lg"
                : "bg-white text-foreground hover:bg-green hover:text-white cursor-pointer"}
            `}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white
          transition-all duration-300 transform hover:scale-110 animate-fade-in
          ${currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-lime-green hover:bg-green cursor-pointer"}
        `}
      >
        »
      </button>
    </div>
  );
};

export default CustomPagination;
