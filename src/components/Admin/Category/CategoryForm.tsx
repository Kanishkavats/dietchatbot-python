
"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../Common/CustomInput";
import { toast } from "react-hot-toast";
import { CategoryFormProps } from "@/src/types/campaign";
import { CategoryFormValues, categorySchema } from "@/src/utils/validations/FormValidation";
import { createCategory, updateCategory } from "@/src/services/categoryApi";
import CancelButton from "../../common/Buttons/CancelButton";
import LanguageToggle from "../Common/LanguageToggle";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import { getInitialCategoryValues } from "../utils/categoryInitialValues";
import { hasErrorsForLang } from "../Common/hasErrorsForLang";

const CategoryForm = ({ initialData, onClose, mode }: CategoryFormProps) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const { language, toggleLanguage } = useLanguageToggle();

  const queryClient = useQueryClient();

  // ✅ Mutations
  const createMutation = useMutation({
    mutationFn: (values: CategoryFormValues) => createCategory(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: CategoryFormValues }) =>
      updateCategory(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  // ✅ Formik initial values
  const initialValues = getInitialCategoryValues(initialData);

  const handleSubmit = (
    values: CategoryFormValues,
    resetForm: () => void,
    setSubmitting: (v: boolean) => void
  ) => {
    toast.dismiss();
    toast.loading(isEdit ? "Updating category..." : "Creating category...");

    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, values },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Category updated");
            resetForm();
            setSubmitting(false);
            onClose();
          },
          onError: (err: any) => {
            toast.dismiss();
            toast.error(err?.message || "Failed to update category");
            setSubmitting(false);
          },
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Category created");
          resetForm();
          setSubmitting(false);
          onClose();
        },
        onError: (err: any) => {
          toast.dismiss();
          toast.error(err?.message || "Failed to create category");
          setSubmitting(false);
        },
      });
    }
  };

  return (
    <div className="w-full pb-6">
      {/* Language Toggle */}
      <LanguageToggle language={language} onChange={toggleLanguage} />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={categorySchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmit(values, resetForm, setSubmitting)
        }
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

          const handleSubmitClick = async () => {
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

            submitForm();
          };
          
          return (
            <Form className="flex flex-col gap-3">
              <CustomInput
                label={`${lang === "en" ? "Category Name" : "श्रेणी का नाम"}*`}
                placeholder={lang === "en" ? "Enter category name" : "श्रेणी का नाम दर्ज करें"}
                value={values.name[lang]}
                name={`name.${lang}`}
                onChange={(e) => setFieldValue(`name.${lang}`, e.target.value)}
                error={touched.name?.[lang] ? errors.name?.[lang] : ""}
                disabled={isView}
              />

              {!isView && (
                <div className="flex gap-2 mt-2 w-fit">
                  <Button
                    type="button"
                    onClick={handleSubmitClick}
                    disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                    bgColor="bg-lime-green"
                    paddingx="px-4"
                    paddingy="py-2"
                    rounded="rounded-[5px] "
                  >
                    {isSubmitting || createMutation.isPending || updateMutation.isPending ? (
                      <ButtonLoader />
                    ) : isEdit ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                   <CancelButton
                      text="Cancel"
                      onClose={onClose}
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

export default CategoryForm;
