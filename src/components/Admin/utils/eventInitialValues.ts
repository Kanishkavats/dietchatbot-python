import { EventFormValues } from "@/src/utils/validations/FormValidation";
export const getInitialEventValues = (initialData: any): EventFormValues =>( {
    title: {
    en: initialData?.title?.en ?? "",
    hi: initialData?.title?.hi ?? "",
  }, 
  category: {
    en: initialData?.category?.en ?? "",
    hi: initialData?.category?.hi ?? "",
  },
  description: {
    en: initialData?.description?.en ?? "",
    hi: initialData?.description?.hi ?? "",
  },
  summary: {
    en: initialData?.summary?.en ?? "",
    hi: initialData?.summary?.hi ?? "",
  },
  keyPoints: {
    en: initialData?.keyPoints?.en ?? [],
    hi: initialData?.keyPoints?.hi ?? [],
  },
  images: initialData?.images ?? [],

   location: {
    en: initialData?.location?.en ?? "",
    hi: initialData?.location?.hi ?? "",
  },
  });