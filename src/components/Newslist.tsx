"use client";
import React from "react";

import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaVimeoV,
    FaTwitter,
    FaLinkedinIn,
    FaRegCalendarAlt,
    FaUser,
    FaComment,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import NewslistCard from "./NewslistCards";


const Newslist = () => {
    const blogs = [
        {
            category: "Health",
            image: "/four.png",
            author: "Robert Fox",
            comments: 3,
            title: "The Whimsically Named Egg Canvas Brainch",
            description:
                "There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised words which don't look even slight believable. If you are going to use a passage of Lorem Ipsum.",
        },
        {
            category: "Education",
            image: "/five.png",
            author: "Robert Fox",
            comments: 3,
            title: "The Whimsically Named Egg Canvas Brainch",
            description:
                "There Are Many Variations Of Passages Of Lorem Ipsum Available, But Majority Have Suffered Teration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slight Believable. If You Are Going To Use A Passage Of Lorem Ipsum.",
        },
        {
            category: "Donation",
            image: "/one.png",
            author: "Robert Fox",
            comments: 3,
            title: "The Whimsically Named Egg Canvas Brainch",
            description:
                "There Are Many Variations Of Passages Of Lorem Ipsum Available, But Majority Have Suffered Teration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slight Believable. If You Are Going To Use A Passage Of Lorem Ipsum.",
        },
    ];

    return (
        <div className="bg-[#f3f4f6] font-sans antialiased text-[#667471]">
            <section className="py-20 px-4">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {blogs.map((blog, index) => (
                            <NewslistCard key={index} {...blog} />
                        ))}
                    </div>

                    
                    <div className="lg:col-span-1 space-y-8 mx-auto w-full max-w-sm">
                        {sidebarData.map((Box, i) => (
                            <motion.div key={i}>
                                <Box />
                            </motion.div>
                        ))}
                    </div>
                </div>

                
                
                
            </section>
        </div>
    );
};


const sidebarData = [
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
                    className="text-gray-600 hover:text-yellow-500 hover:bg-black p-3 rounded-lg border border-[#667471] transition-colors"
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
                    className="text-[#667471] hover:text-[#FFC107] hover:bg-[000000] p-3 rounded-lg border border-[#667471] transition-colors"
                >
                    <FaLinkedinIn />
                </a>
            </div>
        </div>
    ),


    
    () => (
        <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-[#000000] mb-4">Search</h3>
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
                        className="bg-[#ffffff] text-[#000000] px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-[#ffffff] transition"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    ),

];

export default Newslist;








