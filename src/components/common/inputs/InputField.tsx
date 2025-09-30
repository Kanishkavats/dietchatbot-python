"use client";

import { FieldHookConfig, useField } from "formik";
import { Icon } from "@iconify/react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
  label?: string;
  icon?: string | ReactNode; // icon can be a string or JSX
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
  className?:string;
  iconClassName?:string;
  placeholderClassName?:string;
  textSize?:string;
  errorTextSize?:string;
}

const InputField: React.FC<InputFieldProps & FieldHookConfig<string>> = ({
  label,
  icon,
  type = "text",
  as = "input",
  placeholder,
  className='flex gap-2 bg-gray-200/60 px-3 py-4 rounded-md border relative',
  iconClassName="text-gray-500/60 text-lg font-bold size-5 mt-[2px]",
  placeholderClassName='',
  textSize="text-[14px]",
  errorTextSize="text-[10px]",
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const{t}=useTranslation();
  const isTextarea = as === "textarea";
  const isPassword = type === "password";

  // 🔍 Check if the icon is a string (Iconify) or JSX (React Icon or custom)
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <Icon
          icon={icon}
          className={iconClassName}
        />
      );
    }

    return <span className="text-gray-500/60 text-lg">{icon}</span>;
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <div
        className={`
          ${meta.touched && meta.error ? "border-red" : ""}
          ${isTextarea ? "items-start" : "items-center"} ${className}`}
      >
        {/* Input / Textarea */}
        {isTextarea ? (
          <textarea
            {...field}
            placeholder={placeholder}
            className={`w-full bg-transparent outline-none resize-none ${textSize} ${placeholderClassName}`}
            rows={4}
          />
        ) : (
          <input
            {...field}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            className={`w-full bg-transparent outline-none  ${textSize} ${placeholderClassName}`}
          />
        )}

        {/* Icon on the right (optional) */}
        {!isPassword && icon && renderIcon()}

        {/* Password Toggle Icon (right side) */}
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

      {/* Error message */}
      {meta.touched && meta.error && (
        <p className={`${errorTextSize} text-red mt-1`}>{t(meta.error)}</p>
      )}
    </div>
  );
};

export default InputField;
