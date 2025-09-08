"use client";
import React from "react";
import Breadcrumb from "../Breadcrumb";
import { motion, Variants } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { FaMoneyBillWave, FaUsers, FaClipboardList, FaRegBell } from "react-icons/fa";

const Dashboard = () => {
  const barData = [
    { name: "Jan", funds: 4000 },
    { name: "Feb", funds: 3000 },
    { name: "Mar", funds: 5000 },
    { name: "Apr", funds: 4000 },
    { name: "May", funds: 6000 },
    { name: "Jun", funds: 7000 },
  ];

  const pieData = [
    { name: "Charity A", value: 12000 },
    { name: "Charity B", value: 8000 },
    { name: "Charity C", value: 15000 },
    { name: "Charity D", value: 5000 },
    { name: "Charity E", value: 10000 },
    { name: "Charity F", value: 7000 },
  ];

  const tableData = [
    { id: 1, name: "Charity A", raised: 12000, status: "Active" },
    { id: 2, name: "Charity B", raised: 8000, status: "Pending" },
    { id: 3, name: "Charity C", raised: 15000, status: "Active" },
    { id: 4, name: "Charity D", raised: 5000, status: "Inactive" },
    { id: 5, name: "Charity E", raised: 10000, status: "Active" },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 80 },
    }),
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
    }),
  };

  const chartVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const cards = [
    { title: "Total Funds", value: "₹45,000", icon: <FaMoneyBillWave size={24} />, color: "from-yellow-400 to-yellow-600" },
    { title: "Active Campaigns", value: "8", icon: <FaClipboardList size={24} />, color: "from-green-400 to-green-600" },
    { title: "Members", value: "125", icon: <FaUsers size={24} />, color: "from-yellow-300 to-yellow-500" },
    { title: "Pending Requests", value: "3", icon: <FaRegBell size={24} />, color: "from-green-300 to-green-500" },
  ];

  return (
    <div className="p-5 w-full">
      <Breadcrumb lable="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gradient-to-r ${card.color} text-white rounded-xl shadow-lg p-6 flex items-center gap-4 cursor-pointer`}
          >
            <div className="p-3 bg-white bg-opacity-20 rounded-full">{card.icon}</div>
            <div>
              <h3 className="text-sm">{card.title}</h3>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-xl rounded-xl p-6 mt-8 w-full flex flex-col lg:flex-row gap-6"
      >
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
          <h2 className="text-gray-700 font-semibold mb-4">Campaign Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                startAngle={90}
                endAngle={450}
                label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={index % 2 === 0 ? "#FACC15" : "#22C55E"} // yellow & green
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="text-gray-700 font-semibold mb-4">Funds Raised (Monthly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} barCategoryGap="50%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(79, 70, 229, 0.05)" }} formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="funds" radius={[8, 8, 0, 0]} barSize={20}>
                {barData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill="#FACC15" // primary yellow
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#FFD700")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FACC15")}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="bg-white shadow-xl rounded-xl p-6 mt-8 w-full overflow-x-auto">
        <h2 className="text-gray-700 font-semibold mb-4">Recent Campaigns</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-primaryColor/20">
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Funds Raised</th>
              <th className="p-3 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <motion.tr
                key={item.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(250,204,21,0.08)" }}
                transition={{ type: "spring", stiffness: 80 }}
                className="cursor-pointer"
              >
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">₹{item.raised.toLocaleString()}</td>
                <td className="p-3 border">{item.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
