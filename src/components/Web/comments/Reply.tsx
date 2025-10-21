
"use client";

import { useState } from "react";
import Button from "../../UI/web/Buttons/Button";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import { CommentReplyFormValues, CommentReplySchema } from "@/src/utils/validations/FormValidation";
import InputField from "../../UI/web/InputField";
import { FaX } from "react-icons/fa6";
import ButtonLoader from "../../UI/web/Loader/ButtonLoader";
import { useAddReply } from "@/src/hooks/web/useComments";
import CancelButton from "../../UI/web/Buttons/CancelButton";
import { ReplyCommentProps } from "@/src/types/web/comments";

const initialValues: CommentReplyFormValues = {
  email: "",
  name: "",
  comment: "",
};


export default function ReplyComment({ id, handleReplyModel }: ReplyCommentProps) {
  const mutation = useAddReply();

const handleSubmit = (values: CommentReplyFormValues, { resetForm }: { resetForm: () => void }) =>  {
  const tempReply = {
    ...values,
    id: Date.now(),
    commentId: id,
    isPending: true,
  };

  // Save to LocalReplies
  const localReplies = JSON.parse(localStorage.getItem('LocalReplies') || '[]');
  localStorage.setItem('LocalReplies', JSON.stringify([...localReplies, tempReply]));

  // ✅ Update totalReplies in LocalComments
  const localComments = JSON.parse(localStorage.getItem('LocalComments') || '[]');
  const updatedComments = localComments.map((c: any) => {
    if (c.id === id) {
      return {
        ...c,
        totalReplies: (c.totalReplies || 0) + 1,
      };
    }
    return c;
  });
  localStorage.setItem('LocalComments', JSON.stringify(updatedComments));

  // Trigger UI refresh
  window.dispatchEvent(new Event("commentAdded"));

  // Trigger server mutation (if connected)
  mutation.mutate(
    { id: id, data: values },
    {
      onSuccess: () => {
        toast.success("Comment submitted successfully");
        resetForm();
        handleReplyModel(false);
      },
      onError: () => {
        toast.error("Reply can not be added, please try again later!");
      },
    }
  );
};


  return (
    <div className="w-full mt-10 p-4 sm:p-6 h-[75vh] xs:w-[70vh] md:max-h-[68vh] lg:max-w-[75vh] lg:max-h-[56vh] xl:max-h-[55vh] 2xl:max-h-[30vh] 2xl:max-w-[70vh]  md:max-w-[80vh] bg-white rounded-lg shadow-lg border border-gray-100 py-5">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-[27px] font-nunito font-extrabold text-foreground ">
          Reply
        </h2>
        <FaX onClick={() => handleReplyModel(false)} className="cursor-pointer text-foreground mb-1" size={20} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={CommentReplySchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:flex gap-4 lg:flex lg:gap-5">
              <div className="flex-1">
                <InputField
                  type="text"
                  name='name'
                  icon={"mdi:user"}
                  placeholder="Your Name"
                  className="flex items-center bg-gray-light rounded-md px-4 py-2 w-full "
                />
              </div>

              <div className="flex-1">
                <InputField
                  type="email"
                  icon={'mdi:envelope'}
                  name="email"
                  placeholder="Enter Email"
                  className="flex items-center bg-gray-light rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex-1  ">
              <InputField
                as='textarea'
                icon={'fa7-regular:comments'}
                name="comment"
                placeholder="Type Your Reply..."
                className="w-full items-start flex bg-gray-light rounded-md px-4 py-2 focus:outline-none resize-none "
              />
            </div>

            <div className="flex justify-start space-x-3 mt-8">
              <div className="w-fit">
                <Button
                  text={"Add Reply"}
                  bgColor="bg-green"
                  textColor="text-white text-sm lg:text-lg"
                  rounded="rounded-full"
                  hoverTextColor="group-hover:text-black"
                  hoverBg="before:bg-yellow"
                  paddingx="px-4 md:px-5 "
                  paddingy="py-3 md:py-4 "
                  type="submit"
                >
                  {mutation.isPending ? (
                    <ButtonLoader />) : (
                    "Add Reply"
                  )}
                </Button>
              </div>
              <div className="w-fit">
                <CancelButton rounded="rounded-full"
                  paddingX="px-4 md:px-6"
                  paddingY="py-3"
                  text="Cancel"
                  textSize="text-sm lg:text-lg"
                  onClose={() => handleReplyModel(false)} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
