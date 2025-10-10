import { UseMutationResult } from "@tanstack/react-query";
import { BannerFormValues } from "../utils/validations/FormValidation"; // Assuming you have this schema like Blog

export type BannerSearchField = "title" | "subtitle"; // Add more if needed

// Banner - used in <BannerTable />
export interface Banner {
    id?: string;
    title: string;
    subtitle: string;
    image: string;
    priority: number;
}
// Banner Form Props - used in <BannerForm />
export interface BannerFormProps {
  initialData?: Partial<BannerFormValues> & Partial<Banner>;
  onClose: () => void;
  mode?: "add" | "edit"| "view"; 
  onPreview?: (values: BannerFormValues) => void;
  createMutation: UseMutationResult<any, Error, BannerFormValues, unknown>;
  updateMutation: UseMutationResult<any, Error, { id: string; values: BannerFormValues }, unknown>;
}
// Banner Column Callbacks - used in getBannerColumns.ts
export interface BannerColumnCallbacks {
  onEdit: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
  onView?: (banner: Banner) => void; 
}
