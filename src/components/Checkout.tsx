 "use client";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";

// import InputField from "../common/Input/InputField";

import Button from "./common/Buttons/Button";



import { DetailsformSchema, DetailsFormValues } from "@/src/utils/validations/FormValidation";
import { DetailsInformationForm } from "@/src/services/webForms";
import toast from "react-hot-toast";
import ButtonLoader from "./common/Loader/ButtonLoader";
import InputField from "./common/inputs/InputField";
const initialValues: DetailsFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
};
const DetailsForm = () => {
    const mutation = useMutation({
        mutationFn: DetailsInformationForm,
        onSuccess: () => {
            toast.success("Form submitted successfully!");
        },
        onError: (error: any) => {
            toast.error("Something went wrong. Try again.");
            console.error("Submission error:", error);
        },
    });
    const handleSubmit = (
        values: DetailsFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        mutation.mutate(values, {
            onSuccess: () => {
                resetForm();
            },
        });
    };
    return (
        <div className="w-full mx-auto bg-white">
            <h2 className="text-2xl font-bold mb-6">Details Information</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={DetailsformSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField name="firstName" placeholder="First Name" icon="mdi:account" />
                            <InputField name="lastName" placeholder="Last Name" icon="mdi:account" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField name="email" placeholder="Your Email" icon="mdi:email" />
                            <InputField name="phone" placeholder="Your Number" icon="mdi:phone" />
                        </div>
                        <InputField name="address" placeholder="Your Address" icon="mdi:map-marker" />
                        <InputField
                            name="message"
                            placeholder="Your message..."
                            icon="mdi:email-outline"
                            as="textarea"
                        />
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            hoverBg="before:bg-foreground"
                        >
                            {isSubmitting || mutation.isPending ? <ButtonLoader /> : "Save Information"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default DetailsForm; 