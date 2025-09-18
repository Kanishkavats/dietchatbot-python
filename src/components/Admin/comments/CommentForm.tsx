"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../Common/CustomInput";
import { toast } from "react-hot-toast";
import { Comment } from "@/src/types/comments";
import { commentSchema, CommentFormValues } from "@/src/utils/validations/FormValidation";
import { updateComment } from "@/src/services/commentsApi";

interface CommentFormProps {
  initialData?: Comment;
  onClose: () => void;
  mode: "edit" | "view";
}

const CommentForm: React.FC<CommentFormProps> = ({ initialData, onClose, mode }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: { approved: boolean } }) =>
      updateComment(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  // Utility: Convert approved boolean to status string
  const getStatusFromApproved = (approved?: boolean): "pending" | "approved" | "rejected" => {
    if (approved === true) return "approved";
    if (approved === false) return "rejected";
    return "pending";
  };

  const initialValues: CommentFormValues = {
    name: initialData?.name ?? "",
    comment: initialData?.comment ?? "",
    status: getStatusFromApproved(initialData?.approved),
  };

  const hasBeenReviewed = initialData?.approved !== undefined && initialData?.approved !== null;

  const handleSubmit = (
    values: CommentFormValues,
    resetForm: () => void,
    setSubmitting: (v: boolean) => void
  ) => {
    toast.dismiss();
    toast.loading("Updating comment...");

    const approvedValue =
      values.status === "approved" ? true : values.status === "rejected" ? false : undefined;

    if (approvedValue === undefined) {
      toast.dismiss();
      toast.error("Please select Approved or Rejected.");
      setSubmitting(false);
      return;
    }

    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        {
          id: initialData.id,
          values: {
            approved: approvedValue,
          },
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Comment updated");
            resetForm();
            setSubmitting(false);
            onClose();
          },
          onError: (err: any) => {
            toast.dismiss();
            toast.error(err?.message || "Failed to update comment");
            setSubmitting(false);
          },
        }
      );
    }
  };

  return (
    <div className="w-full pb-6">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={commentSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmit(values, resetForm, setSubmitting)
        }
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <CustomInput
              label="Name"
              placeholder="Enter name"
              value={values.name ?? ""}
              name="name"
              onChange={handleChange}
              error={touched.name ? errors.name : ""}
              disabled
            />

            <CustomInput
              label="Comment"
              as="textarea"
              placeholder="Enter comment"
              value={values.comment ?? ""}
              name="comment"
              onChange={handleChange}
              error={touched.comment ? errors.comment : ""}
              disabled
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                disabled={isView}
                className={`border px-3 py-2 rounded-md outline-none focus:ring-2 ${
                  touched.status && errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                {!hasBeenReviewed && <option value="pending">Pending</option>}
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {touched.status && errors.status && (
                <span className="text-sm text-red-500">{errors.status}</span>
              )}
            </div>

            {!isView && (
              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || updateMutation.isPending}
                  bgColor="bg-lime-green"
                  paddingx="px-4"
                  paddingy="py-2"
                  rounded="rounded-[5px]"
                >
                  {isSubmitting || updateMutation.isPending ? <ButtonLoader /> : "Update"}
                </Button>
                <Button
                  type="button"
                  text="Cancel"
                  onClick={onClose}
                  bgColor="bg-gray-500"
                  hoverBg="before:bg-gray-700"
                  textColor="text-white"
                  paddingx="px-4"
                  paddingy="py-2"
                  rounded="rounded-[5px]"
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentForm;
