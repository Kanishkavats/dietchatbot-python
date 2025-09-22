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
    <div className="bg-white p-6">
      <h3 className="text-xl font-semibold mb-3">Tags</h3>
      <div className="flex flex-wrap gap-5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onClick(tag)}
            className={`px-5 py-2 text-md font-medium rounded-full ${
              selectedTag === tag
                ? "bg-yellow text-white"
                : "bg-gray-100 text-foreground hover:bg-yellow transition"
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
