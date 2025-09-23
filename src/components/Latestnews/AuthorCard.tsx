"use client";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { authorInfo } from "@/src/staticResource";

const AuthorCard = () => (
  <div className="bg-[#EBEBEB] mb-8 p-10 h-[560px]  rounded-2xl  flex flex-col items-center text-center">
      <div className="flex flex-col w-full md:w-2/3 xl:w-full ">
         <img src={authorInfo.img} alt={authorInfo.name} className="rounded-full mx-auto mt-13 md:mt-10 w-30 h-30 object-cover" />
    <h3 className="text-2xl font-semibold text-black mt-9">{authorInfo.name}</h3>
    <p className="text-sm md:text-lg mt-2 text-gray-green">{authorInfo.role}</p>
    <p className="text-sm md:text-lg  tracking-wide leading-relaxed text-gray-green mt-5 px-5">{authorInfo.bio}</p>
    <div className="flex justify-center space-x-4 p-10 mt-auto mb-10 ">
      <a href={authorInfo.socials[0].url} target="_blank" className="p-4  border group border-gray-green hover:bg-black hover:text-yellow "><FaFacebookF className="text-gray-green group-hover:text-yellow" size={18} /></a>
      <a href={authorInfo.socials[1].url} target="_blank" className="p-4 border group border-gray-green hover:bg-black hover:text-yellow "><FaVimeoV className="text-gray-green group-hover:text-yellow" size={18} /></a>
      <a href={authorInfo.socials[2].url} target="_blank" className="p-4 border group border-gray-green hover:bg-black hover:text-yellow "><FaTwitter className="text-gray-green group-hover:text-yellow" size={18}/></a>
      <a href={authorInfo.socials[3].url} target="_blank" className="p-4 border group border-gray-green hover:bg-black hover:text-yellow "><FaLinkedinIn className="text-gray-green group-hover:text-yellow" size={18}/></a>
    </div>
      </div>
  </div>
);

export default AuthorCard;