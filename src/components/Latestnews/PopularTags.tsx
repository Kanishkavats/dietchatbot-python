"use client";
import { popularTags } from "@/src/staticResource";

const PopularTags = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-black mb-4">Popular Tags</h3>
    <div className="flex flex-wrap gap-3">
      {popularTags.map((tag, i) => (
        <span key={i} className="bg-white px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-yellow-400 hover:text-white">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default PopularTags;
