import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaUser,
  FaShareAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Test = () => {
  return (
    <div className="bg-white py-12 px-5 flex justify-center">
      <div className="flex flex-wrap justify-between items-start max-w-[1200px] gap-12 w-full">
        
        <div className="flex-1 min-w-[300px]">
          <p className="inline-flex items-center justify-center gap-2 text-[#00715D] text-2xl font-caveat mb-2">
            <FaHandHoldingHeart className="text-[#00715D] text-lg" /> Get In Touch
          </p>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-[#667471] text-base font-nunito max-w-[700px] leading-relaxed mb-10">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque inventore.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-3">
              <FaMapMarkerAlt className="text-[#6b5103] text-xl mt-1" />
              <div>
                <h4 className="text-black text-lg font-bold mb-2">Location</h4>
                <p>55 main street, 2nd block,<br />Melbourne, Australia</p>
              </div>
            </div>

            
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-3">
              <FaPhoneAlt className="text-[#6b5103] text-xl mt-1" />
              <div>
                <h4 className="text-black text-lg font-bold mb-2">Phone</h4>
                <p>+1 (368) 567 89 54<br />+236 (456) 896 22</p>
              </div>
            </div>

           
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-3">
              <FaEnvelope className="text-[#6b5103] text-xl mt-1" />
              <div>
                <h4 className="text-black text-lg font-bold mb-2">Email</h4>
                <p>example@email.com<br />charifund@email.com</p>
              </div>
            </div>

            
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-3">
              <FaShareAlt className="text-[#6b5103] text-xl mt-1" />
              <div>
                <h4 className="text-black text-lg font-bold mb-2">Social</h4>
                <div className="flex gap-2 mt-1">
                  <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-[#7a6c2f] hover:text-white hover:border-[#7a6c2f] transition">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-[#7a6c2f] hover:text-white hover:border-[#7a6c2f] transition">
                    V
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-[#7a6c2f] hover:text-white hover:border-[#7a6c2f] transition">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-[#7a6c2f] hover:text-white hover:border-[#7a6c2f] transition">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>

            
            <div className="col-span-1 md:col-span-2 text-center mt-5 md:mt-0">
              <Image
                src="/contact.png"
                alt="Contact Illustration"
                width={516}
                height={260}
                className="inline-block max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        
        <div className="flex-1 min-w-[300px] bg-white p-10 rounded-xl border border-gray-200 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Fill Up The Form</h2>
          <p className="text-[#667471] text-base font-nunito mb-5">
            Your email address will not be published. Required fields are marked *
          </p>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row items-center bg-gray-200 p-3 rounded-lg">
              <input type="text" placeholder="Enter Name" className="flex-1 bg-transparent border-none outline-none p-2 text-sm" />
              <FaUser className="ml-2 text-gray-500" />
            </div>
            <div className="flex flex-col md:flex-row items-center bg-gray-200 p-3 rounded-lg">
              <input type="email" placeholder="Enter Email" className="flex-1 bg-transparent border-none outline-none p-2 text-sm" />
              <FiMail className="ml-2 text-gray-500" />
            </div>
            <div className="flex flex-col md:flex-row items-center bg-gray-200 p-3 rounded-lg">
              <input type="text" placeholder="Phone Number" className="flex-1 bg-transparent border-none outline-none p-2 text-sm" />
              <FaPhoneAlt className="ml-2 text-gray-500" />
            </div>
            <div className="flex flex-col md:flex-row items-start bg-gray-200 p-3 rounded-lg">
              <textarea placeholder="Your Message..." className="flex-1 bg-transparent border-none outline-none p-2 text-sm resize-none" />
              <FaEnvelope className="ml-2 text-gray-500 mt-2 md:mt-0" />
            </div>
            <button type="submit" className="px-9 py-4 bg-yellow-400 text-black font-bold rounded-full text-base hover:bg-black hover:text-white transition">
              Get A Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
