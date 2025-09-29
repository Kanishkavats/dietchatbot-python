"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import CancelButton from "../../common/Buttons/CancelButton";
import { toast } from "react-hot-toast";

import { feedbackSchema, FeedbackFormValues } from "@/src/utils/validations/FormValidation";
import { Feedback } from "@/src/types/feedback";
import { updateFeedback } from "@/src/services/feedbackApi";
import CustomFileInput from "../Common/CustomFileInput";

interface FeedbackFormProps {
  initialData?: Feedback;
  onClose: () => void;
  mode: "edit" | "view";
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ initialData, onClose, mode }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const queryClient = useQueryClient();

  // Map backend status to form status
  const mapBackendStatusToFormStatus = (
    status?: string
  ): "PENDING" | "APPROVED" | "REJECTED" => {
    if (!status) return "PENDING";
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "APPROVED";
      case "REJECTED":
        return "REJECTED";
      case "PENDING":
      default:
        return "PENDING";
    }
  };

  const initialValues: FeedbackFormValues = {
    name: initialData?.name ?? "",
    designation: initialData?.designation ?? "",
    imageUrl: initialData?.imageUrl ?? null,
    feedback: initialData?.feedback ?? "",
    rating: initialData?.rating ?? 0,
    status: mapBackendStatusToFormStatus(initialData?.status),
  };

  console.log("initialData", initialData)
  const hasBeenReviewed =
    initialData?.status && initialData.status.toUpperCase() !== "PENDING";

  const options = [
    ...(hasBeenReviewed ? [] : [{ label: "Pending", value: "PENDING" as const }]),
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<FeedbackFormValues> }) =>
      updateFeedback(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });

  const handleSubmit = (
    values: FeedbackFormValues,
    resetForm: () => void,
    setSubmitting: (v: boolean) => void
  ) => {
    toast.dismiss();
    toast.loading("Updating feedback...");

    let statusBoolean: boolean | undefined;

    if (values.status === "APPROVED") {
      statusBoolean = true;
    } else if (values.status === "REJECTED") {
      statusBoolean = false;
    } else {
      statusBoolean = undefined;
    }

    const payload: Partial<FeedbackFormValues> = {
      ...(statusBoolean !== undefined ? { approved: statusBoolean } : {}),
    };

    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        {
          id: initialData.id,
          values: payload,
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Feedback updated");
            resetForm();
            setSubmitting(false);
            onClose();
          },
          onError: (err: any) => {
            toast.dismiss();
            toast.error(err?.message || "Failed to update feedback");
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
        validationSchema={feedbackSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmit(values, resetForm, setSubmitting)
        }
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <CustomInput
              label="Name"
              placeholder="Enter name"
              value={values.name}
              name="name"
              onChange={handleChange}
              error={touched.name ? errors.name : ""}
              disabled
            />

            <CustomInput
              label="Designation"
              placeholder="Enter designation"
              value={values.designation}
              name="designation"
              onChange={handleChange}
              error={touched.designation ? errors.designation : ""}
              disabled
            />

            <CustomFileInput
              label="Blog Images*"
              name="images"
              error={touched.images && errors.images ? errors.images : ""}
              onChange={(files, existingUrls) => {
                setFieldValue("images", files);
                setFieldValue("existingImages", existingUrls);
              }}
              uploadType="multiple"
              disabled={isView}
              mode={mode}
              initialUrls={
                Array.isArray(initialData?.images)
                  ? initialData.images.filter((img: string | File): img is string => typeof img === "string")
                  : []
              }
            />


            <CustomInput
              label="Feedback"
              as="textarea"
              placeholder="Enter feedback"
              value={values.feedback}
              name="feedback"
              onChange={handleChange}
              error={touched.feedback ? errors.feedback : ""}
              disabled
            />

            <CustomInput
              label="Rating"
              placeholder="Enter rating (1-5)"
              type="number"
              min={1}
              max={5}
              value={values.rating}
              name="rating"
              onChange={handleChange}
              error={touched.rating ? errors.rating : ""}
              disabled
            />

            <Dropdown
              label="Status"
              value={values.status}
              onChange={(val) => handleChange({ target: { name: "status", value: val } })}
              options={options}
              error={touched.status && errors.status ? errors.status : ""}
              disabled={isView}
            />

            {!isView && (
              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || updateMutation.isLoading}
                  bgColor="bg-lime-green"
                  paddingx="px-4"
                  paddingy="py-2"
                  rounded="rounded-[5px]"
                >
                  {isSubmitting || updateMutation.isLoading ? <ButtonLoader /> : "Update"}
                </Button>
                <CancelButton text="Cancel" onClose={onClose} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;
