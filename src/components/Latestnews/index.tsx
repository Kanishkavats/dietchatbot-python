"use client";
import React from "react";
import NewsCard from "./NewsCard";
import AuthorCard from "./AuthorCard";
import SearchBox from "./SearchBox";
import RecentPosts from "./RecentPosts";
import Categories from "./Categories";
import PopularTags from "./PopularTags";
import { newsCards } from "@/src/staticResource";

const LatestNews = () => {
  return (
    <div className="bg-[#f3f4f6] font-sans antialiased text-[#667471]">
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: News Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsCards.map((card, i) => (
              <NewsCard key={i} {...card} />
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
