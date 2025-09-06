
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import {
  FaCheckCircle,
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

export default function BlogPage() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-50 font-sans text-gray-800"
    >
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <main className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
            
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src="/assets/poster 2.png"
                alt="Smiling African children running"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="flex items-center space-x-4 text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <IoCalendarSharp className="text-yellow-500" /> 02 Apr 2021
              </span>
              <span className="flex items-center gap-1">
                <IoLocationSharp className="text-yellow-500" /> 684 West College
                St. Sun City, USA
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Give African Childrens A Good Education
            </h1>

            <p className="text-gray-600 mb-8">
              Charity And Donation Is A Categorys That Involves Giving Financial
              Category That Involves Giving Financial Or Material Support Various
              Causes Organizations. It Allows Individuals Towards The A
              Addressing Social Category That Involves Giving Financial Or
              Material Support Various Causes Of Organizations. It Allows
              Individuals Towards Addressing Social
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-600 mb-8">
              Charity And Donation Is A Categorys That Involves Giving Financial
              Category That Involves Giving Financial Or Material Support Various
              Causes Organizations. It Allows Individuals Towards The A
              Addressing Social Category That Involves Giving Financial Or
              Material Support Various Causes Of Organizations. It Allows
              Individuals Towards Addressing Social
            </p>

            {/* === Bullet Points === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-8">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-700 text-xl" /> Empower
                Through Charity
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-700 text-xl" /> Giving Hope,
                Changing Lives
              </div>
              <div className="flex items-center gap-2">
                {" "}
                <FaCheckCircle className="text-green-700 text-xl" />
                Healing Communities
              </div>
              <div className="flex items-center gap-2">
                {" "}
                <FaCheckCircle className="text-green-700 text-xl" />
                Together We Can
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-700 text-xl" /> Compassion In
                Action
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-700 text-xl" /> Every Act
                Counts
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/pp-one.png"
                  alt="Young child smiling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/pp-two.png"
                  alt="Group of children laughing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            
            <div className="flex flex-col gap-6 items-center justify-between mb-8">
              <div className="flex gap-4 justify-center items-center">
                <a
                  href="#"
                  className="w-40 h-32 flex flex-col justify-center items-center rounded-md shadow-md bg-[#4267B2] text-white hover:opacity-90 transition-all"
                >
                  <FaFacebookF className="text-3xl mb-2" />
                  <span className="text-lg font-medium">Facebook</span>
                </a>

                <a
                  href="#"
                  className="w-40 h-32 flex flex-col justify-center items-center rounded-md shadow-md bg-[#1DA1F2] text-white hover:opacity-90 transition-all"
                >
                  <FaTwitter className="text-3xl mb-2" />
                  <span className="text-lg font-medium">Twitter</span>
                </a>

                <a
                  href="#"
                  className="w-40 h-32 flex flex-col justify-center items-center rounded-md shadow-md bg-[#E60023] text-white hover:opacity-90 transition-all"
                >
                  <FaPinterest className="text-3xl mb-2" />
                  <span className="text-lg font-medium">Pinterest</span>
                </a>

                <a
                  href="#"
                  className="w-40 h-32 flex flex-col justify-center items-center rounded-md shadow-md bg-[#0077B5] text-white hover:opacity-90 transition-all"
                >
                  <FaLinkedinIn className="text-3xl mb-2" />
                  <span className="text-lg font-medium">LinkedIn</span>
                </a>

                <a
                  href="#"
                  className="w-40 h-32 flex flex-col justify-center items-center rounded-md shadow-md bg-[#36465D] text-white hover:opacity-90 transition-all"
                >
                  <FaTumblr className="text-3xl mb-2" />
                  <span className="text-lg font-medium">Tumblr</span>
                </a>
              </div>

              <div className="relative w-full h-[200px] md:w-1/2 rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976378252907!3d40.69766374874312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716298418080!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing location"
                ></iframe>
              </div>
            </div>

            
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {comments.length.toString().padStart(2, "0")} Comments
              </h2>

              <div className="space-y-10 mb-8">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-6">
                    <div className="w-[98.4px] h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-yellow-300">
                      <Image
                        src={comment.avatar}
                        alt={comment.name}
                        width={98.4}
                        height={98.4}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h5 className="w-[540px] h-[30px] text-[20px] font-bold font-['Nunito_Sans'] mb-[-8px]">
                        {comment.name}
                      </h5>
                      <p className="w-[540px] h-[60px] text-[#667471] text-[16px] font-['Nunito_Sans'] leading-snug">
                        {comment.content}
                      </p>
                      <div className="w-[540px] h-[30px] mt-[15px] flex items-center gap-6 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <i className="far fa-thumbs-up"></i> Like
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <i className="far fa-reply"></i> Reply
                        </button>
                        <span className="text-gray-600">{comment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="p-6 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-6">
                Leave A Comment
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center bg-[#F2F2F2] rounded-md px-5 py-3 w-[316px] h-[96px]">
                    <FaUser size={18} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center bg-[#F2F2F2] rounded-md px-5 py-3 w-[316px] h-[96px]">
                    <FaEnvelope className=" text-xl mt-1" />
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-start bg-[#F2F2F2] rounded-md px-5 py-3 w-[656px] h-[184px]">
                  <FaComment size={18} />
                  <textarea
                    placeholder="Type Your Comments..."
                    rows={5}
                    className="w-full bg-transparent focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-[189.34px] h-[50px] bg-[#122F2A] text-white font-[Nunito] text-[16px] px-[30px] py-[13px] rounded-md hover:opacity-90 transition"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </main>

          
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Search Here
              </h3>
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">
                        <IoCalendarSharp className="inline-block mr-1" />
                        {post.date}
                      </p>
                      <h4 className="text-sm font-medium text-gray-900 leading-tight">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full p-8 rounded-lg shadow-md overflow-hidden text-center text-white bg-cover bg-center bg-[url('/assets/overview.png')]">
              <div className="absolute inset-0"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/logo heart bottom banner.png"
                      alt="Heart Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>

                <p className="text-sm font-light mb-2">
                  Small Donations Bigger Impact
                </p>
                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  Education Health For Every Child
                </h3>
                <button className="px-6 py-3 bg-yellow-500 text-black-800 font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                  Get A Quote &rarr;
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
