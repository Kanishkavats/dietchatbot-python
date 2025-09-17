"use client";





import { FaRegCalendarAlt } from "react-icons/fa";
import { recentPosts } from "@/src/staticResource"; // ✅ src ka alias use kiya

const RecentPosts = () => (
  <div className="bg-[#EBEBEB] p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold text-black mb-6">Recent Posts</h3>
    <ul className="space-y-6">
      {recentPosts.map((post) => (
        <li key={post.id} className="flex items-start space-x-3">
          <img
            src={post.image}   // ✅ correct property
            alt={post.alt}     // ✅ alt bhi aa gaya staticResource se
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <p className="flex items-center text-sm text-[#667471]">
              <FaRegCalendarAlt className="mr-2" /> {post.date}
            </p>
            <h4 className="font-semibold text-black">{post.title}</h4>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentPosts;

