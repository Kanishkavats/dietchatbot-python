"use client";
import React from "react";
import NewsCard from "./NewsCard";
import AuthorCard from "./AuthorCard";
import SearchBox from "./SearchBox";
import RecentPosts from "./RecentPosts";
import Categories from "./Categories";
import PopularTags from "./PopularTags";
import { newsCards } from "@/src/staticResource";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";

const LatestNews = () => {
  const{data,isLoading,isError}=useFetchAllBlogs(1,2);
  if (isLoading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to fetch blogs.</p>;
  }
  
  return (
    <div className="bg-[#ffffff] font-sans antialiased text-[#667471]">
      <section className="py-20 px-4">
        <div className="container  grid grid-cols-1 lg:grid-cols-3 gap-1">
          {/* Left: News Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pl-6 lg:pl-10">
            {data?.blogs.map((card:any, i:any) => (
              <NewsCard key={i} card={card} />
            ))}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1 space-y-8 mx-auto w-full max-w-sm">
            <AuthorCard />
            <SearchBox />
            <RecentPosts />
            <Categories />
            <PopularTags />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;
