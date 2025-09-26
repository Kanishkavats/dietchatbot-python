"use client";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => (
  <div className="bg-light-gray p-5 lg:p-6 xl:p-8 mt-10  mb-5 rounded-2xl ">
    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-4">Search Here</h3>
    <div className="flex border border-dusty-rose rounded-xl mt-4 lg:mt-6 xl:mt-8 mb-5">
      <input type="text" placeholder="Search here" className="w-full p-3 focus:border-0 focus:outline-none" />
      <button className="p-3 "><FiSearch size={20} className="text-gray-green" /></button>
    </div>
  </div>
);

export default SearchBox;
