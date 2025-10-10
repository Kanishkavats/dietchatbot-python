"use client";

import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useFetchCategory } from "@/src/hooks/useCategory";
import { CampaignFormValues, campaignSchema } from "@/src/utils/validations/FormValidation";
import { CampaignFormProps } from "@/src/types/campaign";

import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import Dropdown from "../Common/Dropdown";
import CancelButton from "../../common/Buttons/CancelButton";
import { Category } from "@/src/types/category";

const CampaignForm = ({ initialData, onClose, mode, onPreview }: CampaignFormProps) => {
  const initialValues: CampaignFormValues = {
    title: initialData?.title ?? "",
    category: initialData?.category ?? "",
    description: initialData?.description ?? "",
    goalAmount: initialData?.goalAmount ?? 0,
    summary: initialData?.summary ?? "",
    keyPoints: initialData?.keyPoints ?? [],
    images: initialData?.images ?? [],
    existingImages: initialData?.images?.filter((img): img is string => typeof img === "string") ?? [],
    location: initialData?.location ? String(initialData.location) : "",
  };

  const [keyPointsList, setKeyPointsList] = useState<string[]>(initialData?.keyPoints ?? []);
  const [keyPointInput, setKeyPointInput] = useState("");

  const { data: categoryData } = useFetchCategory();
  const categoryOptions = categoryData?.category?.map((category:Category) => ({
    label: category.name.en,
    value: category.name.en,
  })) ?? [];

  const isView = mode === "view";
  const isEdit = mode === "edit";

  return (
    <div className="w-full pb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={campaignSchema}
        onSubmit={(values) => {
          onPreview?.({ ...values, keyPoints: keyPointsList });
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => {
          useEffect(() => {
            setFieldValue("keyPoints", keyPointsList, true);
          }, [keyPointsList, setFieldValue]);

          return (
            <Form className="flex flex-col gap-3">
              <CustomInput
                label="Title*"
                placeholder="Title of the campaign"
                value={values.title}
                name="title"
                onChange={handleChange}
                error={touched.title ? errors.title : ""}
                disabled={isView}
              />

              <Dropdown
                label="Category*"
                options={categoryOptions}
                value={values.category}
                onChange={(val) => setFieldValue("category", val)}
                placeholder="Select category"
                error={touched.category ? errors.category : ""}
                disabled={isView}
              />

              <CustomInput
                label="Location*"
                placeholder="Location"
                value={values.location}
                name="location"
                onChange={handleChange}
                error={touched.location ? errors.location : ""}
                disabled={isView}
              />

              <CustomInput
                label="Goal Amount*"
                type="number"
                placeholder="Enter goal amount"
                value={values.goalAmount}
                name="goalAmount"
                onChange={handleChange}
                error={touched.goalAmount ? errors.goalAmount : ""}
                disabled={isView}
              />

              <CustomInput
                label="Description*"
                as="textarea"
                value={values.description}
                name="description"
                onChange={handleChange}
                error={touched.description ? errors.description : ""}
                disabled={isView}
              />

              <CustomInput
                label="Summary*"
                as="textarea"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                error={touched.summary ? errors.summary : ""}
                disabled={isView}
              />

              {/* Key Points */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Key Points</label>
                {!isView && (
                  <div className="flex gap-2 items-center">
                    <CustomInput
                      placeholder="Type key point"
                      value={keyPointInput}
                      onChange={(e) => setKeyPointInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && keyPointInput.trim()) {
                          e.preventDefault();
                          if (!keyPointsList.includes(keyPointInput.trim())) {
                            setKeyPointsList([...keyPointsList, keyPointInput.trim()]);
                          }
                          setKeyPointInput("");
                        }
                      }}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (keyPointInput.trim() && !keyPointsList.includes(keyPointInput.trim())) {
                          setKeyPointsList([...keyPointsList, keyPointInput.trim()]);
                        }
                        setKeyPointInput("");
                      }}
                      className="bg-primaryColor cursor-pointer text-white px-3 py-2 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  {keyPointsList.map((point) => (
                    <span
                      key={point}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${isView
                        ? "bg-gray-100 text-gray-600"
                        : "bg-lime-200 text-lime-800"
                        }`}
                    >
                      {point}
                      {!isView && (
                        <button
                          type="button"
                          onClick={() =>
                            setKeyPointsList(keyPointsList.filter((p) => p !== point))
                          }
                          className="text-red font-bold ml-1"
                        >
                          <IoMdClose />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <CustomFileInput
                label="Campaign Images"
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
                    ? initialData.images.filter(
                      (img): img is string => typeof img === "string"
                    )
                    : []
                }
              />

              {/* Buttons */}
              {!isView && (
                <div className="flex gap-2 mt-2 w-fit">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    paddingx="px-4"
                    paddingy="py-2"
                    rounded="rounded-[5px]"
                    bgColor="bg-lime-green"
                  >
                    {isSubmitting ? <ButtonLoader /> : "Preview"}
                  </Button>
                  <CancelButton text="Cancel" onClose={onClose} />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CampaignForm;
