"use client";

import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import Button from "../../common/Buttons/Button";
import { CampaignFormValues, campaignSchema } from "@/src/utils/validations/FormValidation";
import { CampaignFormProps } from "@/src/types/campaign";
import { createCampaign, updateCampaign } from "@/src/services/campaignApi";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import React, { useState } from "react";
import Dropdown from "../Common/Dropdown";
import { campaignCategories } from "../Data/staticData";
import { submitCampaignForm } from "@/src/hooks/useCampaigns";
import { IoMdClose } from "react-icons/io";

const CampaignForm = ({ initialData, onClose, readOnly,  }: CampaignFormProps) => {

  const normalizedKeyPoints: string[] = Array.isArray(initialData?.keyPoints)
    ? (initialData?.keyPoints as string[])
    : typeof initialData?.keyPoints === "string"
      ? (initialData.keyPoints as string).split(",")
      : [];


  const initialValues: CampaignFormValues = {
    title: initialData?.title || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    goalAmount: initialData?.goalAmount || 0,
    summary: initialData?.summary || "",
    keyPoints: normalizedKeyPoints,
    images: initialData?.images || [],
    location: String(initialData?.location || ""),
  };

  const [keyPointsList, setKeyPointsList] = useState<string[]>(normalizedKeyPoints);
  const [keyPointInput, setKeyPointInput] = useState("");

  const createMutation = useMutation({ mutationFn: createCampaign });
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: CampaignFormValues }) =>
      updateCampaign(data.id, data.values),
  });


  const handleKeyPointAdd = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && keyPointInput.trim()) {
      e.preventDefault();
      if (!keyPointsList.includes(keyPointInput.trim())) {
        setKeyPointsList([...keyPointsList, keyPointInput.trim()]);
      }
      setKeyPointInput("");
    }
  };


  // ✅ Remove key point
  const handleKeyPointRemove = (point: string) => {
    setKeyPointsList(keyPointsList.filter((p) => p !== point));
  };


  return (
    <div className="w-full pb-10">
      <Formik
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
          )
        }
        }
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => {
          React.useEffect(() => {
            setFieldValue("keyPoints", keyPointsList, true); // now it’s an array
          }, [keyPointsList, setFieldValue]);


          return (
            <Form className="flex flex-col gap-3">
              {/* Form Fields */}
              <CustomInput
                label={`${readOnly ? "Title" : "Title*"}`}
                placeholder="Title of the campaign"
                value={values.title}
                name="title"
                onChange={handleChange}
                error={touched.title ? errors.title : ""}
                disabled={readOnly}
                readOnly
              />
              <Dropdown
                label={`${readOnly ? "Category" : "Category*"}`}
                options={campaignCategories}
                value={values.category}
                onChange={(val) => setFieldValue("category", val)}
                placeholder="Select category"
                error={touched.category ? errors.category : ""}
                disabled={readOnly}
                readOnly
              />

              <CustomInput
                label={`${readOnly ? "Location" : "Location*"}`}
                placeholder="Location of the campaign"
                value={values.location}
                name="location"
                onChange={handleChange}
                error={touched.location ? errors.location : ""}
                disabled={readOnly}
                readOnly
              />

              <CustomInput
                label={`${readOnly ? "Goal Amount" : "Goal Amount*"}`}
                type="number"
                placeholder="Goal amount for the campaign"
                value={values.goalAmount}
                name="goalAmount"
                onChange={handleChange}
                error={touched.goalAmount ? errors.goalAmount : ""}
                disabled={readOnly}
                readOnly
              />

              <CustomInput
                label={`${readOnly ? "Description" : "Description*"}`}
                as="textarea"
                placeholder="Description of the campaign"
                value={values.description}
                name="description"
                onChange={handleChange}
                error={touched.description ? errors.description : ""}
                disabled={readOnly}
                readOnly
              />

              <CustomInput
                label={`${readOnly ? "Summary" : "Summary*"}`}
                as="textarea"
                placeholder="Summary of the campaign"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                error={touched.summary ? errors.summary : ""}
                disabled={readOnly}
                readOnly
              />

              {/* ✅ Key Points Input */}
              <div className="flex flex-col gap-2">
                <label className={`${readOnly ? "text-blue-50" : "text-gray-700"} font-medium`}>Key Points</label>
                {!readOnly && (
                  <div className="flex gap-2 items-center">
                    <CustomInput
                      placeholder="Type key point"
                      value={keyPointInput}
                      name="keyPointInput"

                      onChange={(e) => setKeyPointInput(e.target.value)}
                      onKeyDown={handleKeyPointAdd}
                      className="flex-1"
                      disabled={readOnly}
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
                {errors.keyPoints && touched.keyPoints && (
                  <div className="text-red text-sm">{errors.keyPoints}</div>
                )}
                {keyPointsList.length > 1 && !readOnly && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setKeyPointsList([])}
                      className="bg-red/60 text-white px-2 hover:bg-red cursor-pointer py-1 rounded-md"
                    >
                      Remove All
                    </button>
                  </div>
                )}
                <div className={`flex flex-wrap gap-2 ${readOnly ? "mt-0" : "mt-2"}`}>
                  {keyPointsList.map((point) => (
                    <span
                      key={point}
                      className={`flex items-center gap-1  px-2 py-1 rounded-md text-sm ${readOnly ? "cursor-default bg-gray-100  text-blue-50/80" : "cursor-pointer bg-lime-200 text-lime-800"}`}
                    >
                      {point}
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => handleKeyPointRemove(point)}
                          className="text-red cursor-pointer font-bold ml-1"
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
                onChange={(files) => setFieldValue("images", files)}
                disabled={readOnly}
                readOnly
                imageUrl={initialData?.imageUrl}
              />

              <div className="flex gap-2 mt-2">
                {!readOnly && (
                  <>
                    <Button
                      type="submit"
                      disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                      rounded="rounded-md"
                      bgColor="bg-lime-green"
                    >
                      {isSubmitting || createMutation.isPending || updateMutation.isPending ? (
                        <ButtonLoader />
                      ) : initialData ? (
                        "Update"
                      ) : (
                        "Create"
                      )}
                    </Button>
                    <Button
                      type="button"
                      text="Cancel"
                      onClick={onClose}
                      rounded="rounded-md"
                      bgColor="bg-gray-500"
                      hoverBg="before:bg-gray-700"
                      textColor="text-white"
                      icon=""
                    />
                  </>
                )}

              </div>
            </Form>
          )
        }
        }
      </Formik>
    </div>
  );
};

export default CampaignForm;
