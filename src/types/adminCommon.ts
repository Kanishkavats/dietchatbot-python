import { ChangeEvent, KeyboardEvent, RefObject } from "react";


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