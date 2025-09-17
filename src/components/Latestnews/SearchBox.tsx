"use client";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Search</h3>
    <div className="flex">
      <input type="text" placeholder="Search here" className="w-full p-3 border rounded-l-lg" />
      <button className="p-3 border rounded-r-lg"><FiSearch size={20} /></button>
    </div>
  </div>
);

export default SearchBox;
