"use client";

import React from "react";
import { motion } from "framer-motion";


const Breadcrumb = ({ lable }:{lable:string}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-gray-600 font-semibold text-2xl cursor-pointer"
    >
      {lable}
    </motion.div>
  );
};

export default Breadcrumb;
