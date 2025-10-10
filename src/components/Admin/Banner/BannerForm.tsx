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
import LanguageToggle from "../Common/LanguageToggle";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import { hasErrorsForLang } from "../Common/hasErrorsForLang";

const BannerForm = ({
  initialData,
  onClose,
  mode,
  createMutation,
  updateMutation,
  onPreview
}: BannerFormProps) => {
  const{language,toggleLanguage}=useLanguageToggle();
  const isView = mode === "view";
  const isEdit = mode === "edit";
  
  const initialValues: BannerFormValues & { existingImage?: string } = {
    title: {
    en: initialData?.title?.en ?? "",
    hi: initialData?.title?.hi ?? "",
  }, 
   subtitle: {
    en: initialData?.subtitle?.en ?? "",
    hi: initialData?.subtitle?.hi ?? "",
  }, 
    image: initialData?.image || "", 
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
      <LanguageToggle language={language} onChange={toggleLanguage} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={bannerSchema}
        onSubmit={(values: BannerFormValues) => {
                console.log("reached")
                  const payload = { ...values };
                  onPreview?.(payload);
                }}
      >
        {({ values, handleChange, setFieldValue,setTouched,errors, touched, isSubmitting,validateForm,submitForm }) => {
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
                    
                                if (formErrors.image) {
                                  return;
                                }
                    
                                submitForm();
                              };
          return(
          <Form className="flex flex-col gap-3">

            {/* Title */}
            <CustomInput
              label={`${lang === "en" ? "Title" : "शीर्षक"}*`}
                placeholder={lang === "en" ? "Enter banner title" : "बैनर शीर्षक दर्ज करें"}
              name={`title.${lang}`}
              value={values.title?.[lang]}
              onChange={handleChange}
              error={touched.title?.[lang] ? errors.title?.[lang] : ""}
            />

            {/* Subtitle */}
            <CustomInput
            label={`${lang === "en" ? "Subtitle" : "उपशीर्षक"}*`}
                placeholder={lang === "en" ? "Enter banner subtitle" : "बैनर उपशीर्षक दर्ज करें"}
              name={`subtitle.${lang}`}
              value={values.subtitle?.[lang]}
              onChange={handleChange}
              error={touched.subtitle?.[lang] ? errors.subtitle?.[lang] : ""}
            />
            <CustomInput
            label={`${lang === "en" ? "Priority" : "प्राथमिकता"}*`}
                placeholder={lang === "en" ? "Enter banner Priority" : "बैनर प्राथमिकता दर्ज करें"}
              name="priority"
              value={values.priority}
              onChange={handleChange}
              error={touched.priority ? errors.priority : ""}
            />

            {/* Banner Image */}
            <CustomFileInput
            label={`${lang === "en" ? "Image" : "छवि"}*`}
              name="image"
              mode={mode}
              initialUrls={
  initialData?.image
  ? Array.isArray(initialData.image)
    ? initialData.image.map(img => 
        typeof img === "string" ? img : URL.createObjectURL(img)
      )
    : [
        typeof initialData.image === "string"
          ? initialData.image
          : URL.createObjectURL(initialData.image)
      ]
  : []
}
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
                                  {isSubmitting ? (
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
        )}}
      </Formik>
    </div>
  );
};

export default BannerForm;
