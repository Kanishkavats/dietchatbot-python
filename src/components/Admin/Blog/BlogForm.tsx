"use client";

import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import Dropdown from "../Common/Dropdown";

import { useFetchCategory } from "@/src/hooks/useCategory";
import { BlogFormValues, blogSchema } from "@/src/utils/validations/FormValidation";
import { BlogFormProps } from "@/src/types/blog";
import { createBlog, updateBlog } from "@/src/services/blogApi";
import MultiInputList from "../Common/MultiInputList";
import { submitBlogForm } from "@/src/hooks/useBlog";

const BlogForm = ({ initialData, onClose, mode }: BlogFormProps) => {
    //  Initial values
    const initialValues: BlogFormValues = {
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        summary: initialData?.summary ?? "",
        quote: initialData?.quote ?? "",
        quoteAuthor: initialData?.quoteAuthor ?? "",
        category: initialData?.category ?? "",
        tags: initialData?.tags ?? [],
        keyPoints: initialData?.keyPoints ?? [],
        location: initialData?.location ?? "",
        images: initialData?.images ?? [],
        existingImages:
            initialData?.images?.filter((img: string | File): img is string => typeof img === "string") ?? [],
    };

    const [tagsList, setTagsList] = useState<string[]>(initialData?.tags ?? []);

    const [keyPointsList, setKeyPointsList] = useState<string[]>(initialData?.keyPoints ?? []);

    const { data: categoryData } = useFetchCategory();
    const categoryOptions =
        categoryData?.category?.map((c: { id: string; name: string }) => ({
            label: c.name,
            value: c.name,
        })) || [];

    console.log(categoryOptions)

    // ✅ Mutations
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: { id: string; values: BlogFormValues }) =>
            updateBlog(data.id, data.values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });

    // ✅ Mode helpers
    const isView = mode === "view";
    const isEdit = mode === "edit";

    return (
        <div className="w-full pb-10">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={blogSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    submitBlogForm(
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
                        setFieldValue("tags", tagsList, true);
                        setFieldValue("keyPoints", keyPointsList, true);
                    }, [tagsList, keyPointsList, setFieldValue]);

                    return (
                        <Form className="flex flex-col gap-3">
                            {/* Title */}
                            <CustomInput
                                label="Title*"
                                placeholder="Title of the blog"
                                value={values.title}
                                name="title"
                                onChange={handleChange}
                                error={touched.title ? errors.title : ""}
                                disabled={isView}
                            />

                            {/* Description */}
                            <CustomInput
                                label="Description*"
                                as="textarea"
                                placeholder="Detailed description of the blog"
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
                                placeholder="Short summary of the blog"
                                value={values.summary}
                                name="summary"
                                onChange={handleChange}
                                error={touched.summary ? errors.summary : ""}
                                disabled={isView}
                            />

                            {/* Quote */}
                            <CustomInput
                                label="Quote*"
                                placeholder="Inspiring quote for the blog"
                                value={values.quote}
                                name="quote"
                                onChange={handleChange}
                                error={touched.quote ? errors.quote : ""}
                                disabled={isView}
                            />

                            {/* Quote Author */}
                            <CustomInput
                                label="Quote Author*"
                                placeholder="Author of the quote"
                                value={values.quoteAuthor}
                                name="quoteAuthor"
                                onChange={handleChange}
                                error={touched.quoteAuthor ? errors.quoteAuthor : ""}
                                disabled={isView}
                            />

                            {/* Category */}
                            <Dropdown
                                label="Category*"
                                options={categoryOptions}
                                value={values.category}
                                onChange={(val) => setFieldValue("category", val)}
                                placeholder="Select category"
                                error={touched.category ? errors.category : ""}
                                disabled={isView}
                            />

                            {/* Tags */}
                            <MultiInputList
                                label="Tags"
                                values={tagsList}
                                onChange={setTagsList}
                                placeholder="Add a tag"
                                isView={isView}
                            />

                            {/* Key Points */}
                            <MultiInputList
                                label="Key Points"
                                values={keyPointsList}
                                onChange={setKeyPointsList}
                                placeholder="Add a key point"
                                isView={isView}
                                colorClass={{ normal: "bg-blue-200 text-blue-800", view: "bg-gray-100 text-gray-600" }}
                            />


                            {/* Location */}
                            <CustomInput
                                label="Location*"
                                placeholder="Location of the blog"
                                value={values.location}
                                name="location"
                                onChange={handleChange}
                                error={touched.location ? errors.location : ""}
                                disabled={isView}
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
                                disabled={isView}
                                mode={mode}
                                initialUrls={
                                    Array.isArray(initialData?.images)
                                        ? initialData.images.filter((img: string | File): img is string => typeof img === "string")
                                        : []
                                }
                            />

                            {/* Action Buttons */}
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
                    );
                }}
            </Formik>
        </div>
    );
};

export default BlogForm;
