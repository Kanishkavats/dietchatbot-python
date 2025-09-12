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
        <div className="bg-gray-50 font-sans antialiased text-gray-800">
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

                
                <motion.div className="flex justify-center items-center space-x-4 my-6">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white hover:bg-green-800 transition">
                        <FaAngleDoubleLeft />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-800 hover:bg-yellow-500 hover:text-white transition">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-semibold">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-800 hover:bg-yellow-500 hover:text-white transition">
                        3
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white hover:bg-green-800 transition">
                        <FaAngleDoubleRight />
                    </button>
                </motion.div>
            </section>
        </div>
    );
};


const sidebarData = [
    () => (
        <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md text-center">
            <img
                src="https://placehold.co/120x120/E2E8F0/1A202C?text=Rosalina"
                alt="Rosalina Willaim profile"
                className="rounded-full mx-auto mt-6 w-32 h-32 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Rosalina Willaim</h3>
            <p className="text-gray-500 text-sm">Front End Developer</p>
            <p className="text-gray-600 mt-4 text-sm px-4">
                He Whimsically Named Egg Canvas Is The Design Director And Photographer
                In New York.
            </p>

            <div className="flex justify-center space-x-4 mt-12">
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="text-gray-600 hover:text-yellow-500 hover:bg-black p-3 rounded-lg border border-gray-300 transition-colors"
                >
                    <FaFacebookF />
                </a>
                <a
                    href="https://vimeo.com/"
                    target="_blank"
                    className="text-gray-600 hover:text-yellow-500 hover:bg-black p-3 rounded-lg border border-gray-300 transition-colors"
                >
                    <FaVimeoV />
                </a>
                <a
                    href="https://twitter.com/"
                    target="_blank"
                    className="text-gray-600 hover:text-yellow-500 hover:bg-black p-3 rounded-lg border border-gray-300 transition-colors"
                >
                    <FaTwitter />
                </a>
                <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    className="text-gray-600 hover:text-yellow-500 hover:bg-black p-3 rounded-lg border border-gray-300 transition-colors"
                >
                    <FaLinkedinIn />
                </a>
            </div>
        </div>
    ),


    
    () => (
        <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
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
                                <p className="flex items-center text-sm text-gray-500">
                                    <FaRegCalendarAlt className="mr-2 text-gray-400" />
                                    {post.date}
                                </p>
                                <h4 className="font-semibold text-gray-800 group-hover:text-[#FBBF24] transition-colors">
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>
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
                        className="flex justify-between items-center bg-white px-5 py-4 rounded-md cursor-pointer transition hover:bg-black hover:text-white"
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
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
                        className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    ),

];

export default Newslist;








