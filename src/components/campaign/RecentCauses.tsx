"use client";

import { FaRegCalendarAlt } from "react-icons/fa";

const RecentCauses = ({ causes }: { causes: any[] }) => {
  if (!causes || causes.length === 0) return null;

  return (
    <div className="bg-[#ffffff] p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold font-nunito text-[#000000] mb-6">Recent Causes</h3>
      <ul className="space-y-6">
        {causes.map((cause) => (
          <li key={cause.id} className="flex items-start space-x-3">
            
            <img
              src={cause.images?.[0] || "/default-image.jpg"} 
              alt={cause.title}
              className="w-16 h-16 rounded-md object-cover"
            />

            {/* Content */}
            <div>
              <p className="flex items-center font-nunito text-sm text-[#667471]">
                <FaRegCalendarAlt className="mr-2" />
                
                {cause.createdAt
                  ? new Date(cause.createdAt).toLocaleDateString()
                  : "No date"}
              </p>
              <h4 className="font-bold font-nunito text-[#000000] hover:text-[#046b59] transition">
                {cause.title}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCauses;

