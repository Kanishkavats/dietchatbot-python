/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/inputs/InputField";
import Button from "../common/Buttons/Button";

import { FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { ContactUsForm } from "@/src/services/webForms";
import toast from "react-hot-toast";
import ButtonLoader from "../common/Loader/ButtonLoader";

export interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const initialValues: ContactFormValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

const ContactForm = () => {

    const { t } = useTranslation();
    const ContactFormSchema = Yup.object({
        name: Yup.string().required(t("Name is required")),
        email: Yup.string().email(t("Invalid email")).required(t("Email is required")),
        phone: Yup.string().required(t("Phone number is required")).length(10, t("Phone number must be 10 digits")),
        message: Yup.string().required(t("Message is required")),
    });

    const ContactformMutation = useMutation({
        mutationFn: ContactUsForm,
        onSuccess: () => {
            toast.success("Message sent successfully!");
        },
        onError: (error:any)=>{
            toast.error("Something went wrong. Try again.");
            console.error("Submission error:", error);
        }
    })
    const handleSubmit = (
        values: ContactFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        ContactformMutation.mutate(values, {onSuccess:()=>{resetForm();}})
    };

    return (
        <div className="w-full mx-auto bg-white ">
            <Formik
                initialValues={initialValues}
                validationSchema={ContactFormSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-9">
                        {/* Name */}
                        <InputField
                            name="name"
                            placeholder={t("Enter Name")}
                            icon={<FaUser className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Email */}
                        <InputField
                            name="email"
                            placeholder={t("Enter Email")}
                            icon={<FiMail className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Phone */}
                        <InputField
                            name="phone"
                            placeholder={t("Phone Number")}
                            icon={<FaPhoneAlt className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Message */}
                        <InputField
                            name="message"
                            as="textarea"
                            rows={4}
                            placeholder={t("Your Message...")}
                            icon="fa6-solid:comments"
                            wrapperClass="flex items-start bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm resize-none"
                        />

                        {/* Submit Button */}
                        <div className="w-fit">

                            <Button
                                type="submit"
                                text={t("Get A Quote")}
                                hoverBg="before:bg-foreground"
                                paddingy="py-5"
                            > 
                            {isSubmitting ? <ButtonLoader /> : t("Get A Quote")}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
