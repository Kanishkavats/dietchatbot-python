"use client";

import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import LatestNewsContent from "./Latestnews/index";


import Newslist from "./Newslist";

const Paginationlogic: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#ffffff] font-sans antialiased text-[#667471]">
      {/* Conditional Rendering */}
      {currentPage === 1 && <Newslist />}
      {currentPage === 2 && <LatestNewsContent />}
      {currentPage === 3 && <LatestNewsContent />}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 my-10">
        {/* Prev */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full 
            ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#046B59] text-white hover:bg-[#FFC107]"
            }`}
        >
          <FaAngleDoubleLeft />
        </button>

        {/* Page Numbers */}
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border 
              ${
                currentPage === p
                  ? "bg-[#FFC107] text-black font-semibold"
                  : "border-[#9ca3af] text-[#000000] hover:bg-[#FFC107] hover:text-[#ffffff]"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full 
            ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#046B59] text-white hover:bg-[#FFC107]"
            }`}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Paginationlogic;
