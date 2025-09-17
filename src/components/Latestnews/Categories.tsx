"use client";
import { categories } from "@/src/staticResource";

const Categories = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-black mb-4">Categories</h3>
    {categories.map((cat, i) => (
      <div key={i} className="flex justify-between bg-white px-5 py-3 rounded-md">
        <span>{cat.name}</span>
        <span>{cat.count}</span>
      </div>
    ))}
  </div>
);

export default Categories;
