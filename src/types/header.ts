export interface NavItem {
  label: string;
  dropdown: any[] | null; // could be DropdownOption[] or image options
  href?:string;
}

export interface DropdownOption {
  label?: string;
  icon?: string;
  image?: string;
  name?: string;
  href?: string;
  children?: DropdownOption[];
}

export interface DropdownProps {
  options: (DropdownOption | string)[];
  label: string; // Default label if no item is selected
}