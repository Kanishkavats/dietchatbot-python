"use client";
import { popularTags } from "@/src/staticResource";

const PopularTags = () => (
  <div className="bg-card-gray p-5 lg:p-8 xl:p-10 mb-5  rounded-2xl ">
    <h3 className="text-xl lg:text-xl xl:text-3xl font-bold text-black mb-4">Popular Tags</h3>
    <div className="flex flex-wrap mt-4 lg:mt-6 xl:mt-8 gap-3">
      {popularTags.map((tag, i) => (
        <span key={i} className="bg-gray-light border transition-colors duration-300 border-gray-light px-5 py-2 md:px-6 md:py-2 xl:px-8 xl:py-3 cursor-pointer hover:bg-yellow-400 hover:text-dark-green">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default PopularTags;
