"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../common/inputs/InputField";
import Button from "../common/Buttons/Button";

import { FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

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

const ContactFormSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
    const handleSubmit = (
        values: ContactFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        console.log("Form submitted:", values);
        resetForm();
    };

    return (
        <div className="w-full mx-auto bg-white">
            <Formik
                initialValues={initialValues}
                validationSchema={ContactFormSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="space-y-6">
                        {/* Name */}
                        <InputField
                            name="name"
                            placeholder="Enter Name"
                            icon={<FaUser className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Email */}
                        <InputField
                            name="email"
                            placeholder="Enter Email"
                            icon={<FiMail className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Phone */}
                        <InputField
                            name="phone"
                            placeholder="Phone Number"
                            icon={<FaPhoneAlt className="text-gray-500 ml-3" />}
                            wrapperClass="flex items-center bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm"
                        />

                        {/* Message */}
                        <InputField
                            name="message"
                            as="textarea"
                            rows={4}
                            placeholder="Your Message..."
                            icon="fa6-solid:comments"
                            wrapperClass="flex items-start bg-gray-200 rounded-lg mb-6 p-3"
                            inputClass="flex-1 bg-transparent border-none outline-none px-2 text-sm resize-none"
                        />

                        {/* Submit Button */}
                        <Button
                            text="Get A Quote"
                            hoverBg="before:bg-foreground"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
