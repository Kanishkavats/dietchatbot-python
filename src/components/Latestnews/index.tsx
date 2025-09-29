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
    <div className="w-full mx-auto xl:max-w-[1440px]">
    <div className=" mt-0 max-[719px]:mt-20 md:mt-15 lg:mt-10 md:pl-7 md:pr-7 lg:p-10  p-2 sm:p-4 xl:p-23 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6   ">
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6 xl:gap-8">
            <NewsGrid cards={data?.blogs}/>
          </div>
           <div className="flex justify-center mt-12">
          <FadeUpCard delay={0.3}>
          <CustomPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={data.totalPages}/>
          </FadeUpCard>
          </div>
        </div>
        <div className="xl:col-span-1  md:col-span-2 col-span-1 w-full mt-5 md:mt-0  ">
          <SideAllCom />
        </div>
      </div>
    </div>
</div>
  );
};

export default LatestNews;
