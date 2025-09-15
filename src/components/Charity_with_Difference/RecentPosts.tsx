import Image from 'next/image';
import { recentPosts } from '../../staticResource';
import { IoCalendarSharp } from "react-icons/io5";

export default function RecentPosts() {
  return (
    
    <div className="bg-[#ffffff] rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-3">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              
              <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                <IoCalendarSharp className="inline-block mr-1" />
                {post.date}
              </p>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                {post.title}
              </h4>
            </div>
        </div>
        ))}
      </div>
    </div>


  );
}