import { UseMutationResult } from "@tanstack/react-query";
import { CampaignFormValues, CategoryFormValues } from "../utils/validations/FormValidation";
import { Category } from "./category";

// export interface Campaign {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   goalAmount: number;
//   summary: string;
//   organizer: string;
//   raisedAmount: number;
//   status: string;
//   startDate: string;
//   endDate: string;
//   images?: (string | File)[];
//   imageUrl?: string[]; 
//   location: string;
// }
export interface Campaign {
  id: number;
  title: { en: string; hi: string };
  category: { en: string; hi: string };
  description: { en: string; hi: string };
  goalAmount: number;
  summary: { en: string; hi: string };
  organizer: string;
  raisedAmount: number;
  status: string;
  startDate: string;
  endDate: string;
  images?: { en?: (string | File)[]; hi?: (string | File)[] }; // multilingual images
  existingImages?: { en?: string[]; hi?: string[] };
  location: { en: string; hi: string };
  keyPoints: { en: string[]; hi: string[] }; // multilingual key points
}


export interface CampaignFormProps {
  initialData?: Partial<CampaignFormValues> & Partial<Campaign>;
  onClose: () => void;
  readOnly?: boolean; 
  mode?: "add" | "edit" | "view";
  onPreview?: (values: CampaignFormValues) => void;
  createMutation?: UseMutationResult<any, unknown, any, unknown>;
  updateMutation?: UseMutationResult<any, unknown, any, unknown>;
}

export interface CampaignColumnCallbacks {
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onView: (campaign: Campaign) => void;
}

export interface ActionItem<RowType> {
  label: string;
  icon: React.ReactNode;
  onClick: (row: RowType) => void;
  colorClass?: string; 
}

export interface TableRowActionsProps<RowType> {
  row: RowType;
  actions: ActionItem<RowType>[];
  className?: string;
}

export interface CategoryFormProps {
  initialData?: Partial<CategoryFormValues> & Partial<Category>;
  onClose: () => void;
  readOnly?: boolean;
  mode?: "add" | "edit" | "view";
}

export interface CategoryColumnCallbacks {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (category: Category) => void;
}
