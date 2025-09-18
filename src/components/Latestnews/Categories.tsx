 "use client";
// import { categories } from "@/src/staticResource";

// const Categories = () => (
//   <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
//     <h3 className="text-2xl font-bold text-black mb-4">Categories</h3>
//     {categories.map((cat, i) => (
//       <div key={i} className="flex justify-between bg-white px-5 py-3 rounded-md">
//         <span>{cat.name}</span>
//         <span>{cat.count}</span>
//       </div>
//     ))}
//   </div>
// );

// export default Categories;



import { categories } from "@/src/staticResource";

const Categories = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-[#000000] mb-4">Categories</h3>
    <div className="space-y-3">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-[#ffffff] px-5 py-4 rounded-md cursor-pointer transition hover:bg-[#000000] hover:text-[#ffffff]"
        >
          <span>{cat.name}</span>
          <span>{cat.count}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;

