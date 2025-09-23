"use client";

import { Formik, Form } from "formik";
import React, { useState } from "react";
import { MemberFormProps } from "@/src/types/members";
import { MemberFormValues, memberSchema } from "@/src/utils/validations/FormValidation";

import Button from "../../common/Buttons/Button";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import CustomInput from "../../Admin/Common/CustomInput";
import CustomFileInput from "../../Admin/Common/CustomFileInput";
import MultiInputList from "../Common/MultiInputList";
import CancelButton from "../../common/Buttons/CancelButton";

const MemberForm = ({
    initialData,
    onClose,
    mode,
    onPreview,
    createMutation,
    updateMutation,
}: MemberFormProps) => {
    const initialValues: MemberFormValues & { existingImage?: string } = {
        name: initialData?.name ?? "",
        position: initialData?.position ?? "",
        description: initialData?.description ?? "",
        about: initialData?.about ?? "",
        title: initialData?.title ?? "",
        keyPoints: initialData?.keyPoints ?? [],
        image: initialData?.image ?? "",
        existingImage:
            typeof initialData?.image === "string" ? initialData.image : undefined,
        facebookUrl: initialData?.facebookUrl ?? "",
        twitterUrl: initialData?.twitterUrl ?? "",
        instagramUrl: initialData?.instagramUrl ?? "",
        linkedInUrl: initialData?.linkedInUrl ?? "",
    };


    const [keyPointsList, setKeyPointsList] = useState<string[]>(
        initialData?.keyPoints ?? []
    );

    const isEdit = mode === "edit";

    return (
        <div className="w-full pb-10">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={memberSchema}
                onSubmit={(values) => {
                    onPreview &&
                        onPreview({
                            ...values,
                            keyPoints: keyPointsList,
                        });
                }}
            >
                {({
                    values,
                    handleChange,
                    setFieldValue,
                    errors,
                    touched,
                    isSubmitting,
                }) => {
                    React.useEffect(() => {
                        setFieldValue("keyPoints", keyPointsList, true);
                    }, [keyPointsList, setFieldValue]);

                    return (
                        <Form className="flex flex-col gap-3">
                            {/* Name */}
                            <CustomInput
                                label="Name*"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                error={touched.name ? errors.name : ""}
                            />

                            {/* Position */}
                            <CustomInput
                                label="Position*"
                                name="position"
                                value={values.position}
                                onChange={handleChange}
                                placeholder="Member position"
                                error={touched.position ? errors.position : ""}
                            />

                            {/* Title */}
                            <CustomInput
                                label="Title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                placeholder="Optional title"
                                error={touched.title ? errors.title : ""}
                            />

                            {/* Description */}
                            <CustomInput
                                label="Description*"
                                name="description"
                                as="textarea"
                                value={values.description}
                                onChange={handleChange}
                                placeholder="Short description"
                                error={touched.description ? errors.description : ""}
                            />

                            {/* About */}
                            <CustomInput
                                label="About"
                                name="about"
                                as="textarea"
                                value={values.about}
                                onChange={handleChange}
                                placeholder="Optional about section"
                                error={touched.about ? errors.about : ""}
                            />

                            {/* Key Points */}
                            <MultiInputList
                                label="Key Points"
                                values={keyPointsList}
                                onChange={setKeyPointsList}
                                placeholder="Add a key point"
                            />

                            {/* Image Upload */}
                            <CustomFileInput
                                label="Profile Image*"
                                name="image"
                                error={touched.image && typeof errors.image === "string" ? errors.image : ""}
                                onChange={(files, existingUrl) => {
                                    setFieldValue("image", files[0]);
                                    setFieldValue("existingImage", existingUrl);
                                }}
                                mode={mode}
                                initialUrls={initialData?.image ? [initialData.image] : []}


                            />


                            {/* Social Links */}
                            <CustomInput
                                label="Facebook URL"
                                name="facebookUrl"
                                value={values.facebookUrl ?? ""}
                                onChange={handleChange}
                                placeholder="https://facebook.com/..."
                                error={touched.facebookUrl ? errors.facebookUrl : ""}
                            />

                            <CustomInput
                                label="Twitter URL"
                                name="twitterUrl"
                                value={values.twitterUrl ?? ""}
                                onChange={handleChange}
                                placeholder="https://twitter.com/..."
                                error={touched.twitterUrl ? errors.twitterUrl : ""}
                            />

                            <CustomInput
                                label="Instagram URL"
                                name="instagramUrl"
                                value={values.instagramUrl ?? ""}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                                error={touched.instagramUrl ? errors.instagramUrl : ""}
                            />

                            <CustomInput
                                label="LinkedIn URL"
                                name="linkedInUrl"
                                value={values.linkedInUrl ?? ""}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                error={touched.linkedInUrl ? errors.linkedInUrl : ""}
                            />

                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-4">
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        createMutation.isPending ||
                                        updateMutation.isPending
                                    }
                                    bgColor="bg-lime-green"
                                    paddingx="px-4"
                                    paddingy="py-2"
                                    rounded="rounded-[5px]"
                                >
                                    {isSubmitting ||
                                        createMutation.isPending ||
                                        updateMutation.isPending ? (
                                        <ButtonLoader />
                                    ) : isEdit ? (
                                        "Update"
                                    ) : (
                                        "Preview"
                                    )}
                                </Button>
                                <CancelButton text="Cancel" onClose={onClose} />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default MemberForm;
