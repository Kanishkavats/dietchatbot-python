"use client";

import { useState } from "react";
import { useCreateComment } from "@/src/hooks/useComments";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../common/Buttons/Button";
import { FaUser, FaRegEnvelope, FaRegComments } from "react-icons/fa";
import toast from "react-hot-toast";
export default function LeaveComment({ blogId }: { blogId: string }) {
  const queryClient = useQueryClient();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const mutation = useCreateComment();

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      alert("Please fill out all fields");
      return;
    }

    if (!blogId) {
      alert("Blog ID is missing");
      return;
    }

    mutation.mutate(
      { id: blogId, data: { name, comment, email } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["comments", blogId] });
          console.log("id =",blogId)
          toast.success("Comment submitted successfully");
          setName("");
          setEmail("");
          setComment("");
        },
      }
    );
  };

  return (
    <div className="w-full mt-10 p-4 sm:p-6 bg-[#ffffff] rounded-lg">
      <h2 className="text-xl sm:text-2xl font-nunito font-extrabold text-black mb-6">
        Leave A Comment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:flex gap-4">
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
            <FaUser className="text-[#6B7280]" size={18} />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>
          <div className="flex items-center bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
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

        <div className="flex items-start bg-[#F2F2F2] rounded-md px-4 py-2 w-full">
          <FaRegComments className="text-[#6B7280]" size={18} />
          <textarea
            placeholder="Type Your Comments..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-transparent focus:outline-none resize-none ml-2"
            rows={4}
          />
        </div>

        <div className="flex justify-start mt-8">
          <Button
            text={mutation.isPending ? "Submitting..." : "Submit Comment"}
            bgColor="bg-[#122F2A]"
            textColor="text-white"
            rounded="rounded-full"
            paddingx="px-6"
            paddingy="py-4"
          />
        </div>
      </form>
    </div>
  );
}
