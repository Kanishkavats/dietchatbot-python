"use client";

import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import Dropdown from "../Common/Dropdown";

import { CampaignFormValues, campaignSchema } from "@/src/utils/validations/FormValidation";
import { CampaignFormProps } from "@/src/types/campaign";
import { createCampaign, updateCampaign } from "@/src/services/campaignApi";
import { submitCampaignForm } from "@/src/hooks/useCampaigns";
import { useFetchCategory } from "@/src/hooks/useCategory";

const CampaignForm = ({ initialData, onClose, mode }: CampaignFormProps) => {

  // ✅ Initial values
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
  const cateogryOptions = categoryData?.category?.map((c: { id: string; name: string }) => ({
    label: c.name,
    value: c.name,
  })) || []


  // ✅ Mutations
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: CampaignFormValues }) =>
      updateCampaign(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });


  // ✅ Mode helpers
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  return (
    <div className="w-full pb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={campaignSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitCampaignForm(
            { ...values, keyPoints: keyPointsList },
            initialData,
            createMutation,
            updateMutation,
            resetForm,
            setSubmitting,
            onClose
          );
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => {
          React.useEffect(() => {
            setFieldValue("keyPoints", keyPointsList, true);
          }, [keyPointsList, setFieldValue]);

          return (
            <Form className="flex flex-col gap-3">
              {/* Title */}
              <CustomInput
                label="Title*"
                placeholder="Title of the campaign"
                value={values.title}
                name="title"
                onChange={handleChange}
                error={touched.title ? errors.title : ""}
                disabled={isView}
              />

              {/* Category */}
              <Dropdown
                label="Category*"
                options={cateogryOptions}
                value={values.category}
                onChange={(val) => setFieldValue("category", val)}
                placeholder="Select category"
                error={touched.category ? errors.category : ""}
                disabled={isView}
              />

              {/* Location */}
              <CustomInput
                label="Location*"
                placeholder="Location of the campaign"
                value={values.location}
                name="location"
                onChange={handleChange}
                error={touched.location ? errors.location : ""}
                disabled={isView}
              />

              {/* Goal Amount */}
              <CustomInput
                label="Goal Amount*"
                type="number"
                placeholder="Goal amount for the campaign"
                value={values.goalAmount}
                name="goalAmount"
                onChange={handleChange}
                error={touched.goalAmount ? errors.goalAmount : ""}
                disabled={isView}
              />

              {/* Description */}
              <CustomInput
                label="Description*"
                as="textarea"
                placeholder="Description of the campaign"
                value={values.description}
                name="description"
                onChange={handleChange}
                error={touched.description ? errors.description : ""}
                disabled={isView}
              />

              {/* Summary */}
              <CustomInput
                label="Summary*"
                as="textarea"
                placeholder="Summary of the campaign"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                error={touched.summary ? errors.summary : ""}
                disabled={isView}
              />

              {/* ✅ Key Points */}
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
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${isView ? "bg-gray-100 text-gray-600" : "bg-lime-200 text-lime-800"
                        }`}
                    >
                      {point}
                      {!isView && (
                        <button
                          type="button"
                          onClick={() => setKeyPointsList(keyPointsList.filter((p) => p !== point))}
                          className="text-red font-bold ml-1"
                        >
                          <IoMdClose />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <CustomFileInput
                label="Campaign Images"
                name="images"
                error={touched.images && errors.images ? errors.images : ""}
                onChange={(files, existingUrls) => {
                  setFieldValue("images", files); // new files only
                  setFieldValue("existingImages", existingUrls); // existing images
                }}
                disabled={isView}
                mode={mode}
                initialUrls={
                  Array.isArray(initialData?.images)
                    ? initialData.images.filter((img): img is string => typeof img === "string")
                    : []
                }
              />


              {/* Buttons */}
              {!isView && (
                <div className="flex gap-2 mt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                    paddingx="px-4"
                    paddingy="py-2"
                    rounded="rounded-[5px] "
                    bgColor="bg-lime-green"
                  >
                    {isSubmitting || createMutation.isPending || updateMutation.isPending ? (
                      <ButtonLoader />
                    ) : isEdit ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                  <Button
                    type="button"
                    text="Cancel"
                    onClick={onClose}
                    bgColor="bg-red"
                    hoverBg="before:bg-red-50"
                    textColor="text-white"
                    paddingx="px-4"
                    paddingy="py-2"
                    rounded="rounded-[5px]"
                    icon=""
                  />
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
