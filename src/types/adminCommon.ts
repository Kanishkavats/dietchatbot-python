import { ChangeEvent, KeyboardEvent, ReactNode, RefObject } from "react";


export interface DropdownOption<T> {
  label: string;
  value: T;
}


export interface    AdminDropdownProps<T> {
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  icon?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean
}

export interface AdminCustomInputProps {
  label?: string;
  icon?: string;
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  name?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string,
  disabled?: boolean;
  readOnly?: boolean; 
  ref?:RefObject<HTMLInputElement | null>
}

export interface AdminFileItem {
  file?: File;
  url: string;
  status: "processing" | "success" | "error";
  progress: number;
}

export interface AdminCustomFileInputProps {
  label?: string;
  name: string;
  onChange: (files: File[], updatedImageUrls?: string[]) => void;
  error?: string;
  disabled?: boolean;
  mode?: "add" | "edit" | "view";
  initialUrls?: string[];
  uploadType?: "single" | "multiple";
}

export interface AdminMultiInputListProps {
  label: string;
  values: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  isView?: boolean;
  colorClass?: { normal: string; view: string }; // optional styling
}

export interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string; 
  className?: string;
  mobileFullScreen?: boolean; 
  mode?: string
}

export interface AdminDataTableWrapperProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
}