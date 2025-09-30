"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SearchBox = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h3 className="font-bold font-nunito text-[20px] xl:text-[24px] lg:text-[20px] mb-4 text-[#000000]">Search Here</h3>
      <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search Here..."
          className="flex-1 outline-none bg-transparent text-[#000000]"
        />
        <Icon icon="mdi:magnify" className="text-[#000000] text-xl" />
      </div>
    </div>
  );
};

export default SearchBox;
