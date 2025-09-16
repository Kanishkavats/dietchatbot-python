import Image from 'next/image';
import Comments from './Comments';
import LeaveComment from './LeaveComment';
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import {
  FaRegCheckCircle,

} from "react-icons/fa";
import { ppOne, ppTwo } from '@/public/assets';

export default function BlogPost() {

  return (
    <div className="">
      {/* Featured Image */}
      <div className="relative rounded-lg overflow-hidden h-96 w-full">
        <Image
          src="/assets/charity_with_difference/poster 2.png"
          alt="African children running outdoors"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center space-x-4 text-black mb-6">
          <span className="flex items-center gap-1">
            <IoCalendarSharp className="text-[#FFC107]" /> 02 Apr 2021
          </span>
          <span className="flex items-center gap-1">
            <IoLocationSharp className="text-[#FFC107]" /> 684 West College St. Sun City, USA
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight font-nunito">
          Give African Childrens A Good Education
        </h1>
        <p className="text-gray-600 mb-8 font-nunito">
          Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
        </p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-nunito">Summary</h2>
        <p className="text-gray-600 mb-8 font-nunito">
          Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social
        </p>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black font-bold mb-8">
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Empower Through Charity
          </div>
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Giving Hope, Changing Lives
          </div>
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Healing Communities
          </div>
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Together We Can
          </div>
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Compassion In Action
          </div>
          <div className="flex items-center gap-2 font-nunito">
            <FaRegCheckCircle className="text-[#046B59] text-xl" /> Every Act Counts
          </div>
        </div>



        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={ppOne}
              alt="Young child smiling"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={ppTwo}
              alt="Group of children laughing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    

      {/* Comments Section */ }
      <Comments />

      {/* Leave Comment Section */ }
      <LeaveComment />
    </div >
  );
}
