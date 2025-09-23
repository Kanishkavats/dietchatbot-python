"use client";
import React from "react";
import NewsGrid from "./NewsGrid";
import SideAllCom from "./AllSideComponent";
const LatestNews = () => {
  
  
  return (
    <div className="container mt-0 max-[719px]:mt-20 md:p-15 lg:p-20 p-2 sm:p-4 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
            <NewsGrid />
          </div>
        </div>
        <div className="xl:col-span-1  lg:col-span-2 md:col-span-2 col-span-1 w-full  p-1 mt-5 md:mt-0 flex items-center justify-center ">
          <SideAllCom />
        </div>
      </div>
    </div>

  );
};

export default LatestNews;
