"use client";

import React from "react";
import { Formik, Form } from "formik";
import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CancelButton from "../../common/Buttons/CancelButton";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import { BannerFormValues, bannerSchema } from "@/src/utils/validations/FormValidation";
import { BannerFormProps } from "@/src/types/banner";
import { submitBannerForm } from "@/src/hooks/useBanner";

const BannerForm = ({
  initialData,
  onClose,
  mode,
  createMutation,
  updateMutation,
}: BannerFormProps) => {
  const isEdit = mode === "edit";

  // Initial form values setup
  const initialValues: BannerFormValues & { existingImage?: string } = {
    title: initialData?.title ?? "",
    subtitle: initialData?.subtitle ?? "",
    image: typeof initialData?.image === "string" ? initialData.image : "",
    existingImage: typeof initialData?.image === "string" ? initialData.image : undefined,
    priority: initialData?.priority ?? 0,
  };

 const handleSubmit = (
  values: BannerFormValues,
  {
    setSubmitting,
    resetForm,
  }: {
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
  }
) => {
  submitBannerForm(values, initialData, createMutation, updateMutation, resetForm, setSubmitting, onClose);
};

  return (
    <div className="w-full pb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={bannerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3">

            {/* Title */}
            <CustomInput
              label="Title*"
              name="title"
              placeholder="Enter banner title"
              value={values.title}
              onChange={handleChange}
              error={touched.title ? errors.title : ""}
            />

            {/* Subtitle */}
            <CustomInput
              label="Subtitle*"
              name="subtitle"
              placeholder="Enter banner subtitle"
              value={values.subtitle}
              onChange={handleChange}
              error={touched.subtitle ? errors.subtitle : ""}
            />
            <CustomInput
              label="Priority*"
              name="priority"
              placeholder="Enter banner priority"
              value={values.priority}
              onChange={handleChange}
              error={touched.priority ? errors.priority : ""}
            />

            {/* Banner Image */}
            <CustomFileInput
              label=" Image*"
              name="image"
              mode={mode}
              initialUrls={values.existingImage ? [values.existingImage] : []}
              error={touched.image && typeof errors.image === "string" ? errors.image : ""}
              onChange={(files, existingUrls) => {
                if (files.length > 0) {
                  setFieldValue("image", files[0]);
                } else if (existingUrls && existingUrls.length > 0) {
                  setFieldValue("image", existingUrls[0]);
                } else {
                  setFieldValue("image", "");
                }
              }}
            />

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2 w-fit">
              <Button
                type="submit"
                disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                bgColor="bg-lime-green"
                paddingx="px-4"
                paddingy="py-2"
                rounded="rounded-[5px]"
              >
                {isSubmitting || createMutation.isPending || updateMutation.isPending ? (
                  <ButtonLoader />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
              <CancelButton text="Cancel" onClose={onClose} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BannerForm;
