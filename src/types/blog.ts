import { Blog } from "../components/Admin/Data/staticData";
import { BlogFormValues } from "../utils/validations/FormValidation";

export interface BlogFormProps {
  initialData?: Partial<BlogFormValues> & Partial<Blog>;
  onClose: () => void;
  readOnly?: boolean;
  mode?: "add" | "edit" | "view";
   onPreview?: (data: BlogFormValues) => void;
}


export interface BlogColumnCallbacks {
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onView: (blog: Blog) => void;
}
