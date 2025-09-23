import Image from 'next/image';
import { phOne, phTwo, phTree } from '@/public/assets';
import { FaCalendarAlt } from 'react-icons/fa';

const recentPosts = [
  {
    id: 1,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phOne,
    alt: "Family with woman holding child"
  },
  {
    id: 2,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phTwo,
    alt: "Group of hands stacked together"
  },
  {
    id: 3,
    title: "Structures That Stand, Dreams That Soar",
    date: "November 22, 2024",
    image: phTree,
    alt: "Two young children looking at camera"
  }
];

export default function RecentPosts() {
  return (
    <div className="bg-[rgb(235,235,235)] rounded-2xl mb-5 p-4 sm:p-5 lg:p-8 xl:p-10">
      <h3 className="text-lg sm:text-xl lg:text-xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Recent Posts</h3>
      <div className="space-y-3 sm:space-y-4 p-2 mt-4 sm:mt-5 lg:mt-6 xl:mt-8">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex flex-col sm:flex-row items-start gap-3">
            <div className="relative cursor-pointer w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 flex items-center justify-start gap-2"><FaCalendarAlt  />{post.date}</span>
              <h4 className="text-sm sm:text-sm xl:text-lg md:mt-0 font-medium hover:text-green cursor-pointer text-gray-900 leading-tight">
                {post.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}