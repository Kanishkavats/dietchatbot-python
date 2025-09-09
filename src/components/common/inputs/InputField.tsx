"use client";
import { FieldHookConfig, useField } from "formik";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface InputFieldProps {
  label?: string;
  icon?: string; // left-side icon
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
  const [showPassword, setShowPassword] = useState(false);

  const isTextarea = as === "textarea";
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <div
        className={`flex gap-2 bg-[var(--gray-200)]/60 px-3 py-4 rounded-md border relative
          ${meta.touched && meta.error ? "border-[var(--red)]" : "border-transparent"}
          ${isTextarea ? "items-start" : "items-center"}`}
      >
        {/* Input / Textarea */}
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
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[14px]"
          />
        )}

        {/* Left Icon (if provided) */}
        {icon && !isPassword && (
          <Icon
            icon={icon}
            className="text-[var(--gray-500)]/60 text-lg font-bold size-5 mt-[2px]"
          />
        )}

        {/* Password Toggle (right side) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              className="text-lg"
            />
          </button>
        )}
      </div>

      {/* Error */}
      {meta.touched && meta.error && (
        <p className="text-[10px] text-[var(--red)] mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputField;
