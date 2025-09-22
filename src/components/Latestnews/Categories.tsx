 "use client";
import { categories } from "@/src/staticResource";

const Categories = () => (
  <div className="bg-card-gray p-5 lg:p-8 xl:p-10 mb-5 rounded-2xl ">
    <h3 className="text-xl lg:text-xl xl:text-3xl font-bold text-black mb-4">Categories</h3>
    <div className="space-y-3 mt-5 w-full">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex justify-between border border-box-border items-center w-full bg-white px-3 py-3 lg:px-4 lg:py-4 xl:px-4 xl:py-5 cursor-pointer transition hover:bg-black hover:text-white"
        >
          <span className="text-gray-800">{cat.name}</span>
          <span>{cat.count}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;

