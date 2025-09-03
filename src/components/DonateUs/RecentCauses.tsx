"use client";
import { causes } from "@/src/staticResource";
import CauseCard from "./CauseCard";
import { motion } from "framer-motion";
import FadeInUp from "@/src/animations/FadeInUp";

const RecentCauses = () => (
  <FadeInUp
    className="bg-white p-6 rounded-2xl shadow-md">
    <h3 className="font-bold text-xl mb-6">Recent Causes</h3>
    {causes.map((cause) => (
      <CauseCard key={cause.id} cause={cause} />
    ))}
  </FadeInUp>
);

export default RecentCauses;
