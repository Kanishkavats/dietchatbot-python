import * as Yup from "yup";

// Existing schemas here...
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

export type VolunteerValues = Yup.InferType<typeof volunteerSchema>;

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export type loginValues = Yup.InferType<typeof loginSchema>;

// ======================= Register validation  =======================
export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be digits only")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type registerValues = Yup.InferType<typeof registerSchema>;

// ======================= Campaign =======================

export const campaignSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  goalAmount: Yup.number().min(1, "Goal must be at least 1").required(),
  summary: Yup.string().required("Summary is required"),
  keyPoints: Yup.array().of(Yup.string().required()).min(1, "Add at least one key point"),
  images: Yup.array().of(Yup.mixed()).min(1, "Images are required"),
  existingImages: Yup.array().of(Yup.string()),
  location: Yup.string().required("Location is required"),
});


export type CampaignFormValues = Yup.InferType<typeof campaignSchema>;

// ======================= Category =======================
export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});

export type CategoryFormValues = Yup.InferType<typeof categorySchema>;



// ======================= Blog =======================

export const blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  creator: Yup.string().required("creator is required"),
  description: Yup.string().required("Description is required"),
  summary: Yup.string().required("Summary is required"),
  quote: Yup.string().required("Quote is required"),
  quoteAuthor: Yup.string().required("Quote Author is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array().of(Yup.string().required()).min(1, "Add at least one tag"),
  keyPoints: Yup.array()
    .of(Yup.string().required())
    .min(1, "Add at least one key point"),
  location: Yup.string().required("Location is required"),
  images: Yup.array().of(Yup.mixed()).min(1, "At least one image is required"),
  existingImages: Yup.array().of(Yup.string()),
});

export type BlogFormValues = Yup.InferType<typeof blogSchema>;

