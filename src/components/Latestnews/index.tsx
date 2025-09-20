"use client";
import React from "react";
import NewsGrid from "./NewsGrid";
import SideAllCom from "./AllSideComponent";
const LatestNews = () => {
  
  
  return (
    <div className="container p-20 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewsGrid />
          </div>
        </div>
        <div className="col-span-1">
          <SideAllCom />
        </div>
      </div>
    </div>

  );
};

export default LatestNews;
