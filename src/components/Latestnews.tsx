"use client";
// import { useState } from "react";
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// import Newslist from "./Newslist"; 
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   FaFacebookF,
//   FaVimeoV,
//   FaTwitter,
//   FaLinkedinIn,
//   FaRegCalendarAlt,
//   FaUser,
//   FaComment,
//   FaArrowRight,

// } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";

//  const LatestNews = () => {
//   const [currentPage, setCurrentPage] = useState(1);


//   const pages = [
//     { id: 1, component: <LatestNewsContent /> }, 
//     { id: 2, component: <Newslist /> },          
//     { id: 3, component: <LatestNewsContent /> }, 
//   ];

//   const totalPages = pages.length;

//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//  return (
//    <div className="bg-[#f3f4f6] font-sans antialiased text-[#667471]">

//      <div>{pages[currentPage - 1].component}</div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center space-x-4 my-10">
//         {/* Prev */}
//         <button
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`w-10 h-10 flex items-center justify-center rounded-full 
//             ${currentPage === 1
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-[#046B59] text-white hover:bg-[#FFC107]"}`}
//         >
//           <FaAngleDoubleLeft />
//         </button>

//         {/* Page Numbers */}
//         {pages.map((p) => (
//           <button
//             key={p.id}
//             onClick={() => goToPage(p.id)}
//             className={`w-10 h-10 flex items-center justify-center rounded-full border 
//               ${currentPage === p.id
//                 ? "bg-[#FFC107] text-black font-semibold"
//                 : "border-[#9ca3af] text-[#000000] hover:bg-[#FFC107] hover:text-[#ffffff]"}`}
//           >
//             {p.id}
//           </button>
//         ))}

//         {/* Next */}
//         <button
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`w-10 h-10 flex items-center justify-center rounded-full 
//             ${currentPage === totalPages
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-[#046B59] text-white hover:bg-[#FFC107]"}`}
//         >
//           <FaAngleDoubleRight />
//         </button>
//       </div>
//     </div>
//    );
//  };







//   const LatestNewsContent = () => {
//   return (
//     <div className=" bg-[#f3f4f6] font-sans antialiased text-[#667471]">

//       <section className="py-20 px-4">
//         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

//           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[
//               {
//                 img: "/artical1.png",
//                 category: "Food",
//                 title: "Our New Campaign to Support Displaced Families",
//               },
//               {
//                 img: "/artical2.png",
//                 category: "Health",
//                 title: "Health Camp Provides Medical Aid to Remote Villages",
//               },
//               {
//                 img: "/artical3.png",
//                 category: "Education",
//                 title: "Building New Schools for a Brighter Future",
//               },
//               {
//                 img: "/artical4.png",
//                 category: "Education",
//                 title: "Scholarships for Underprivileged Students",
//               },
//               {
//                 img: "/artical5.png",
//                 category: "Food",
//                 title: "Community Kitchens Feed Thousands",
//               },
//               {
//                 img: "/artical6.png",
//                 category: "Health",
//                 title: "Vaccination Drive Protects Children",
//               },
//               {
//                 img: "/artical7.png",
//                 category: "Education",
//                 title: "Digital Literacy Program Launched",
//               },
//               {
//                 img: "/artical8.png",
//                 category: "Food",
//                 title: "Food Packages Distributed in Flood-Hit Areas",
//               },
//             ].map((card, i) => (
//               <NewsCard key={i} {...card} />
//             ))}
//           </div>


//           <div className="lg:col-span-1 space-y-8 mx-auto w-full max-w-sm">
//             {sidebarData.map((Box, i) => (
//               <motion.div
//                 key={i}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"z
//               >
//                 <Box />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//      </div>
//    ); 
//  };


// const cardVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };


// const NewsCard = ({ img, category, title }) => (
//   <motion.div
//     className="bg-[#ffffff] hover:bg-[#046b59] rounded-2xl shadow-lg text-[#000000] overflow-hidden group relative p-5 flex flex-col"
//     variants={cardVariants}
//     initial="hidden"
//     animate="visible"
//   >

//      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-72">
//        <motion.img
//          src={img}
//          alt="News"
//          className="absolute top-0 left-0 w-full h-full object-cover"
//          whileHover={{ scale: 1.1, rotate: -3 }}
//          transition={{ duration: 0.4 }}
//        />
//        <span className="absolute top-3 left-3 bg-[#064E text-[#ffffff] text-xs font-semibold px-3 py-1 rounded-full">
//          {category}
//        </span>
//      </div> 


//      <div className="flex-1">
//        <div className="flex items-center gap-6 text-sm mb-3 text-[#667471]">
//          <span className="flex items-center gap-2">
//            <FaUser size={18} className="text-[#FFC107]" />
//            Robert Fox
//          </span>
//          <span className="flex items-center gap-2">
//            <FaComment size={18} className="text-[#FFC107]" />
//            Comments (08)
//          </span>
//        </div>
//        <h3 className="text-lg font-bold leading-snug mb-3">{title}</h3>
//      </div>


//      <div className="flex items-center gap-2 relative">
//        <a
//          href="#"
//          className="font-[Nunito,sans-serif] text-[14px] text-black font-bold hover:text-[#FFC107] transition-colors flex items-center gap-2"
//         >
//          Read More
//          <FaArrowRight className="text-[#046B59]" />
//        </a>


//        <motion.div
//          className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100"
//          initial={{ scale: 0.8 }}
//          whileHover={{ scale: [1, 1.2, 1] }}
//          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//        >
//          <img src="/heart.png" alt="heart-bg" className="w-16 h-16 opacity-90" />
//        </motion.div>
//      </div>
//    </motion.div>
//  );

//  const sidebarData = [

//   () => (
//     <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md text-center">
//       <img
//         src="https://placehold.co/120x120/E2E8F0/1A202C?text=Rosalina"
//         alt="Rosalina Willaim profile"
//         className="rounded-full mx-auto mt-6 w-32 h-32 object-cover"
//       />
//       <h3 className="text-xl font-bold text-[#000000] mt-4">Rosalina Willaim</h3>
//       <p className="text-[#667471] text-sm">Front End Developer</p>
//       <p className="text-[#667471] mt-4 text-sm px-4">
//         He Whimsically Named Egg Canvas Is The Design Director And Photographer
//         In New York.
//       </p>


//       <div className="flex justify-center space-x-4 mt-12">
//         <a
//           href="https://www.facebook.com/"
//           target="_blank"
//           className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
//         >
//           <FaFacebookF />
//         </a>
//         <a
//           href="https://vimeo.com/"
//           target="_blank"
//           className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
//         >
//           <FaVimeoV />
//         </a>
//         <a
//           href="https://twitter.com/"
//           target="_blank"
//           className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
//         >
//           <FaTwitter />
//         </a>
//         <a
//           href="https://www.linkedin.com/"
//           target="_blank"
//           className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
//         >
//           <FaLinkedinIn />
//         </a>
//       </div>
//     </div>
//   ),


//   () => (
//     <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
//       <h3 className="text-2xl font-bold text-gray-800 mb-4">Search</h3>
//       <div className="flex">
//         <input
//           type="text"
//           placeholder="Search here"
//           className="w-full p-3 border border-[#667471] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
//         />
//         <button className="p-3 rounded-r-lg border border-[#667471] text-[#667471] hover:text-[#FFC107] transition-colors flex items-center justify-center">
//           <FiSearch size={20} />
//         </button>
//       </div>
//     </div>
//   ),


//   () => (
//     <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
//       <h3 className="text-[18px] font-nunito text-[#000000] font-bold mb-6 w-full text-left">
//         Recent Posts
//       </h3>
//       <ul className="space-y-[30px]">
//         {[
//           {
//             img: "/recentpost1.png",
//             date: "November 19, 2024",
//             title: "Where Innovation Meets Foundation",
//           },
//           {
//             img: "/recentpost2.png",
//             date: "November 19, 2024",
//             title: "Charity That Brings Smiles",
//           },
//           {
//             img: "/artical3.png",
//             date: "November 22, 2024",
//             title: "Structures That Stand, Dreams That Soar",
//           },
//         ].map((post, i) => (
//           <li key={i}>
//             <a href="#" className="flex items-start space-x-3 group">
//               <img
//                 src={post.img}
//                 alt="Post thumbnail"
//                 className="w-16 h-16 rounded-md object-cover"
//               />
//               <div>
//                 <p className="flex items-center text-sm text-[#667471]">
//                   <FaRegCalendarAlt className="mr-2 text-[#667471]" />
//                   {post.date}
//                 </p>
//                 <h4 className="font-semibold text-[#000000] group-hover:text-[#FBBF24] transition-colors">
//                   {post.title}
//                 </h4>
//               </div>
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   ),


//   () => (
//     <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
//       <h3 className="text-2xl font-bold text-[#000000] mb-4">Categories</h3>
//       <div className="space-y-3">
//         {[
//           { name: "Donation", count: "05" },
//           { name: "Charity", count: "02" },
//           { name: "Volunteer", count: "09" },
//           { name: "Health", count: "07" },
//           { name: "Education", count: "04" },
//         ].map((cat, i) => (
//           <div
//             key={i}
//             className="flex justify-between items-center bg-[#ffffff] px-5 py-4 rounded-md cursor-pointer transition hover:bg-[#000000] hover:text-[#ffffff]"
//           >
//             <span>{cat.name}</span>
//             <span>{cat.count}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   ),


//   () => (
//     <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-bold text-[#000000] mb-4">Popular Tags</h3>
//       <div className="flex flex-wrap gap-3">
//         {[
//           "T-Shirt",
//           "Banner Design",
//           "Brochures",
//           "Landing",
//           "Print",
//           "Business Card",
//         ].map((tag, i) => (
//           <span
//             key={i}
//             className="bg-[#ffffff] text-[#667471] px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-[#ffffff] transition"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   ),
//   ];


// export default LatestNews;




import React from "react";
import { motion } from "framer-motion";
import { FaTags } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { BiMessageDetail } from "react-icons/bi";

import { FaRegUserCircle } from "react-icons/fa";
import {
  FaFacebookF,
  FaVimeoV,
  FaTwitter,
  FaLinkedinIn,
  FaRegCalendarAlt,
  FaUser,

  FaArrowRight,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { Icon } from '@iconify/react'



const LatestNews = () => {
  return (
    <div className="bg-[#f3f4f6] font-sans antialiased text-[#667471]">
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: News Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                img: "/article1.png",
                category: "Food",
                title: "Our New Campaign to Support Displaced Families",
              },
              {
                img: "/artical2.png",
                category: "Health",
                title: "Health Camp Provides Medical Aid to Remote Villages",
              },
              {
                img: "/artical3.png",
                category: "Education",
                title: "Building New Schools for a Brighter Future",
              },
              {
                img: "/artical4.png",
                category: "Education",
                title: "Scholarships for Underprivileged Students",
              },
              {
                img: "/artical5.png",
                category: "Food",
                title: "Community Kitchens Feed Thousands",
              },
              {
                img: "/artical6.png",
                category: "Health",
                title: "Vaccination Drive Protects Children",
              },
              {
                img: "/artical7.png",
                category: "Education",
                title: "Digital Literacy Program Launched",
              },
              {
                img: "/artical8.png",
                category: "Food",
                title: "Food Packages Distributed in Flood-Hit Areas",
              },
            ].map((card, i) => (
              <NewsCard key={i} {...card} />
            ))}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1 space-y-8 mx-auto w-full max-w-sm">
            {sidebarData.map((Box, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Box />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ✅ Animations
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ✅ News Card Component
const NewsCard = ({ img, category, title }) => (
  <motion.div
    className="bg-[#ffffff] hover:bg-[#046b59] rounded-2xl shadow-lg text-[#000000]  hover:text-[#ffffff] overflow-hidden group relative p-5 flex flex-col"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Image */}
    <div className="relative mb-4 rounded-xl overflow-hidden w-full h-72">
      <motion.img
        src={img}
        alt="News"
        className="absolute top-0 left-0 w-full h-full object-cover"
        whileHover={{ scale: 1.1, rotate: -3 }}
        transition={{ duration: 0.4 }}
      />
      <span className="absolute top-3 left-3 bg-[#122f2a] text-[#ffffff] text-xm font-semibold px-3 py-1 rounded-full flex items-center gap-2" >
        <FaTags className="text-xm text-[#ffffff]" />
        {category}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center gap-6 text-sm mb-3 font-nunito font-bold text-[#667471] hover:text-[#ffffff]">
        <span className="flex items-center gap-2">
          <FaRegUserCircle className="text-[#FFC107] text-lg hover:text-[#ffffff]" />


          Robert Fox
        </span>

        <span className="flex items-center gap-2">

          
          <Icon
            icon="fa6-solid:comments"
            width={24}
            height={24}
            className="text-[#FFC107] hover:text-[#ffffff]"
          />
          


          Comments (08)
        </span>
      </div>
      <h3 className="text-lg font-bold font-nunito leading-snug mb-3 hover:text-[#ffffff]">{title}</h3>
    </div>

    {/* Read More */}
    <div className="flex items-center gap-2 relative">
      <a
        href="#"
        className="font-[Nunito,sans-serif] text-[14px] text-[#000000] font-bold hover:text-[#ffffff] transition-colors flex items-center gap-2 underline decoration-[#000000] decoration-2"
      >
        Read More

        <FaCircleArrowRight className="text-lg text-[#046B59] hover:text-[#FFC107]" />
      </a>

      {/* Heart Animation */}
      <motion.div
        className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/heart.png" alt="heart-bg" className="w-16 h-16 opacity-90" />
      </motion.div>
    </div>
  </motion.div>
);


const sidebarData = [
  // --- Author Card ---
  () => (
    <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md text-center">
      <img
        src="/assets/charity_with_difference/author-two.png"
        alt="Rosalina Willaim profile"
        className="rounded-full mx-auto mt-6 w-32 h-32 object-cover"
      />
      <h3 className="text-xl font-bold text-[#000000] mt-4">Rosalina Willaim</h3>
      <p className="text-[#667471] text-sm">Front End Developer</p>
      <p className="text-[#667471] mt-4 text-sm px-4">
        He Whimsically Named Egg Canvas Is The Design Director And Photographer
        In New York.
      </p>
      <div className="flex justify-center space-x-4 mt-12">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://vimeo.com/"
          target="_blank"
          className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
        >
          <FaVimeoV />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className="text-[#667471] hover:text-[#FFC107] hover:bg-[#000000] p-3 rounded-lg border border-[#667471] transition-colors"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  ),

  // --- Search Box ---
  () => (
    <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Search</h3>
      <div className="flex">
        <input
          type="text"
          placeholder="Search here"
          className="w-full p-3 border border-[#667471] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
        />
        <button className="p-3 rounded-r-lg border border-[#667471] text-[#667471] hover:text-[#FFC107] transition-colors flex items-center justify-center">
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  ),

  // --- Recent Posts ---
  () => (
    <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
      <h3 className="text-[18px] font-nunito text-[#000000] font-bold mb-6 w-full text-left">
        Recent Posts
      </h3>
      <ul className="space-y-[30px]">
        {[
          {
            img: "/recentpost1.png",
            date: "November 19, 2024",
            title: "Where Innovation Meets Foundation",
          },
          {
            img: "/recentpost2.png",
            date: "November 19, 2024",
            title: "Charity That Brings Smiles",
          },
          {
            img: "/artical3.png",
            date: "November 22, 2024",
            title: "Structures That Stand, Dreams That Soar",
          },
        ].map((post, i) => (
          <li key={i}>
            <a href="#" className="flex items-start space-x-3 group">
              <img
                src={post.img}
                alt="Post thumbnail"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <p className="flex items-center text-sm text-[#667471]">
                  <FaRegCalendarAlt className="mr-2 text-[#667471]" />
                  {post.date}
                </p>
                <h4 className="font-semibold text-[#000000] group-hover:text-[#FBBF24] transition-colors">
                  {post.title}
                </h4>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ),

  // --- Categories ---
  () => (
    <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-[#000000] mb-4">Categories</h3>
      <div className="space-y-3">
        {[
          { name: "Donation", count: "05" },
          { name: "Charity", count: "02" },
          { name: "Volunteer", count: "09" },
          { name: "Health", count: "07" },
          { name: "Education", count: "04" },
        ].map((cat, i) => (
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
  ),

  // --- Popular Tags ---
  () => (
    <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-[#000000] mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-3">
        {[
          "T-Shirt",
          "Banner Design",
          "Brochures",
          "Landing",
          "Print",
          "Business Card",
        ].map((tag, i) => (
          <span
            key={i}
            className="bg-[#ffffff] text-[#667471] px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-[#ffffff] transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  ),
];

export default LatestNews;

