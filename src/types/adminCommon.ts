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