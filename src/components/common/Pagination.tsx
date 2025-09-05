"use client";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import React from "react";

interface PaginationProps {
  currentPage: number;           
  totalPages: number;             
  onPageChange: (page: number) => void; 
  groupSize?: number;             
  className?: string;             
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  groupSize = 3,
  className = "",
}) => {
  const currentGroup = Math.ceil(currentPage / groupSize);
  let startPage = (currentGroup - 1) * groupSize + 1;
  let endPage = startPage + groupSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - groupSize + 1);
  }

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex justify-center items-center gap-3 mt-6 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white 
        ${currentPage === 1 ? "bg-gray-300" : "bg-[#046b59] hover:opacity-80"}`}
      >
        <div className="bg-[#046b59] hover:bg-[#FFC107] transition-colors duration-500 ease-in-out w-14 h-14 rounded-full flex items-center justify-center">
            <HiChevronDoubleLeft size={24} />
        </div>
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold border transition-colors
          ${
            currentPage === num
              ? "bg-[#FFC107] text-black font-bold border-[#FFC107]"
              : "bg-white hover:bg-[#FFC107] transition-colors duration-500 ease-in-out text-black border-gray-300 "
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`w-14 h-14 flex items-center justify-center rounded-full  text-white 
        ${currentPage === totalPages ? "bg-gray-300" : "bg-[#046b59] hover:bg-[#FFC107] transition-colors duration-500 hover:opacity-80"}`}
      >
       <div className="bg-[#046b59] hover:bg-[#FFC107]  transition-colors duration-500 ease-in-out w-14 h-14 rounded-full flex items-center justify-center">
            <HiChevronDoubleRight size={24} />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
