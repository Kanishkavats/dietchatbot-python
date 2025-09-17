"use client";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { authorInfo } from "@/src/staticResource";

const AuthorCard = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md text-center">
    <img src={authorInfo.img} alt={authorInfo.name} className="rounded-full mx-auto mt-6 w-32 h-32 object-cover" />
    <h3 className="text-xl font-bold text-black mt-4">{authorInfo.name}</h3>
    <p className="text-sm text-[#667471]">{authorInfo.role}</p>
    <p className="text-sm text-[#667471] mt-4 px-4">{authorInfo.bio}</p>
    <div className="flex justify-center space-x-4 mt-12">
      <a href={authorInfo.socials[0].url} target="_blank" className="p-3 border rounded-lg"><FaFacebookF /></a>
      <a href={authorInfo.socials[1].url} target="_blank" className="p-3 border rounded-lg"><FaVimeoV /></a>
      <a href={authorInfo.socials[2].url} target="_blank" className="p-3 border rounded-lg"><FaTwitter /></a>
      <a href={authorInfo.socials[3].url} target="_blank" className="p-3 border rounded-lg"><FaLinkedinIn /></a>
    </div>
  </div>
);

export default AuthorCard;
