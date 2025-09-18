"use client";
import { motion } from "framer-motion";
import { FaTags,  FaRegUserCircle } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

// const cardVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
// };

interface Props {
  images: string[];
  category?: string;
  commentCount?:number;
  creator?:string;
  title?: string;
}
interface cardProps{
  card?:Props;
}
const cardVariants = {
initial: { y: 50, opacity: 0 }, 
 animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as any } },
  hover: {
    scale: 1, // Add any parent-level hover effects here
   transition: {
      staggerChildren: 0.1, // Stagger animations for child elements
    },
  },
 };
const NewsCard = ({card}: cardProps) => (
  <motion.div
    className="bg-white hover:bg-[#046b59] h-[500px] rounded-2xl shadow-lg text-black hover:text-white overflow-hidden group relative p-5 flex flex-col "
    // variants={cardVariants}
    // initial="hidden"
    // animate="visible"
    initial={{ y: 50, opacity: 0 }}
    animate={{
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    }}
    whileHover="hover"
  >
    {/* Image */}
    <div className="relative mb-4 rounded-xl overflow-hidden w-full h-72">
      <motion.img
        src={card?.images[0]}
        alt={card?.images[0] ||card?.title} 
        className="absolute top-0 left-0 w-full h-full object-cover"
        whileHover={{ scale: 1.2, rotate: 8 }}
        transition={{ duration: 0.6 }}
        whileInView={{ scale: 1, rotate: 0 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <span className="absolute top-3 left-3 bg-[#122f2a] text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
        <FaTags /> {card?.category}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center gap-6 text-sm mb-3 font-bold  ">
        <span className="flex items-center gap-2">
          <FaRegUserCircle className="text-[#FFC107] text-lg" /> {card?.creator}
        </span>
        <span className="flex items-center gap-2">
          <Icon icon="fa6-solid:comments" width={20} className="text-[#FFC107]" />
          {card?.commentCount}
        </span>
      </div>
      <h3 className="text-lg font-bold leading-snug mb-3 hover:text-white">{card?.title}</h3>
    </div>

    {/* Read More + Heart */}
    <div className="flex items-center gap-2 relative">
      <Link href="" className="text-sm font-bold underline flex items-center gap-2">
        Read More
        
        <FaCircleArrowRight className="text-lg text-[#046B59] hover:text-[#FFC107]" />
      </Link>
      <motion.div
        className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/heart.png" alt="heart" className="w-16 h-16 opacity-90" />
      </motion.div>
    </div>
  </motion.div>
);

export default NewsCard;
