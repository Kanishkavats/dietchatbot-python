"use client";
import { FieldHookConfig, useField } from "formik";
import { Icon } from "@iconify/react";

interface InputFieldProps {
  label?: string;
  icon?: string;
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps & FieldHookConfig<string>> = ({
  label,
  icon,
  type = "text",
  as = "input",
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div
        className={`flex items-baseline gap-2 bg-[var(--gray-100)] px-3 py-3 rounded-md border ${
          meta.touched && meta.error ? "border-[var(--red)]" : "border-transparent"
        }`}
      >
        {as === "textarea" ? (
          <textarea
            {...field}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none resize-none"
            rows={4}
          />
        ) : (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
          />
        )}
        {icon && <Icon icon={icon} className="text-gray-500 text-lg font-bold size-6" />}
      </div>
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputField;
