"use client";

import { Formik, Form, FieldArray } from "formik";
import React, { useState } from "react";
import { useFetchCategory } from "@/src/hooks/useCategory";
import { BlogFormValues, blogSchema } from "@/src/utils/validations/FormValidation";
import { BlogFormProps } from "@/src/types/blog";

// Components
import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import Dropdown from "../Common/Dropdown";
import MultiInputList from "../Common/MultiInputList";
import CancelButton from "../../common/Buttons/CancelButton";
import { hasErrorsForLang } from "../Common/hasErrorsForLang";

const BlogForm = ({
  initialData,
  onClose,
  mode,
  onPreview,
  createMutation,
  updateMutation,
}: BlogFormProps) => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  // Prepare initial values for the form
  const initialValues: BlogFormValues = {
    title: {
      en: initialData?.title?.en ?? "",
      hi: initialData?.title?.hi ?? "",
    },
    creator: {
      en: initialData?.creator?.en ?? "",
      hi: initialData?.creator?.hi ?? "",
    },
    description: {
      en: initialData?.description?.en ?? "",
      hi: initialData?.description?.hi ?? "",
    },
    summary: {
      en: initialData?.summary?.en ?? "",
      hi: initialData?.summary?.hi ?? "",
    },
    quote: {
      en: initialData?.quote?.en ?? "",
      hi: initialData?.quote?.hi ?? "",
    },
    quoteAuthor: {
      en: initialData?.quoteAuthor?.en ?? "",
      hi: initialData?.quoteAuthor?.hi ?? "",
    },
    tags: {
      en: initialData?.tags?.en ?? [],
      hi: initialData?.tags?.hi ?? [],
    },
    keyPoints: {
      en: initialData?.keyPoints?.en ?? [],
      hi: initialData?.keyPoints?.hi ?? [],
    },

    location: {
      en: initialData?.location?.en ?? "",
      hi: initialData?.location?.hi ?? "",
    },
    category: {
      name: {
        en: initialData?.category?.name?.en ?? "",
        hi: initialData?.category?.name?.hi ?? "",
      },
    },
    images: initialData?.images ?? [],
    existingImages:
      initialData?.existingImages ??
      (initialData?.images?.filter((img) => typeof img === "string") ?? []),
  };

  const { data: categoryData } = useFetchCategory();

  const categoryOptions =
    categoryData?.category?.map((c: { id: string; name: string }) => ({
      label: c.name,
      value: c.name,
    })) || [];

  const isView = mode === "view";
  const isEdit = mode === "edit";

  return (
    <div className="w-full pb-10">

      {/* Language Toggle */}

      <div className="flex justify-start text-[13px] mb-4">
        <button
          type="button"
          className={`cursor-pointer px-2 py-1 ${language === "en"
            ? "bg-lime-green text-white"
            : "bg-gray-200 text-gray-800"
            } rounded-l`}
          onClick={() => setLanguage("en")}
          disabled={language === "en"}
        >
          English
        </button>
        <button
          type="button"
          className={`cursor-pointer px-2 py-1 ${language === "hi"
            ? "bg-lime-green text-white"
            : "bg-gray-200 text-gray-800"
            } rounded-r`}
          onClick={() => setLanguage("hi")}
          disabled={language === "hi"}
        >
          हिंदी
        </button>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={blogSchema}
        onSubmit={(values) => {
          console.log("Formatted Payload:");

          const payload = {
            creator: values.creator,
            title: values.title,
            description: values.description,
            summary: values.summary,
            quote: values.quote,
            quoteAuthor: values.quoteAuthor,
            tags: values.tags,
            keyPoints: values.keyPoints,
            location: values.location,
            category: values.category,
            images: values.images,
            existingImages: values.existingImages,
          };

          console.log("Formatted Payload:", payload);
          onPreview?.(payload);
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          validateForm,
          submitForm,
          setTouched
        }) => {
          const lang = language;

          const handlePreviewClick = async () => {
            const touchAllFields = (obj: any): any => {
              if (typeof obj !== 'object' || obj === null) return true;

              const touchedObj: any = {};
              for (const key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                  touchedObj[key] = touchAllFields(value);
                } else {
                  touchedObj[key] = true;
                }
              }
              return touchedObj;
            };

            setTouched(touchAllFields(values));

            const formErrors = await validateForm();
            console.log("Form Errors:", formErrors);

            for (const l of ["en", "hi"] as const) {
              if (hasErrorsForLang(formErrors, l)) {
                setLanguage(l); 
                return; 
              }
            }

            if (formErrors.images) {
              return;
            }

            submitForm();
          };


          return (
            <Form className="flex flex-col gap-3">
              {/* Creator */}
              <CustomInput
                label={`${lang === "en" ? "Creator" : "रचयिता"}*`}
                placeholder={lang === "en" ? "Creator name" : "रचयिता का नाम"}
                value={values.creator[lang]}
                name={`creator.${lang}`}
                onChange={handleChange}
                error={touched.creator?.[lang] ? errors.creator?.[lang] : ""}
                disabled={isView}
              />

              {/* Title */}
              <CustomInput
                label={`${lang === "en" ? "Title" : "शीर्षक"}*`}
                placeholder={lang === "en" ? "Blog title" : "ब्लॉग शीर्षक"}
                value={values.title[lang]}
                name={`title.${lang}`}
                onChange={handleChange}
                error={touched.title?.[lang] ? errors.title?.[lang] : ""}
                disabled={isView}
              />

              {/* Description */}
              <CustomInput
                label={`${lang === "en" ? "Description" : "विवरण"}*`}
                as="textarea"
                placeholder={lang === "en" ? "Detailed description" : "ब्लॉग का विवरण"}
                value={values.description[lang]}
                name={`description.${lang}`}
                onChange={handleChange}
                error={touched.description?.[lang] ? errors.description?.[lang] : ""}
                disabled={isView}
              />

              {/* Summary */}
              <CustomInput
                label={`${lang === "en" ? "summary" : "सारांश"}*`}
                as="textarea"
                placeholder={lang === "en" ? "Short summary" : "सारांश"}
                value={values.summary[lang]}
                name={`summary.${lang}`}
                onChange={handleChange}
                error={touched.summary?.[lang] ? errors.summary?.[lang] : ""}
                disabled={isView}
              />

              {/* Quote */}
              <CustomInput
                label={`${lang === "en" ? "quote" : "उद्धरण"}*`}
                placeholder={lang === "en" ? "Inspiring quote" : "प्रेरणादायक उद्धरण"}
                value={values.quote[lang]}
                name={`quote.${lang}`}
                onChange={handleChange}
                error={touched.quote?.[lang] ? errors.quote?.[lang] : ""}
                disabled={isView}
              />

              {/* Quote Author */}
              <CustomInput
                label={`${lang === "en" ? "Quote Author" : "उद्धरण के लेखक"}*`}
                placeholder={lang === "en" ? "Author of the quote" : "उद्धरण के लेखक"}
                value={values.quoteAuthor[lang]}
                name={`quoteAuthor.${lang}`}
                onChange={handleChange}
                error={touched.quoteAuthor?.[lang] ? errors.quoteAuthor?.[lang] : ""}
                disabled={isView}
              />

              {/* Category Dropdown */}
              <Dropdown
                label={`${lang === "en" ? "Category" : "श्रेणी"}*`}
                options={categoryOptions}
                value={values.category.name[lang]}
                onChange={(val) => setFieldValue(`category.name.${lang}`, val)}
                placeholder={lang === "en" ? "Select category" : "श्रेणी चुनें"}
                error={touched.category?.name?.[lang] ? errors.category?.name?.[lang] : ""}
              />


              {/* Tags (shared across languages) */}
              <MultiInputList
                label={`${lang === "en" ? "Tags" : "टैग"}`}
                values={values.tags[lang]}
                onChange={(newTags) => setFieldValue(`tags.${lang}`, newTags)}
                placeholder={lang === "en" ? "Add a tag" : "टैग जोड़ें"}
                isView={isView}
                error={touched.tags?.[lang] && errors.tags?.[lang] ? errors.tags?.[lang] : ""}
              />


              {/* Key Points (language-specific array of objects) */}
              <MultiInputList
                label={`${lang === "en" ? "Key Points" : "मुख्य बिंदु"}`}
                values={values.keyPoints[lang]}
                onChange={(newKeyPoints) => setFieldValue(`keyPoints.${lang}`, newKeyPoints)}
                placeholder={lang === "en" ? "Add a key point" : "मुख्य बिंदु जोड़ें"}
                isView={isView}
                error={touched.keyPoints?.[lang] && errors.keyPoints?.[lang] ? errors.keyPoints?.[lang] : ""}
              />


              {/* Location (shared field) */}
              <CustomInput
                label={`${lang === "en" ? "Location" : "स्थान"}*`}
                placeholder={lang === "en" ? "Location of the blog" : "ब्लॉग का स्थान"}
                value={values.location[lang]}
                name={`location.${lang}`}
                onChange={handleChange}
                error={touched.location?.[lang] ? errors.location?.[lang] : ""}
              />


              {/* Images */}
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
                    ? initialData.images.filter(
                      (img: string | File): img is string => typeof img === "string"
                    )
                    : []
                }
              />

              {/* Action Buttons */}
              {!isView && (
                <div className="flex gap-2 mt-4 w-fit">
                  <Button
                    type="button"
                    onClick={handlePreviewClick}
                    disabled={
                      isSubmitting || createMutation.isPending || updateMutation.isPending
                    }
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
                      "Preview"
                    )}
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

export default BlogForm;
