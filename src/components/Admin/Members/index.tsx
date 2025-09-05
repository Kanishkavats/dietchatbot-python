"use client";
import React from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
}

const Members = () => {
  const members: Member[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Donor", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Volunteer", status: "Pending" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Admin", status: "Active" },
    { id: 4, name: "Emily Johnson", email: "emily@example.com", role: "Donor", status: "Inactive" },
    { id: 5, name: "David Wilson", email: "david@example.com", role: "Volunteer", status: "Active" },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
    }),
  };

  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="p-5 w-full">
      <Breadcrumb lable="Members" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -3 }}
            className="bg-white shadow-lg rounded-xl p-6 cursor-pointer flex flex-col items-center text-center"
          >
            <div className="text-gray-400">
              <FaUserCircle size={60} />
            </div>
            <h3 className="font-semibold text-lg mt-3">{member.name}</h3>
            <p className="text-gray-500 text-sm">{member.role}</p>
            <p className="text-gray-400 text-sm">{member.email}</p>
            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${statusColors[member.status]}`}
            >
              {member.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Members;
