import { MemberFormValues } from "@/src/utils/validations/FormValidation";

export const getInitialMemberValues = (initialData: any): MemberFormValues => ({
  name: {
    en: initialData?.name?.en ?? "",
    hi: initialData?.name?.hi ?? "",
  },
  position: {
    en: initialData?.position?.en ?? "",
    hi: initialData?.position?.hi ?? "",
  },
  title: {
    en: initialData?.title?.en ?? "",
    hi: initialData?.title?.hi ?? "",
  },
  description: {
    en: initialData?.description?.en ?? "",
    hi: initialData?.description?.hi ?? "",
  },
  about: {
    en: initialData?.about?.en ?? "",
    hi: initialData?.about?.hi ?? "",
  },
  keyPoints: {
    en: initialData?.keyPoints?.en ?? [],
    hi: initialData?.keyPoints?.hi ?? [],
  },
  image: initialData?.image ?? "",
  existingImages: initialData?.existingImages ?? [],
  facebookUrl: initialData?.facebookUrl ?? "",
  twitterUrl: initialData?.twitterUrl ?? "",
  instagramUrl: initialData?.instagramUrl ?? "",
  linkedInUrl: initialData?.linkedInUrl ?? "",
});
