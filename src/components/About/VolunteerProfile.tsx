"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../common/Buttons/Button";
import { CircleCheckBig, Link } from "lucide-react";


const VolunteerProfile = ({ member }) => {
  const router = useRouter();
  return (
    <section className="w-full flex justify-center items-center py-12 px-4 md:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center place-items-center font-nunito">
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={member.img}
                alt="Volunteer"
                width={450}
                height={450}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 font-nunito">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">{member.role}</p>

            <div className="flex justify-center md:justify-start gap-3 mb-6">
              <motion.a
                href="#"
                className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              >
                <FaFacebookF size={20} />
              </motion.a>

              <motion.a
                href="#"
                className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              >
                <FaTwitter size={20} />
              </motion.a>

              <motion.a
                href="#"
                className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              >
                <FaInstagram size={20} />
              </motion.a>

              <motion.a
                href="#"
                className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              >
                <FaLinkedinIn size={20} />
              </motion.a>
            </div>

            <p className="text-gray-600 mb-6 text-sm font-nunito ">
              Lorem ipsum dolor sit amet, con adipiscing elit. Etiam convallis
              elit id imperdiet. Quisq commodo simply free ornare tortor.
            </p>

            <h3 className="font-bold text-xl mb-6">
              I Help My Clients Stand Out And They Help Me Grow.
            </h3>

            <div className="mb-3">
              <div className="flex justify-between text-sm  text-black-700 font-bold ">
                <span>Donation Collect</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-[#046b59] h-2 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm  text-black-700 font-bold">
                <span>Successful Events</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-[#046b59] h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-black-700">
              <p className="flex items-center gap-2 font-bold">
                <CircleCheckBig className="text-[#046b59]" /> Best Quality
                Services
              </p>
              <p className="flex items-center gap-2 font-bold">
                <CircleCheckBig className="text-[#046b59]" /> Time Saving
              </p>
              <p className="flex items-center gap-2 font-bold">
                <CircleCheckBig className="text-[#046b59]" /> Meet The Deadlines
              </p>
              <p className="flex items-center gap-2 font-bold">
                <CircleCheckBig className="text-[#046b59]" /> 24/7 Customer
                Support
              </p>
            </div>
            {/* <div className="w-58 round-full">
              <Button
                text="Donate With Me"
                bgColor="bg-[#FFC107]"
                textColor="text-black"
                hoverTextColor="group-hover:text-white"
                hoverBg="before:bg-[#046b59]"
                onClick={() => router.push("/donate-us")}
              />
            </div> */}
            <div className="w-58 round full">
              <Button
                text="Donate With Me"
                bgColor="bg-[#FFC107]"
                textColor="text-black"
                hoverTextColor="group-hover:text-white"
                hoverBg="before:bg-[#046b59]"
                onClick={() => router.push("/donate-us")}
               
              />
            </div>
           




          </div>
        </div>

        <div className="mt-10 text-center md:text-left font-nunito">
          <h3 className="text-3xl font-extrabold mb-3 font-nunito">About Me</h3>
          <p className="text-[#747474] font-nunito text-lg leading-relaxed">
            This category focuses on the design construction of buildings and
            the This a category focuses on the design and construction of
            buildings This category a focuses on the design construction of
            buildings and the This a category of thfocuses on the design This
            category focuses on the design construction of buildings and the
            This a category focuses on the design and construction of buildings
            This category a focuses on the design construction of buildings and
            the This a category of thfocuses on the design
          </p>
        </div>
      </div>
    </section>
  );
};

export default VolunteerProfile;
