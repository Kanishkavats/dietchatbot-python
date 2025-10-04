"use client";
import { motion, useAnimation } from "framer-motion";
import { FaTags, FaRegUserCircle } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id:string;
  images: string[];
  category?: string;
  commentCount?: number;
  creator?: string;
  title?: string;
}
interface cardProps {
  card?: Props;
}
  
const heartVariants = {
  idle: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeOut" as const } 
    },
    hover: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.3, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
};
const NewsCard = ({ card }: cardProps) => {
  const heartControls = useAnimation();
  const router=useRouter();
  return(
  <motion.div
    className="bg-white cursor-pointer hover:bg-green rounded-2xl h-full shadow-xl text-black hover:text-white overflow-hidden group relative transition-colors duration-500 p-5 flex flex-col"
    initial={{ y: 50, opacity: 0 }}
    animate={{
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    }}
    onHoverStart={() => heartControls.start("hover")}
      onHoverEnd={() => heartControls.start("idle")}
    whileHover="hover"
    onClick={()=>router.push(`/news-grid/${card?.id}`)}
  >
    {/* Image */}
    <div className="relative mb-4 rounded-xl overflow-hidden w-full h-[230px] md:h-[400px] lg:h-[250px] xl:h-[260px] ">
      <motion.img
        src={card?.images[0]}
        alt={card?.title || "news-card"}
        className="absolute top-0 left-0 w-full h-full object-cover"
        variants={{
          hover: { scale: 1.2, rotate: 6 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <span className="absolute top-3 left-3 bg-dark-green hover:bg-yellow hover:text-black text-white text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2">
        <FaTags /> {card?.category}
      </span>
    </div>

    {/* Content */}
    <div className=" flex-1 mt-3 ">
      <div className="flex flex-wrap sm:flex-nowrap md:whitespace-nowrap items-center gap-3 xl:gap-2 md:gap-4 lg:gap-2  text-[14px] xl:text-[16px] mb-3 font-medium text-gray-600 group-hover:text-white">
        <span className="flex items-center justify-center gap-2  ">
          <FaRegUserCircle className="text-yellow  " size={15} /> {card?.creator}
        </span>
        <span className="flex items-center gap-2 ml-0">
          <Icon
            icon="fa6-solid:comments"
            width={17}
            className="text-yellow"
          />
          <span className=" ">comments ({card?.commentCount})</span>
          
        </span>
      </div>
      <h3 className="text-lg lg:text-lg xl:text-xl font-bold text-dark-green font-nunito  group-hover:text-white leading-snug xl:mb-4  hover:text-white">
        {card?.title}
      </h3>
    </div>

    {/* Read More + Heart */}
    <div className="flex items-center mb-3 lg:mb-6  p-2 gap-2 relative">
      <Link
        href={`/news-details/${card?.id}`}
        className="text-sm md:text-sm xl:text-lg font-semibold underline text-gray-900 group-hover:text-white flex items-center gap-2"
      >
        Read More
        <FaCircleArrowRight className="text-lg text-green group-hover:text-yellow" />
      </Link>

      <motion.div
          className="sm:static sm:translate-y-0 sm:ml-auto top-0 right-0 relative pointer-events-none z-20"
          variants={heartVariants}
          initial="idle"
          animate={heartControls}
        >
          <img src="/heart.png" alt="heart" className="w-17 h-10" />
        </motion.div>
    </div>
  </motion.div>
  )
};

export default NewsCard;

