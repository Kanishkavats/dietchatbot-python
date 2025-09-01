import Image from 'next/image';

const comments = [
  {
    id: 1,
    name: "Martha Grey",
    image: "/assets/author-four.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In Imperdiet Assueverit Contentiones, An His Cib.",
    timeAgo: "2 Min Ago"
  },
  {
    id: 2,
    name: "Jackie Dawson",
    image: "/assets/one-author.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In Imperdiet Assueverit Contentiones, An His Cib.",
    timeAgo: "5 Min Ago"
  },
  {
    id: 3,
    name: "Hesia Lara",
    image: "/assets/author-two.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In Imperdiet Assueverit Contentiones, An His Cib.",
    timeAgo: "10 Min Ago"
  }
];

export default function Comments() {
  return (
    <div className="p-6 mt-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">03 Comments</h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400"></div>
                <div className="absolute inset-[10px] rounded-full overflow-hidden">
                  <Image
                    src={comment.image}
                    alt={`${comment.name} profile`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Comment Content */}
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">{comment.name}</h4>
              <p className="text-gray-600 max-w-md text-sm mb-3 leading-relaxed">
                {comment.comment}
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Like</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span>Reply</span>
                </button>
                
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{comment.timeAgo}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
