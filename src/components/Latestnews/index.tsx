"use client";
import React, { useState } from "react";
import NewsGrid from "./NewsGrid";
import SideAllCom from "./AllSideComponent";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
import CustomPagination from "../common/CustomPaginatioin";
import FadeUpCard from "@/src/animations/FadeButtomUp";
const PageLimit=8;
const LatestNews = () => {
  const [currentPage,setCurrentPage]=useState(1);
    const { data, isLoading, isError } = useFetchAllBlogs(currentPage, PageLimit);
    const handlePageChange=(page:number)=>{
      setCurrentPage(page);
    }
    if (isLoading) {
      return <p className="text-center">Loading blogs...</p>;
    }
  
    if (isError) {
      return <p className="text-center text-red">Failed to fetch blogs.</p>;
    }
  
  return (
    <div className="container mt-0 max-[719px]:mt-20 md:p-15 lg:p-20 p-2 sm:p-4 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
            <NewsGrid cards={data?.blogs}/>
          </div>
           <div className="flex justify-center mt-8">
          <FadeUpCard delay={0.3}>
          <CustomPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={data.totalPages}/>
          </FadeUpCard>
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
