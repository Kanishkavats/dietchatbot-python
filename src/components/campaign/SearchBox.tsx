"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SearchBox = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h3 className="font-bold text-xl mb-4">Search Here</h3>
      <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search Here..."
          className="flex-1 outline-none bg-transparent text-foreground/60"
        />
        <Icon icon="mdi:magnify" className="text-foreground/60 text-xl" />
      </div>
    </div>
  );
};

export default SearchBox;
