"use client";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { authorInfo } from "@/src/staticResource";

const AuthorCard = () => (
  <div className="bg-light-gray mb-8 p-10 h-auto  rounded-2xl  flex flex-col items-center text-center">
      <div className="flex flex-col w-full xl:w-full ">
         <img src={authorInfo.img} alt={authorInfo.name} className="rounded-full mx-auto mt-13 md:mt-10 w-18 h-18 xl:w-30 xl:h-30 object-cover" />
    <h3 className="text-lg xl:text-2xl font-semibold text-black mt-9">{authorInfo.name}</h3>
    <p className="text-sm xl:text-lg mt-2 text-gray-green">{authorInfo.role}</p>
    <p className="text-xs xl:text-lg  tracking-wide leading-relaxed text-gray-green mt-5 px-5">{authorInfo.bio}</p>
    <div className="flex justify-center pt-8 space-x-4 mt-auto ">
      <a href={authorInfo.socials[0].url} target="_blank" className="p-4  lg:p-2 border group border-gray-green hover:bg-black hover:text-yellow "><FaFacebookF className="text-gray-green group-hover:text-yellow" size={18} /></a>
      <a href={authorInfo.socials[1].url} target="_blank" className="p-4 lg:p-2 border group border-gray-green hover:bg-black hover:text-yellow "><FaVimeoV className="text-gray-green group-hover:text-yellow" size={18} /></a>
      <a href={authorInfo.socials[2].url} target="_blank" className="p-4 lg:p-2 border group border-gray-green hover:bg-black hover:text-yellow "><FaTwitter className="text-gray-green group-hover:text-yellow" size={18}/></a>
      <a href={authorInfo.socials[3].url} target="_blank" className="p-4 lg:p-2 border group border-gray-green hover:bg-black hover:text-yellow "><FaLinkedinIn className="text-gray-green group-hover:text-yellow" size={18}/></a>
    </div>
      </div>
  </div>
);

export default AuthorCard;