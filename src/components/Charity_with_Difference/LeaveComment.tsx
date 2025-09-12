import {
    
    FaComment,
    FaUser,
    FaEnvelope,
} from "react-icons/fa";
export default function LeaveComment() {
  return (
    
    <div className="w-full mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg lg:w-[896px] lg:h-[595px] lg:mt-20 lg:px-5 lg:py-15">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">Leave A Comment</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[316px] lg:h-[96px] lg:px-5 lg:py-3">
            <FaUser size={18} />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[316px] lg:h-[96px] lg:px-5 lg:py-3">
            <FaEnvelope className="text-xl mt-1" />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>
        </div>

        <div className="flex items-start bg-[#F2F2F2] rounded-md px-4 py-2 h-auto w-full lg:w-[656px] lg:h-[184px] lg:px-5 lg:py-3">
          <FaComment size={18} />
          <textarea
            placeholder="Type Your Comments..."
            className="w-full bg-transparent focus:outline-none resize-none ml-2"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#122F2A] text-white text-[16px] px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}
