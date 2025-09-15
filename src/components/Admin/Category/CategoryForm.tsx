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

const CategoryForm = ({ initialData, onClose, mode }: CategoryFormProps) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

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
  const initialValues: CategoryFormValues = {
    name: initialData?.name ?? "",
  };

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
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={categorySchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmit(values, resetForm, setSubmitting)
        }
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <CustomInput
              label="Category Name*"
              placeholder="Enter category name"
              value={values.name}
              name="name"
              onChange={handleChange}
              error={touched.name ? errors.name : ""}
              disabled={isView}
            />

            {!isView && (
              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
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
                <Button
                  type="button"
                  text="Cancel"
                  onClick={onClose}
                  bgColor="bg-gray-500"
                  hoverBg="before:bg-gray-700"
                  textColor="text-white"
                  paddingx="px-4"
                  paddingy="py-2"
                  rounded="rounded-[5px] "
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;
