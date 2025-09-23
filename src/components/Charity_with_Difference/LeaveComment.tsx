// "use client";

// import { useState } from "react";
// import { useCreateComment } from "@/src/hooks/useComments";
// import { useQueryClient } from "@tanstack/react-query";
// import Button from "../common/Buttons/Button";
// import { FaUser, FaRegEnvelope, FaRegComments } from "react-icons/fa";
// import toast from "react-hot-toast";

// interface LeaveCommentProps {
//   blogId: string;
// }

// export default function LeaveComment({ blogId }: LeaveCommentProps) {
//   const [author, setAuthor] = useState("");
//   const [email, setEmail] = useState("");
//   const [content, setContent] = useState("");

//   const queryClient = useQueryClient();
//   const mutation = useCreateComment();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!author || !email || !content) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     mutation.mutate(
//       { id: blogId, data: { author, email, comment: content } }, // old useComments.ts ke hisaab se
//       {
//         onSuccess: () => {
//           // Invalidate query to refresh comments
//           queryClient.invalidateQueries({ queryKey: ["comments"] });
//           toast.success("Comment added successfully");

//           // Reset form
//           setAuthor("");
//           setEmail("");
//           setContent("");
//         },
//         onError: (err: any) => {
//           toast.error(err?.response?.data?.message || "Failed to add comment");
//         },
//       }
//     );
//   };

//   return (
//     <div className="w-full mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg shadow-md">
//       <h2 className="text-xl sm:text-2xl font-nunito font-extrabold text-black mb-6">
//         Leave A Comment
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name and Email */}
//         <div className="grid grid-cols-1 md:flex gap-4">
//           <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
//             <FaUser className="text-[#6B7280]" size={18} />
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               className="w-full bg-transparent focus:outline-none ml-2"
//             />
//           </div>

//           <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
//             <FaRegEnvelope className="text-xl mt-1 text-[#6B7280]" />
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-transparent focus:outline-none ml-2"
//             />
//           </div>
//         </div>

//         {/* Comment Box */}
//         <div className="flex items-start bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
//           <FaRegComments className="text-[#6B7280]" size={18} />
//           <textarea
//             placeholder="Type Your Comments..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full bg-transparent focus:outline-none resize-none ml-2"
//             rows={4}
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-start mt-8">
//           <Button
//             text={mutation.isLoading ? "Submitting..." : "Submit Comment"}
//             bgColor="bg-[#122F2A]"
//             textColor="text-white"
//             rounded="rounded-full"
//             paddingx="px-6"
//             paddingy="py-4"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import { FiHeart, FiCornerUpLeft } from "react-icons/fi";
import { useFetchCommentById } from "@/src/hooks/useComments";

interface CommentsProps {
  blogId: string;
}

interface CommentType {
  id: string;
  name: string;
  comment: string;
  image?: string;
  timeAgo?: string;
}

export default function Comments({ blogId }: CommentsProps) {
  const { data, isLoading, isError } = useFetchCommentById(blogId);

  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Failed to load comments.</p>;

  const comments: CommentType[] = data?.comments || [];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        {comments.length.toString().padStart(2, "0")} Comments
      </h2>
      <div className="space-y-10 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-[98.4px] sm:h-[98.4px] flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow-400 p-1 bg-white">
              <Image
                src={comment.image || "/default-avatar.jpg"}
                alt={comment.name}
                width={98.4}
                height={98.4}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h5 className="text-lg sm:text-xl font-bold font-nunito">{comment.name}</h5>
              <p className="text-sm sm:text-base text-[#667471] font-nunito leading-snug whitespace-pre-line">
                {comment.comment}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B7280]">
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiHeart /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-[#3b82f6]">
                  <FiCornerUpLeft /> Reply
                </button>
                {comment.timeAgo && <span className="text-gray-600">{comment.timeAgo}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
