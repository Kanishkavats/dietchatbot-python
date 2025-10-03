"use client";
import { causes } from "@/src/staticResource";
import CauseCard from "./CauseCard"; 
import { motion } from "framer-motion";
import FadeInUp from "@/src/animations/FadeInUp";

const Recent = ({ causes,name,bgColor,route }: { causes: any,name?:string,bgColor?:string,route?:string; }) => {
  if (!causes || causes.length === 0) return null;
 return( 
  <FadeInUp
    className={`${bgColor} p-6 rounded-2xl shadow-md`}>
    <h3 className="font-extrabold text-dark-green font-nunito text-2xl mb-6">{name}</h3>
    {(causes?.campaigns||[]).map((cause:any) => (
      <CauseCard key={cause.id} route={route} cause={cause} />
    ))}
  </FadeInUp>
 );
};

export default Recent;
