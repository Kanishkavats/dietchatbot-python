"use client";




import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import {
  FaRegCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaTumblr,

  FaRegCommentDots,
  FaUser,
  FaRegEnvelope,
} from "react-icons/fa";
import { Icon } from '@iconify/react'
import { comments, recentPosts, tags } from "@/src/staticResource";
import { ppOne, ppTwo } from '@/public/assets';
export default function BlogPage() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}

      className="bg-[#ffffff] font-sans text-[#667471];"
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
            <div className="flex items-center space-x-4 text-[#000000] mb-6">
              <span className="flex items-center gap-1">
                <IoCalendarSharp className="text-[#FFC107]" /> 02 Apr 2021
              </span>
              <span className="flex items-center gap-1">
                <IoLocationSharp className="text-[#FFC107]" /> 684 West College St. Sun City, USA
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#000000] mb-6 leading-tight font-nunito">
              Give African Childrens A Good Education
            </h1>
            <p className="text-[#667471]  mb-8 font-nunito">
              Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
            </p>
            <h2 className="text-3xl font-bold text-[#000000] mb-4 font-nunito">Summary</h2>
            <p className="text-[#667471] mb-8 font-nunito">
              Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#000000] font-bold mb-8">
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
            <div className="flex flex-col gap-6 items-center justify-between mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                {[
                  { icon: FaFacebookF, bg: "#4267B2", label: "Facebook" },
                  { icon: FaTwitter, bg: "#1DA1F2", label: "Twitter" },
                  { icon: FaPinterest, bg: "#E60023", label: "Pinterest" },
                  { icon: FaLinkedinIn, bg: "#0077B5", label: "LinkedIn" },
                  { icon: FaTumblr, bg: "#36465D", label: "Tumblr" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-full h-24 sm:h-32 flex flex-col justify-center items-center rounded-md shadow-md text-[#ffffff] hover:opacity-90 transition-all"
                    style={{ backgroundColor: s.bg }}
                  >
                    <s.icon className="text-2xl sm:text-3xl mb-2" />
                    <span className="text-sm sm:text-lg font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
              <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976378252907!3d40.69766374874312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716298418080!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
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
                    <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed text-[#FFC107]  p-1 bg-[#ffffff]">

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
                      <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                        {comment.content}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 font-bold text-xs sm:text-sm text-[#667471]">
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

            
            <div className="w-full max-w-[896px] mx-auto mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg lg:mt-20 lg:p-15 shadow-xl border border-[#edefe9]">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#122F2A] mb-8 lg:mb-12">
                Leave a Comment
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex items-center bg-[#F8F9FA] rounded-md px-6 py-4 border border-[#E9ECEF] lg:h-[96px] lg:px-5 lg:py-3">
                    <FaUser className="text-[#6B7280] mr-4" size={20} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent text-[#6B7280] placeholder-[#ADB5BD] focus:outline-none"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="flex items-center bg-[#F8F9FA] rounded-md px-6 py-4 border border-[#E9ECEF]">
                    
                    <FaRegEnvelope className="text-[#6B7280] mr-4" size={20} />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-transparent text-[#6B7280] placeholder-[#ADB5BD] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Comments Textarea */}
                <div className="flex items-start bg-[#F8F9FA] rounded-md px-6 py-4 border border-[#E9ECEF]">
                  
                  
                  <Icon
                    icon="fa6-solid:comments"
                    width={24}
                    height={24}
                    className="text-[#6B7280] hover:text-[#ffffff]"
                  />
                  <textarea
                    placeholder="Type Your Comments..."
                    className="w-full bg-transparent text-[#6B7280] placeholder-[#ADB5BD] focus:outline-none resize-none"
                    rows={6}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#122F2A] text-white text-[16px] font-semibold px-10 py-4 rounded-full hover:bg-[#0E2521] transition-colors duration-300"
                >
                  Submit Comment
                </button>
              </form>
            </div>


          </main>


          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-[#ffffff] p-4 sm:p-6 rounded-lg shadow-xl border border-[#edefe9]">
              <h3 className="text-lg sm:text-2xl font-bold text-[#000000] mb-4">Search Here</h3>
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
              <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-4">Recent Posts</h3>
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
                      <p className="text-xs sm:text-sm text-[#667471] mb-1">
                        <IoCalendarSharp className="inline-block mr-1" />
                        {post.date}
                      </p>
                      <h4 className="text-sm sm:text-base font-medium text-[#000000] leading-tight">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#ffffff] rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 bg-[#F3F4F6] text-[#000000] font-nunito rounded-lg text-xs sm:text-sm hover:bg-[#FFC107] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative w-full h-[300px] sm:h-[440px] p-6 sm:p-8 rounded-lg shadow-md overflow-hidden text-center text-[#ffffff] bg-cover bg-center bg-[url('/assets/charity_with_difference/overview.png')]">
              <div className="relative z-10 mt-6 sm:mt-10">
                <div className="flex justify-center mb-4">
                  <div className="w-[140px] h-[140px] sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/heartLogoIcon.png"
                      alt="Heart Logo"
                      className="w-[140px] h-[140px] sm:w-10 sm:h-10 object-contain"
                    />
                  </div>
                </div>
                <p className="font-nunito text-xs sm:text-sm font-bold mb-2 sm:mb-4">
                  Small Donations Bigger Impact
                </p>
                <h3 className="font-nunito text-lg sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight">
                  Education Health For Every Child
                </h3>
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FFC107] text-[#000000] font-semibold rounded-full hover:bg-[#046B59] hover:text-[#ffffff] transition-colors">
                  Get A Quote →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
































