import * as Yup from "yup";

export const DetailsformSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "First name is required").required(),
  lastName: Yup.string().min(2, "Last name is required").required(),
  email: Yup.string().email("Invalid email").required(),
  phone: Yup.string().min(10, "Phone must be at least 10 digits").required(),
  address: Yup.string().min(5, "Address is required").required(),
  message: Yup.string().optional(),
});

export type FormValues = Yup.InferType<typeof DetailsformSchema>;

export const volunteerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  occupation: Yup.string().required("Occupation is required"),
  message: Yup.string().required("Message is required"),
});

export type VolunteerValues = Yup.InferType<typeof volunteerSchema >



export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});


export type loginValues = Yup.InferType<typeof loginSchema >