



"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUser, FaRegEnvelope, FaRegComments } from "react-icons/fa";
import Button from "../common/Buttons/Button";
import { useCreateComment } from "@/src/hooks/useComments";
import toast from "react-hot-toast";

export default function LeaveComment() {
  const queryClient = useQueryClient();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const mutation=useCreateComment();



  // Submit handler
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !comment) {
    alert("Please fill out all fields");
    return;
  }

  const targetId = "52511bdd-a3f7-48e3-94da-de8667170871"; 

  mutation.mutate(
    { id: targetId, data: { name, comment, email } },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success("Comment successfully");
        setName("");
        setEmail("");
        setComment("");
      },
    }
  );
};

  return (
    <div className="w-full mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg lg:w-[896px] lg:h-[595px] lg:mt-20 lg:px-5 lg:py-15">
      <h2 className="text-xl sm:text-2xl font-nunito font-extrabold text-black mb-6">
        Leave A Comment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:flex gap-15">
          {/* Name input */}
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full lg:w-[316px] lg:h-[96px]">
            <FaUser className="text-[#6B7280]" size={18} />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>

          {/* Email input */}
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full lg:w-[316px] lg:h-[96px]">
            <FaRegEnvelope className="text-xl mt-1 text-[#6B7280]" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>
        </div>

        {/* Comment textarea */}
        <div className="flex items-start bg-[#F2F2F2] rounded-md px-4 py-2 w-full lg:w-[700px] lg:h-[184px]">
          <FaRegComments className="text-[#6B7280]" size={18} />
          <textarea
            placeholder="Type Your Comments..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-transparent focus:outline-none resize-none ml-2"
            rows={4}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-start mt-8">
          <div className="w-fit">
            <Button
              text={mutation.isPending ? "Submitting..." : "Submit Comment"}
              bgColor="bg-[#122F2A]"
              textColor="text-white"
              hoverTextColor="group-hover:text-black"
              hoverBg="before:bg-yellow"
              rounded="rounded-full"
              paddingx="px-6"
              paddingy="py-4"
              icon=""
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
