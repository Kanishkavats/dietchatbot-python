import React from 'react'
import { motion, Variants } from "framer-motion";
import { useFetchAllCampaigns } from '@/src/hooks/useCampaigns';
import { Campaign } from '@/src/types/campaign';

function RecentCampaign() {


  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
    }),
  };

  const { data } = useFetchAllCampaigns(1, 10);

  return (
    <div>
      <div className="bg-white  rounded-xl p-6  w-full overflow-x-auto">
        <h2 className="text-gray-700 font-semibold mb-4">Recent Campaigns</h2>
        <table className="w-full table-auto border-collapse rounded-2xl">
          <thead>
            <tr className="bg-primaryColor/20 rounded-2xl">
              <th className="p-3 border border-foreground/30   text-left">ID</th>
              <th className="p-3 border border-foreground/30  text-left">Title</th>
              <th className="p-3 border border-foreground/30  text-left">Funds Raised</th>
              <th className="p-3 border border-foreground/30  text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.campaigns?.map((item: Campaign, index: number) => (
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
                <td className="p-3 border border-foreground/30 ">{index + 1}</td>
                <td className="p-3 border border-foreground/30 ">{item.title}</td>
                <td className="p-3 border border-foreground/30 ">₹{item.raisedAmount.toLocaleString()}</td>
                <td className="p-3 border border-foreground/30 ">{item.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentCampaign
