"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Cause } from "@/src/types/donateUs";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";


const CauseCard = ({ cause,route }: { cause: Cause,route?:string }) => {
const router=useRouter();
  const formattedDate = cause?.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(cause.createdAt))
    : "";
  return(
  <motion.div
    transition={{ duration: 0.3 }}
    onClick={()=>router.push(`/${route}/${cause.id}`)}
    className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-4  cursor-pointer items-center gap-4  xl:gap-5 mb-4"
  >
    <div className="w-20 h-20 col-span-1 relative rounded-lg overflow-hidden">
      <Image src={cause?.images?.[0]||''} alt={cause.title} fill className="object-cover w-full h-full" />
    </div>
    <div className="col-span-2 md:col-span-6 lg:col-span-8 xl:col-span-3">
      <div className="flex items-center  text-gray-500 text-sm gap-1">
        <FaCalendarAlt   className="mr-2" />
        <span>{formattedDate}</span>
      </div>
      <h4 className="font-semibold font-nunito text-[19px] pt-3 text-dark-green hover:text-green">
        {cause.title}
      </h4>
    </div>
  </motion.div>
);
};

export default CauseCard;
