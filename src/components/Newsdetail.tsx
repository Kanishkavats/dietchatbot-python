"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { FaVimeoV } from "react-icons/fa";
import {
    FaRegCheckCircle,
    FaFacebookF,
    FaTwitter,
    FaPinterest,
    FaLinkedinIn,
    FaTumblr,
    FaComment,
    FaUser,
    FaEnvelope,
} from "react-icons/fa";
import { comments, recentPosts, tags } from "@/src/staticResource";
import { ppOne, ppTwo } from '@/public/assets';
export default function Newsdetail() {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}

            className="bg-gray-50 font-sans text-gray-800"
        >
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="lg:w-2/3 p-4 sm:p-6">
                        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[450px] mb-6 rounded-lg overflow-hidden">
                            <Image
                                src="/assets/poster 2.png"
                                alt="Smiling African children running"
                                fill
                                priority
                                className="object-cover object-center"
                            />
                        </div>
                        <div className="flex items-center space-x-4 text-black mb-6">
                            <span className="flex items-center gap-1">
                                <IoCalendarSharp className="text-[#FFC107]" /> 02 Apr 2021
                            </span>
                            <span className="flex items-center gap-1">
                                <IoLocationSharp className="text-[#FFC107]" /> 684 West College St. Sun City, USA
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight font-nunito">
                            Give African Childrens A Good Education
                        </h1>
                        <p className="text-gray-600 mb-8 font-nunito">
                            Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
                        </p>
                        <div className="bg-gray-100 p-6 border-l-4 border-green-600">
                            <p className="italic text-gray-700">
                                Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo
                                Consequat Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse. 
                            </p>
                            <div className="mt-4 flex justify-end">
                                <span className="text-green-700 font-semibold">― Christian Bale</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-nunito">Summary</h2>
                        <p className="text-gray-600 mb-8 font-nunito">
                            Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black font-bold mb-8">
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Empower Through Charity
                            </div>
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Giving Hope, Changing Lives
                            </div>
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Healing Communities
                            </div>
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Together We Can
                            </div>
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Compassion In Action
                            </div>
                            <div className="flex items-center gap-2 font-nunito">
                                <FaRegCheckCircle className="text-[#046B59] text-xl" /> Every Act Counts
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                                <Image
                                    src={ppOne}
                                    alt="Young child smiling"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                                <Image
                                    src={ppTwo}
                                    alt="Group of children laughing"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
                            {/* Tags */}
                            <div className="flex items-center flex-wrap gap-2">
                                <span className="font-medium">Tags:</span>
                                <button className="border px-3 py-1 rounded text-sm hover:bg-gray-200">
                                    Donation
                                </button>
                                <button className="border px-3 py-1 rounded text-sm hover:bg-gray-200">
                                    Charity
                                </button>
                            </div>

                            {/* Share */}
                            <div className="flex items-center flex-wrap gap-3">
                                <span className="font-medium">Share:</span>
                                <div className="flex space-x-2">
                                    <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 rounded">
                                        <FaFacebookF className="text-gray-700" />
                                    </a>
                                    <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 rounded">
                                        <FaVimeoV className="text-gray-700" />
                                    </a>
                                    <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 rounded">
                                        <FaTwitter className="text-gray-700" />
                                    </a>
                                    <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 rounded">
                                        <FaLinkedinIn className="text-gray-700" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">
                                {comments.length.toString().padStart(2, "0")} Comments
                            </h2>
                            <div className="space-y-10 mb-8">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                                    >
                                        <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-yellow-300">
                                            <Image
                                                src={comment.avatar}
                                                alt={comment.name}
                                                width={98.4}
                                                height={98.4}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-lg sm:text-xl font-bold font-nunito">{comment.name}</h5>
                                            <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug">
                                                {comment.content}
                                            </p>
                                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                                                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                                                    <FiHeart /> Like
                                                </button>
                                                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                                                    <FiCornerUpLeft /> Reply
                                                </button>
                                                <span className="text-gray-600">{comment.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg lg:w-[896px] lg:h-[595px] lg:mt-20 lg:px-5 lg:py-15">
                            <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">Leave A Comment</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[316px] lg:h-[96px] lg:px-5 lg:py-3">
                                        <FaUser size={18} />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-transparent focus:outline-none ml-2"
                                        />
                                    </div>
                                    <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[316px] lg:h-[96px] lg:px-5 lg:py-3">
                                        <FaEnvelope className="text-xl mt-1" />
                                        <input
                                            type="email"
                                            placeholder="Enter Email"
                                            className="w-full bg-transparent focus:outline-none ml-2"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[656px] lg:h-[184px] lg:px-5 lg:py-3">
                                    <FaComment size={18} />
                                    <textarea
                                        placeholder="Type Your Comments..."
                                        className="w-full bg-transparent focus:outline-none resize-none ml-2"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-[#122F2A] text-white text-[16px] px-6 py-3 rounded-md hover:opacity-90 transition"
                                >
                                    Submit Comment
                                </button>
                            </form>
                        </div>
                    </main>









                    <aside className="lg:w-1/3 space-y-8">
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
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">Search Here</h3>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button className="p-2 sm:p-3 rounded-r-lg border border-gray-300 text-gray-600 hover:text-[#FFC107] transition-colors flex items-center justify-center">
                                    <FiSearch size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#ffffff] rounded-lg shadow-md p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="flex items-start gap-3">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                                            <Image
                                                src={post.image}
                                                alt={post.alt}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                                                <IoCalendarSharp className="inline-block mr-1" />
                                                {post.date}
                                            </p>
                                            <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-tight">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#ffffff] rounded-lg shadow-md p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <button
                                        key={index}
                                        className="px-3 py-2 bg-[#F3F4F6] text-gray-700 rounded-lg text-xs sm:text-sm hover:bg-[#e5e7eb] transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </motion.div>
    );
}
















