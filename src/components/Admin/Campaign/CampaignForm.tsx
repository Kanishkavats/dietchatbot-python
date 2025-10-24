"use client";

import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { useFetchCategory } from "@/src/hooks/admin/useCategory";
import { CampaignFormValues, campaignSchema } from "@/src/utils/validations/FormValidation";
import CustomInput from "../../UI/admin/CustomInput";
import CustomFileInput from "../../UI/admin/CustomFileInput";
import Dropdown from "../../UI/admin/Dropdown";
import { Category } from "@/src/types/web/category";
import LanguageToggle from "../../UI/admin/LanguageToggle";
import { getInitialCanpaignValues } from "../utils/campaignIntialValues";
import MultiInputList from "../../UI/admin/MultiInputList";
import { hasErrorsForLang } from "../../UI/admin/hasErrorsForLang";
import ButtonLoader from "../../UI/web/Loader/ButtonLoader";
import Button from "../../UI/web/Buttons/Button";
import CancelButton from "../../UI/web/Buttons/CancelButton";
import { CampaignFormProps } from "@/src/types/admin/campaign";
import { useLanguageToggle } from "@/src/hooks/admin/useLanguageToggle";

const CampaignForm = ({ initialData, onClose, mode, onPreview }: CampaignFormProps) => {

  const initialValues = getInitialCanpaignValues(initialData)
  
  const { language, toggleLanguage } = useLanguageToggle();
  const [categories, setCategories] = useState<{ en?: any[]; hi?: any[] }>({});
  const { data: categoryData } = useFetchCategory();

  useEffect(() => {
    if (categoryData?.category) {
      setCategories((prev) => ({
        ...prev,
        [language]: categoryData.category,
      }));
    }
  }, [categoryData, language]);

  const mergedCategories =
    categoryData?.category?.map((cat: any) => ({
      label: cat.name[language],
      value: cat.name,
      names: cat.name,
    })) || [];

  const isView = mode === "view";
  const isEdit = mode === "edit";
  console.log(initialData)
  console.log(categoryData)
  return (
    <div className="w-full pb-10">
      <LanguageToggle language={language} onChange={toggleLanguage} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={campaignSchema}
        onSubmit={(values: CampaignFormValues) => {
          const payload  = { ...values };
          onPreview?.(payload);
        }}
      >
        {({ values,
          handleChange,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          validateForm,
          submitForm,
          setTouched }) => {
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
              <CustomInput
                label={`${lang === "en" ? "Title" : "शीर्षक"}*`}
                placeholder={lang === "en" ? "Title of the campaign" : "अभियान का शीर्षक"}
                value={values.title[lang]}
                name={`title.${lang}`}
                onChange={handleChange}
                error={touched.title?.[lang] ? errors.title?.[lang] : ""}
                disabled={isView}
              />

              <Dropdown
                label={lang === "en" ? "Category" : "श्रेणी"}
                options={mergedCategories}
                value={values.category || ""}
                onChange={(val) => {
                  const selected = mergedCategories.find((opt:{ value: { en: string; hi: string; }; names: { en: string; hi: string; }; }) => opt.value === val);
                  if (selected) {
                    setFieldValue("category", {
                      id: val,
                      en: selected.names.en,
                      hi: selected.names.hi,
                    });
                  }
                }}
                placeholder={lang === "en" ? "Select category" : "श्रेणी चुनें"}
                width="w-full"
                error={touched.category && (errors.category as any)?.id ? (errors.category as any).id : ""}
              />

              <CustomInput
                label={`${lang === "en" ? "Location" : "स्थान"}*`}
                placeholder={lang === "en" ? "Location of the campaign" : "अभियान का स्थान"}
                value={values.location[lang]}
                name={`location.${lang}`}
                onChange={handleChange}
                error={touched.location?.[lang] ? errors.location?.[lang] : ""}
                disabled={isView}
              />

              <CustomInput
                label={`${lang === "en" ? "Goal Amount" : "लक्ष्य राशि"}*`}
                type="number"
                placeholder={lang === "en" ? "Enter goal amount" : "लक्ष्य राशि दर्ज करें"}
                value={values.goalAmount}
                name="goalAmount"
                onChange={handleChange}
                error={touched.goalAmount ? errors.goalAmount : ""}
                disabled={isView}
              />

              <CustomInput
                label={`${lang === "en" ? "Description" : "विवरण"}*`}
                as="textarea"
                placeholder={lang === "en" ? "Campaign description" : "अभियान का विवरण"}
                value={values.description[lang]}
                name={`description.${lang}`}
                onChange={handleChange}
                error={touched.description?.[lang] ? errors.description?.[lang] : ""}
                disabled={isView}
              />

              <CustomInput
                label={`${lang === "en" ? "Summary" : "सारांश"}*`}
                as="textarea"
                placeholder={lang === "en" ? "Short summary" : "संक्षिप्त सारांश"}
                value={values.summary[lang]}
                name={`summary.${lang}`}
                onChange={handleChange}
                error={touched.summary?.[lang] ? errors.summary?.[lang] : ""}
                disabled={isView}
              />

              {/* Key Points */}
              <MultiInputList
                label={`${lang === "en" ? "Key Points" : "मुख्य बिंदु"}`}
                values={values.keyPoints[lang]}
                onChange={(newPoints : string[]) => setFieldValue(`keyPoints.${lang}`, newPoints)}
                placeholder={lang === "en" ? "Add a key point" : "मुख्य बिंदु जोड़ें"}
                isView={isView}
              // error={touched.keyPoints?.[lang] && errors.keyPoints?.[lang] ? errors.keyPoints?.[lang] : ""}
              />

              {/* Images */}
              <CustomFileInput
                label={lang === "en" ? "Campaign Images" : "अभियान की छवियाँ"}
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
                initialFiles={Array.isArray(values.images) ? values.images.filter((f: any) => f instanceof File) as File[] : []}
              />

              {/* Buttons */}
              {!isView && (
                <div className="flex gap-2 mt-4 w-fit">
                  <Button
                    type="button"
                    onClick={handlePreviewClick}
                    disabled={
                      isSubmitting
                      // isSubmitting || createMutation.isPending || updateMutation.isPending
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

                  <CancelButton text={lang === 'hi' ? 'इसे रद्द करें' : "Cancel"} onClose={onClose} />
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
