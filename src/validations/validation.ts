import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "First name is required").required(),
  lastName: Yup.string().min(2, "Last name is required").required(),
  email: Yup.string().email("Invalid email").required(),
  phone: Yup.string().min(10, "Phone must be at least 10 digits").required(),
  address: Yup.string().min(5, "Address is required").required(),
  message: Yup.string().optional(),
});

// ✅ use Yup.InferType instead of z.infer
export type FormValues = Yup.InferType<typeof formSchema>;
