import Image from 'next/image';
import { charityRecentPosts } from '../../staticResource';

export default function RecentPosts() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {charityRecentPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-3">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 mb-1">{post.date}</p>
              <h4 className="text-sm font-medium text-gray-900 leading-tight">
                {post.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}