"use client";

import { Formik, Form, FieldArray } from "formik";
import React from "react";
import { useFetchCategory } from "@/src/hooks/admin/useCategory";
import {  blogSchema } from "@/src/utils/validations/FormValidation";
import { BlogFormProps } from "@/src/types/admin/blog";
import CustomInput from "../../UI/admin/CustomInput";
import CustomFileInput from "../../UI/admin/CustomFileInput";
import Dropdown from "../../UI/admin/Dropdown";
import MultiInputList from "../../UI/admin/MultiInputList";
import { hasErrorsForLang } from "../../UI/admin/hasErrorsForLang";
import { getInitialBlogValues } from "../utils/blogInitialValues";
import LanguageToggle from "../../UI/admin/LanguageToggle";
import CancelButton from "../../UI/web/Buttons/CancelButton";
import ButtonLoader from "../../UI/web/Loader/ButtonLoader";
import Button from "../../UI/web/Buttons/Button";
import { useLanguageToggle } from "@/src/hooks/admin/useLanguageToggle";
import { Category } from "@/src/types/admin/category";

const BlogForm = ({
  initialData,
  onClose,
  mode,
  onPreview,
  createMutation,
  updateMutation,
}: BlogFormProps) => {

  // Prepare initial values for the form
  const initialValues = getInitialBlogValues(initialData);
  const { language, toggleLanguage } = useLanguageToggle();

  const { data: categoryData } = useFetchCategory();
   console.log(categoryData);

  const categoryOptions =
    categoryData?.category?.map((category: Category) => ({
      label: category.name?.[language] || category.name.en, 
      value: category.name?.[language] || category.name.en,
    })) ?? [];

      


  const isView = mode === "view";
  const isEdit = mode === "edit";

  return (
    <div className="w-full pb-10">

      {/* Language Toggle */}

    <LanguageToggle language={language} onChange={toggleLanguage} />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={blogSchema}
        onSubmit={(values) => {
          console.log("Formatted Payload:", values);

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
                toggleLanguage(l); 
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
                value={values.category[lang]}
                onChange={(val) => setFieldValue(`category.${lang}`, val)}
                placeholder={lang==='en'?"Select category":"श्रेणी चुनें"}
                error={touched.category?.[lang] ? errors.category?.[lang] : ""}
                disabled={isView}
              />


              {/* Tags (shared across languages) */}
              <MultiInputList
                label={`${lang === "en" ? "Tags" : "टैग"}`}
                values={values.tags[lang]}
                onChange={(newTags: string) => setFieldValue(`tags.${lang}`, newTags)}
                placeholder={lang === "en" ? "Add a tag" : "टैग जोड़ें"}
                isView={isView}
                error={touched.tags?.[lang] && errors.tags?.[lang] ? [String(errors.tags?.[lang])] : undefined}
              />


              {/* Key Points (language-specific array of objects) */}
              <MultiInputList
                label={`${lang === "en" ? "Key Points" : "मुख्य बिंदु"}`}
                values={values.keyPoints[lang]}
                onChange={(newKeyPoints: string) => setFieldValue(`keyPoints.${lang}`, newKeyPoints)}
                placeholder={lang === "en" ? "Add a key point" : "मुख्य बिंदु जोड़ें"}
                isView={isView}
                error={touched.keyPoints?.[lang] && errors.keyPoints?.[lang] ? [String(errors.keyPoints?.[lang])] : undefined}
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
                error={(touched.images && errors.images) || (touched as any).existingImages && (errors as any).existingImages ? (errors as any).images || (errors as any).existingImages : ""}
                onChange={(files, existingUrls) => {
                  setFieldValue("images", files);
                  setFieldValue("existingImages", existingUrls);
                }}
                uploadType="multiple"
                disabled={isView}
                mode={mode}
                initialUrls={(() => {
                  const urls: string[] = [];
                  if (Array.isArray(values.existingImages)) {
                    urls.push(
                      ...values.existingImages.filter(
                        (img: any): img is string => typeof img === "string" && !!img
                      )
                    );
                  } else if (Array.isArray(initialData?.existingImages)) {
                    urls.push(
                      ...initialData.existingImages.filter(
                        (img: any): img is string => typeof img === "string" && !!img
                      )
                    );
                  }
                  return urls;
                })()}
                initialFiles={Array.isArray(values.images) ? values.images.filter((f:any) => f instanceof File) as File[] : []}
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
                    text={lang === "en" ? "Preview" : "पूर्वावलोकन"}
                  >  

                  </Button>

                  <CancelButton text={lang==='hi'?'रद्द करें':"Cancel"} onClose={onClose} />
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


