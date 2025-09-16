"use client";
import { DetailsformSchema, FormValues } from "@/src/utils/validations/FormValidation";
import { Formik, Form } from "formik";
import InputField from "../common/inputs/InputField";
import Button from "../common/Buttons/Button";

const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
};

const DetailsForm = () => {
   const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("Form Submitted:", values);
    resetForm(); 
  };

    return (
        <div className="w-full mx-auto bg-white ">
            <h2 className="text-2xl font-bold mb-6">Details Information</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={DetailsformSchema}   
                onSubmit={handleSubmit}
            >
                {() => (
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
                        <Button  text="Save Information" hoverBg='before:bg-foreground' />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DetailsForm;
