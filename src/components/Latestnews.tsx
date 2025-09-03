


















"use client";
import React from "react";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn, FaRegCalendarAlt } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

const App = () => {
  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      <section className="relative w-full overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 -z-10">
    <Image
       src="/banner-bg.png"
       alt="Banner background"
       width={1920}
       height={1080}
       className="h-[70vh] lg:h-[80vh] w-full object-cover"
    />
    {/* Dark Green Overlay */}
    <div className="absolute inset-0 bg-[#082a25]/60" />
  </div>

  {/* Torn Edge Top (White) */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      className="w-full h-[60px]"
    >
      <path
        d="M-5.64,37.56 C118.11,135.10 347.73,-42.79 503.10,63.01 L500.00,0.00 L0.00,0.00 Z"
        className="fill-white"
      ></path>
    </svg>
  </div>

  {/* Banner Content */}
  <div className="relative flex items-center justify-center h-[70vh] lg:h-[80vh]">
    <div className="text-center px-4">
      {/* Subtitle */}
      <span className="inline-flex items-center gap-2 text-yellow-400 font-caveat text-lg md:text-xl drop-shadow-md">
        <i className="icon-donation" /> Start Donating Poor People
      </span>

      {/* Title */}
      <h2 className="mt-3 text-white font-extrabold text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
        Latest News
      </h2>
    </div>
  </div>
</section>

      {/* Latest News + Sidebar */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Articles */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewsCard
              img="/artical1.png"
              category="Food"
              date="March 25, 2024"
              title="Our New Campaign to Support Displaced Families"
              desc="We are launching a new initiative to provide shelter and food to families displaced by recent events."
            />
            <NewsCard
              img="/artical2.png"
              category="Health"
              date="March 20, 2024"
              title="Health Camp Provides Medical Aid to Remote Villages"
              desc="Our team of doctors and volunteers successfully conducted a health camp in a remote area, providing free check-ups."
            />
            <NewsCard
              img="/artical3.png"
              category="Education"
              date="March 15, 2024"
              title="Building New Schools for a Brighter Future"
              desc="Construction has begun on our newest school project, aiming to provide education to hundreds of children."
            />
            <NewsCard
              img="/artical4.png"
              category="Education"
              date="March 14, 2024"
              title="Scholarships for Underprivileged Students"
              desc="Dozens of students have received full scholarships thanks to our donors’ contributions."
            />
            <NewsCard
              img="/artical5.png"
              category="Food"
              date="March 12, 2024"
              title="Community Kitchens Feed Thousands"
              desc="Our community kitchens are serving over 5,000 meals daily to those in need."
            />
            <NewsCard
              img="/artical6.png"
              category="Health"
              date="March 10, 2024"
              title="Vaccination Drive Protects Children"
              desc="A massive vaccination drive has safeguarded thousands of children against preventable diseases."
            />
            <NewsCard
              img="/artical7.png"
              category="Education"
              date="March 7, 2024"
              title="Digital Literacy Program Launched"
              desc="Our new program is equipping young learners with essential digital skills."
            />
            <NewsCard
              img="/artical8.png"
              category="Food"
              date="March 5, 2024"
              title="Food Packages Distributed in Flood-Hit Areas"
              desc="Thousands of food packages have been distributed in flood-affected communities."
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 max-w-sm">
            {/* Author Profile */}
            <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md text-center min-h-[410px]">
              <img
                src="https://placehold.co/120x120/E2E8F0/1A202C?text=Rosalina"
                alt="Rosalina Willaim profile"
                className="rounded-full mx-auto w-32 h-32 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Rosalina Willaim</h3>
              <p className="text-gray-500 text-sm">Front End Developer</p>
              <p className="text-gray-600 mt-4 text-sm px-4">
                He Whimsically Named Egg Canvas Is The Design Director And Photographer In New York.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="text-gray-600 hover:text-white hover:bg-yellow-500 p-3 rounded-lg border border-gray-300 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://vimeo.com/"
                  target="_blank"
                  className="text-gray-600 hover:text-white hover:bg-yellow-500 p-3 rounded-lg border border-gray-300 transition-colors"
                >
                  <FaVimeoV />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  className="text-gray-600 hover:text-white hover:bg-yellow-500 p-3 rounded-lg border border-gray-300 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  className="text-gray-600 hover:text-white hover:bg-yellow-500 p-3 rounded-lg border border-gray-300 transition-colors"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Search
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Search</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-yellow-500 text-white p-3 rounded-r-lg hover:bg-yellow-600 transition-colors">
                  🔍
                </button>
              </div>
            </div> */}<div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Search</h3>
            <div className="flex">
            <input
             type="text"
             placeholder="Search here"
             className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="p-3 rounded-r-lg border border-gray-300 text-gray-600 hover:text-yellow-500 transition-colors flex items-center justify-center">
             <FiSearch size={20} />
            </button>
            </div>
            </div>

            {/* Recent Posts */}
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center space-x-4 group">
                    <img
                      src="https://placehold.co/80x80/E2E8F0/1A202C?text=Post"
                      alt="Post thumbnail"
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
                        A Helping Hand for Syrian Refugees
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">March 10, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-4 group">
                    <img
                      src="https://placehold.co/80x80/E2E8F0/1A202C?text=Post"
                      alt="Post thumbnail"
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
                        Building Sustainable Schools in Africa
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">March 5, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-4 group">
                    <img
                      src="https://placehold.co/80x80/E2E8F0/1A202C?text=Post"
                      alt="Post thumbnail"
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
                        Building Sustainable Schools in Africa
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">March 5, 2024</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div> */}

{/* Recent Posts */}
<div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h3>
  <ul className="space-y-4">
    
    {/* Post 1 */}
    <li>
      <a href="#" className="flex items-start space-x-3 group">
        <img
          src="/recentpost1.png"
          alt="Post thumbnail"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <p className="flex items-center text-sm text-gray-500">
            <FaRegCalendarAlt className="mr-2 text-gray-400" />
            November 19, 2024
          </p>
          <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
            Where Innovation Meets Foundation
          </h4>
        </div>
      </a>
    </li>

    {/* Post 2 */}
    <li>
      <a href="#" className="flex items-start space-x-3 group">
        <img
          src="/recentpost2.png"
          alt="Post thumbnail"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <p className="flex items-center text-sm text-gray-500">
            <FaRegCalendarAlt className="mr-2 text-gray-400" />
            November 19, 2024
          </p>
          <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
            Where Innovation Meets Foundation
          </h4>
        </div>
      </a>
    </li>

    {/* Post 3 */}
    <li>
      <a href="#" className="flex items-start space-x-3 group">
        <img
          src="/artical3.png"
          alt="Post thumbnail"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <p className="flex items-center text-sm text-gray-500">
            <FaRegCalendarAlt className="mr-2 text-gray-400" />
            November 22, 2024
          </p>
          <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
            Structures That Stand, Dreams That Soar
          </h4>
        </div>
      </a>
    </li>
  </ul>
</div>


            {/* Categories */}
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#FBBF24] transition-colors">
                    Education (05)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#FBBF24] transition-colors">
                    Health (03)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#FBBF24] transition-colors">
                    Food (08)
                  </a>
                </li>
              </ul>
            </div> */}{/* Categories */}
{/* <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>

  <div className="space-y-3">
    <div className="flex justify-between items-center border px-4 py-2 rounded-md bg-white">
      <span className="text-gray-700">Donation</span>
      <span className="text-gray-700">05</span>
    </div>

    <div className="flex justify-between items-center border px-4 py-2 rounded-md bg-white">
      <span className="text-gray-700">Charity</span>
      <span className="text-gray-700">02</span>
    </div>

    <div className="flex justify-between items-center border px-4 py-2 rounded-md bg-white">
      <span className="text-gray-700">Volunteer</span>
      <span className="text-gray-700">09</span>
    </div>

    <div className="flex justify-between items-center border px-4 py-2 rounded-md bg-white">
      <span className="text-gray-700">Health</span>
      <span className="text-gray-700">07</span>
    </div>

    <div className="flex justify-between items-center border px-4 py-2 rounded-md bg-white">
      <span className="text-gray-700">Education</span>
      <span className="text-gray-700">04</span>
    </div>
  </div>
</div> */}<div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>

  <div className="space-y-3">
    <div className="flex justify-between items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-black hover:text-white cursor-pointer transition">
      <span className="text-gray-700">Donation</span>
      <span className="text-gray-700">05</span>
    </div>

    <div className="flex justify-between items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-black hover:text-white cursor-pointer transition">
      <span className="text-gray-700">Charity</span>
      <span className="text-gray-700">02</span>
    </div>

    <div className="flex justify-between items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-black hover:text-white cursor-pointer transition">
      <span className="text-gray-700">Volunteer</span>
      <span className="text-gray-700">09</span>
    </div>

    <div className="flex justify-between items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-black hover:text-white cursor-pointer transition">
      <span className="text-gray-700">Health</span>
      <span className="text-gray-700">07</span>
    </div>

    <div className="flex justify-between items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-black hover:text-white cursor-pointer transition">
      <span className="text-gray-700">Education</span>
      <span className="text-gray-700">04</span>
    </div>
  </div>
</div>
<div className="bg-[#EBEBEB] p-6 rounded-lg min-h-[240px]">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
  <div className="flex flex-wrap gap-3">
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      T-Shirt
    </span>
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      Banner Design
    </span>
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      Brochures
    </span>
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      Landing
    </span>
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      Print
    </span>
    <span className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition">
      Business Card
    </span>
  </div>
</div>


          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-[#082a25] text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="space-y-4">
            <div className="text-2xl font-bold">CharityFund</div>
            <div className="text-sm">&copy; 2024 All rights reserved.</div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-[#FBBF24]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-[#FBBF24]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-[#FBBF24]">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer> */}<div className="flex justify-center items-center space-x-4 my-6">
      {/* Previous Button */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white hover:bg-green-800 transition">
        <FaAngleDoubleLeft />
      </button>

      {/* Page 1 */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-800 hover:bg-yellow-500 hover:text-white transition">
        1
      </button>

      {/* Page 2 (Active) */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-semibold">
        2
      </button>

      {/* Page 3 */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-800 hover:bg-yellow-500 hover:text-white transition">
        3
      </button>

      {/* Next Button */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white hover:bg-green-800 transition">
        <FaAngleDoubleRight />
      </button>
    </div>

    </div>
  );
};

/* Reusable NewsCard Component */
// const NewsCard = ({ img, category, date, title, desc }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out   hover:bg-[#065F46] hover:text-white group">
//     <div className="relative">
//       <img src={img} alt="News article" className="w-full h-48 object-cover" />
//       <span className="absolute top-4 left-4 inline-block bg-[#082a25] text-white text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-[#FBBF24] transition-colors">
//         {category}
//       </span>
//     </div>
//     <div className="p-6 text-left">
//       <span className="text-sm text-gray-500 group-hover:text-gray-200 transition-colors">{date}</span>
//       <h3 className="text-xl font-bold mt-2 mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-300 transition-colors">{desc}</p>
//       <a
//         href="#"
//         className="text-[#FBBF24] font-semibold hover:underline group-hover:text-white transition-colors"
//       >
//         Read More &rarr;
//       </a>
//     </div>
//   </div>
// );
/* Reusable NewsCard Component */
// const NewsCard = ({ img, category, title }) => (
//   <div className="bg-[#3AB19B] rounded-2xl overflow-hidden shadow-lg text-white relative group">
//     {/* Image Section */}
//     <div className="relative">
//       <img
//         src={img}
//         alt="News"
//         className="w-full h-52 object-cover"
//       />
//       {/* Category Badge */}
//       <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
//         {category}
//       </span>
//     </div>

//     {/* Content Section */}
//     <div className="p-5">
//       {/* Author + Comments */}
//       <div className="flex items-center gap-6 text-sm mb-3">
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-white rounded-full"></span>
//           Robert Fox
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
//           Comments (08)
//         </span>
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-bold leading-snug mb-3">
//         {title}
//       </h3>

//       {/* Read More */}
//       <a
//         href="#"
//         className="inline-block font-semibold text-white hover:text-yellow-300 transition-colors"
//       >
//         READ MORE
//       </a>
//     </div>

//     {/* Bottom Icon */}
//     <div className="absolute bottom-3 right-3 opacity-70">
//       <span className="text-2xl">🤍</span>
//     </div>
//   </div>
// );

// const NewsCard = ({ img, category, title }) => (
//   <div className="bg-[#3AB19B] rounded-2xl overflow-hidden shadow-lg text-white relative group">
//     {/* Image Section */}
//     <div className="relative bg-[#3AB19B]">
//       <img
//         src={img}
//         alt="News"
//         className="w-full h-52 object-cover rounded-t-2xl"
//       />
//       {/* Category Badge */}
//       <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
//         {category}
//       </span>
//     </div>

//     {/* Content Section */}
//     <div className="p-5">
//       {/* Author + Comments */}
//       <div className="flex items-center gap-6 text-sm mb-3">
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-white rounded-full"></span>
//           Robert Fox
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
//           Comments (08)
//         </span>
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-bold leading-snug mb-3">
//         {title}
//       </h3>

//       {/* Read More */}
//       <a
//         href="#"
//         className="inline-block font-semibold text-white hover:text-yellow-300 transition-colors"
//       >
//         READ MORE
//       </a>
//     </div>

//     {/* Bottom Icon */}
//     <div className="absolute bottom-3 right-3 opacity-70">
//       <span className="text-2xl">🤍</span>
//     </div>
//   </div>
// );


// const NewsCard = ({ img, category, title }) => (
//   <div className="bg-[#3AB19B] rounded-2xl overflow-hidden shadow-lg text-white relative group">
//     {/* Image Section with Green Frame */}
//     <div className="bg-[#3AB19B] pt-3 px-3">
//       <div className="relative rounded-xl overflow-hidden">
//         <img
//           src={img}
//           alt="News"
//           className="w-full h-52 object-cover rounded-xl"
//         />
//         {/* Category Badge */}
//         <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
//           {category}
//         </span>
//       </div>
//     </div>

//     {/* Content Section */}
//     <div className="p-5">
//       {/* Author + Comments */}
//       <div className="flex items-center gap-6 text-sm mb-3">
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-white rounded-full"></span>
//           Robert Fox
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
//           Comments (08)
//         </span>
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-bold leading-snug mb-3">
//         {title}
//       </h3>

//       {/* Read More */}
//       <a
//         href="#"
//         className="inline-block font-semibold text-white hover:text-yellow-300 transition-colors"
//       >
//         READ MORE
//       </a>
//     </div>

//     {/* Bottom Icon */}
//     <div className="absolute bottom-3 right-3 opacity-70">
//       <span className="text-2xl">🤍</span>
//     </div>
//   </div>
// );

const NewsCard = ({ img, category, title }) => (
  <div className="bg-white hover:bg-[#3AB19B] rounded-2xl overflow-hidden shadow-lg text-gray-800 relative group transition-colors duration-300">
    {/* Image Section with Green Frame */}
    <div className="bg-white group-hover:bg-[#3AB19B] pt-3 px-3 transition-colors duration-300">
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={img}
          alt="News"
          className="w-full h-52 object-cover rounded-xl"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-5 transition-colors duration-300 group-hover:text-white">
      {/* Author + Comments */}
      <div className="flex items-center gap-6 text-sm mb-3">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-600 group-hover:bg-white rounded-full transition-colors"></span>
          Robert Fox
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
          Comments (08)
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold leading-snug mb-3">
        {title}
      </h3>

      {/* Read More */}
      <a
        href="#"
        className="inline-block font-semibold text-gray-800 group-hover:text-yellow-300 transition-colors"
      >
        READ MORE
      </a>
    </div>

    
    
  </div>
);




export default App;















