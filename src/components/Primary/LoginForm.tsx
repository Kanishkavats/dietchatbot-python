"use client";

import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import InputField from "../common/inputs/InputField";
import Button from "../common/Buttons/Button";
import { loginUser } from "@/src/services/authApi";
import { loginSchema, loginValues } from "@/src/utils/validations/FormValidation";
import Cookies from "js-cookie";


const initialValues: loginValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
 const { mutate, isPending, error } = useMutation({
  mutationFn: loginUser,
  onSuccess: (data) => {
    Cookies.set("token", data.token, { expires: 7, path: "/" });
    window.location.href = "/dashboard";
  },
});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {/* Email */}
          <InputField name="email" type="email" placeholder="Your Email" icon="mdi:email" />

          {/* Password */}
          <InputField name="password" type="password" placeholder="Password" icon="mdi:lock" />

          {/* Submit button */}
          <Button
            text={isPending || isSubmitting ? "Signing in..." : "Sign In"}
            hoverBg="before:bg-[var(--green)]"
            disabled={isPending || isSubmitting}
          />

          {/* API error */}
          {error && (
            <p className="text-[var(--red)] text-center text-sm mt-2">
              {(error as any).message || "Login failed"}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
