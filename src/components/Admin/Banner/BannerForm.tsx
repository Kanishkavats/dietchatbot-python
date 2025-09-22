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
    bannerImage: typeof initialData?.bannerImage === "string" ? initialData.bannerImage : "",
    link: initialData?.link ?? "",
    existingImage: typeof initialData?.bannerImage === "string" ? initialData.bannerImage : undefined,
  };

  const handleSubmit = async (
    values: BannerFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (v: boolean) => void; resetForm: () => void }
  ) => {
    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, values },
        {
          onSuccess: () => {
            resetForm();
            onClose();
          },
          onSettled: () => setSubmitting(false),
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          onClose();
        },
        onSettled: () => setSubmitting(false),
      });
    }
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
              label="Banner Title*"
              name="title"
              placeholder="Enter banner title"
              value={values.title}
              onChange={handleChange}
              error={touched.title ? errors.title : ""}
            />

            {/* Subtitle */}
            <CustomInput
              label="Banner Subtitle*"
              name="subtitle"
              placeholder="Enter banner subtitle"
              value={values.subtitle}
              onChange={handleChange}
              error={touched.subtitle ? errors.subtitle : ""}
            />

            {/* Link */}
            <CustomInput
              label="Banner Link*"
              name="link"
              placeholder="Enter banner link"
              value={values.link}
              onChange={handleChange}
              error={touched.link ? errors.link : ""}
            />

            {/* Banner Image */}
            <CustomFileInput
              label="Banner Image*"
              name="bannerImage"
              mode={mode}
              initialUrls={values.existingImage ? [values.existingImage] : []}
              error={touched.bannerImage && typeof errors.bannerImage === "string" ? errors.bannerImage : ""}
              onChange={(files, existingUrls) => {
                if (files.length > 0) {
                  setFieldValue("bannerImage", files[0]);
                } else if (existingUrls && existingUrls.length > 0) {
                  setFieldValue("bannerImage", existingUrls[0]);
                } else {
                  setFieldValue("bannerImage", "");
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
