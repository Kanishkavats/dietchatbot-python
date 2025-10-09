"use client";

import React from "react";
import { motion } from "framer-motion";
import Logout from "./Common/Logout";


const Breadcrumb = ({ lable }:{lable:string}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-gray-600 font-semibold text-2xl cursor-pointer"
      >
        {lable}
      </motion.div>
      <Logout />
    </div>
  );
};

export default Breadcrumb;
