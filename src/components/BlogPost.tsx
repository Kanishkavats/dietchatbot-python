import Image from 'next/image';
import Comments from './Comments';
import LeaveComment from './LeaveComment';

export default function BlogPost() {
  return (
    <div className="">
      {/* Featured Image */}
      <div className="relative rounded-lg overflow-hidden h-96 w-full">
        <Image
          src="/assets/poster 2.png"
          alt="African children running outdoors"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>02 Apr 2021</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>684 West College St. Sun City, USA</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Give African Childrens A Good Education
        </h1>
        
        {/* Body Text */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social.
        </p>
        
        {/* Summary Section */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social.
          </p>
          
          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Empower Through Charity</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Healing Communities</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Compassion In Action</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Giving Hope, Changing Lives</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Together We Can</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-bold ">Every Act Counts</span>
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 w-full">
              <Image
                src="/assets/pp-one.png"
                alt="Young child smiling"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative h-48 w-full">
              <Image
                src="/assets/pp-two.png"
                alt="Group of children laughing"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <Comments />
      
      {/* Leave Comment Section */}
      <LeaveComment />
    </div>
  );
}