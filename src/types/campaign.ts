import { Campaign } from "../components/Admin/Data/staticData";
import { CampaignFormValues, CategoryFormValues } from "../utils/validations/FormValidation";
import { Category } from "./category";

export interface CampaignFormProps {
  initialData?: Partial<CampaignFormValues> & Partial<Campaign>;
  onClose: () => void;
  readOnly?: boolean; 
  mode?: "add" | "edit" | "view";
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
