import * as Yup from "yup";

// Existing schemas here...


export const DetailsformSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "First name is required").required(),
  lastName: Yup.string().min(2, "Last name is required").required(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required(),
  address: Yup.string().min(5, "Address is required").required(),
  message: Yup.string().required("Message is required"),
});
export type DetailsFormValues = Yup.InferType<typeof DetailsformSchema>;

export type FormValues = Yup.InferType<typeof DetailsformSchema>;

export const SendMsgformSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  phone: Yup.string().min(10, "Phone must be at least 10 digits").required(),
  address: Yup.string().min(5, "Address is required").required(),
  message: Yup.string().min(20,"Message must be of 20 Words").required("Message is required"),
});

export type SendMsgFormValues = Yup.InferType<typeof SendMsgformSchema>;

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

// ======================= Comment =======================

export const commentSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  comment: Yup.string().notRequired(),
  email: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["pending", "approved", "rejected"], "Invalid status")
    .required("Status is required"),
});

export type CommentFormValues = Yup.InferType<typeof commentSchema>;

// ======================= Banner ======================

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  image: Yup.mixed()
    .test(
      "fileOrString",
      "Banner image is required",
      value => {
        if (typeof value === "string" && value.trim() !== "") return true;
        if (value instanceof File) return true;
        return false;
      }
    )
    .required("Banner image is required"),
  priority: Yup.number().required("priority is required"),
});

//  Inferred type from the schema
export type BannerFormValues = Yup.InferType<typeof bannerSchema>;


// ======================= Member ======================

export const memberSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  title: Yup.string().optional(),
  description: Yup.string().required("Description is required"),
  about: Yup.string().optional(),
  keyPoints: Yup.array().of(Yup.string().required("Key point cannot be empty")),
  image: Yup.mixed()
    .test(
      "fileOrString",
      "Image is required",
      (value) => {
        if (typeof value === "string" && value.trim() !== "") return true;
        if (value instanceof File) return true;
        return false;
      }
    )
    .required("Image is required"),
  facebookUrl: Yup.string().url("Must be a valid URL").optional().nullable(),
  twitterUrl: Yup.string().url("Must be a valid URL").optional().nullable(),
  instagramUrl: Yup.string().url("Must be a valid URL").optional().nullable(),
  linkedInUrl: Yup.string().url("Must be a valid URL").optional().nullable(),
  existingImages: Yup.array().of(Yup.string()),
});

export type MemberFormValues = Yup.InferType<typeof memberSchema>;
