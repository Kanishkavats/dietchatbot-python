"use client";

import React from "react";

const TagList = ({
  tags,
  onClick,
  selectedTag,
}: {
  tags: string[];
  onClick: (tag: string) => void;
  selectedTag?: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
    
      <h3 className="text-2xl font-bold font-nunito mb-3 text-[#000000]">Tags</h3>
      <div className="flex flex-wrap gap-5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onClick(tag)}
            className={`px-5 py-2 text-md font-medium  ${
              selectedTag === tag
                ? "bg-yellow text-[#ffffff]"
                : "bg-gray-100 text-[#000000] hover:bg-yellow transition"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
