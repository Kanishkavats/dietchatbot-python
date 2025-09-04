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

  const isTextarea = as === "textarea";

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div
        className={`flex gap-2 bg-[var(--gray-200)]/60 px-3 py-4 rounded-md border ${
          meta.touched && meta.error ? "border-[var(--red)]" : "border-transparent"
        } ${isTextarea ? "items-start" : "items-center"}`}
      >
        {isTextarea ? (
          <textarea
            {...field}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none resize-none text-[14px]"
            rows={4}
          />
        ) : (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[14px]"
          />
        )}
        {icon && (
          <Icon
            icon={icon}
            className="text-[var(--gray-500)]/60 text-lg font-bold size-5 mt-[2px]"
          />
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-[10px] text-[var(--red)] mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputField;
