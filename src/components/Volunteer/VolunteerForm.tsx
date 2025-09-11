"use client";

import { Formik, Form } from "formik";
import InputField from "../common/inputs/InputField";
import Button from "../common/Buttons/Button";
import { volunteerSchema, VolunteerValues } from "@/src/utils/validations/FormValidation";

// ✅ Initial values
const initialValues: VolunteerValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  occupation: "",
  message: "",
};

const VolunteerForm = () => {
  const handleSubmit = (
    values: VolunteerValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Volunteer Form Submitted:", values);
    resetForm();
  };

  return (
    <div className="w-full mx-auto bg-white px-3 xl:px-8 py-6 xl:py-10 rounded-lg  border border-gray-200">
      {/* Heading */}
      <h2 className="text-sm xl:text-3xl font-nunito font-bold mb-2">Fill Up The Form</h2>
      <p className="mt-4 mb-12 text-gray-500 text-[15px] leading-5 xl:max-w-[70%]">
        Your Email Address Will Not Be Published. Required Fields Are Marked *
      </p>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={volunteerSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                name="firstName"
                placeholder="First Name"
                icon="mdi:account"
              />
              <InputField
                name="lastName"
                placeholder="Last Name"
                icon="mdi:account"
              />
            </div>

            {/* Email */}
            <InputField
              name="email"
              placeholder="Enter Email"
              icon="mdi:email"
              type="email"
            />

            {/* Phone + Occupation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="phone"
                placeholder="Phone Number"
                icon="mdi:phone"
              />
              <InputField
                name="occupation"
                placeholder="Occupation"
                icon="mdi:person-tie"
              />
            </div>

            {/* Message */}
            <InputField
              name="message"
              placeholder="Your message..."
              icon="mdi:chat"
              as="textarea"
            />

            {/* Submit Button */}
            <div className="w-fit">

            <Button
              text="Submit Now"
              hoverBg="before:bg-foreground"
              />
              </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VolunteerForm;
