import React from "react";

interface NoticeProps {
  title?: string;
  message: string;
  icon?: React.ReactNode;
  wrapperClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
}

const Notice: React.FC<NoticeProps> = ({
  title = "Notice",
  message,
  icon = "⚠️",
  wrapperClassName = "",
  iconWrapperClassName = "",
  iconClassName = "",
  titleClassName = "",
  messageClassName = "",
}) => {
  return (
    <div
      className={`xl:px-15 max-w-[35rem] flex items-center relative p-3 border border-gray-200 bg-yellow/8 rounded xl:rounded-full shadow-sm ${wrapperClassName}`}
    >
      {/* Icon section (only visible on xl) */}
      <div
        className={`h-full w-[4px] absolute top-0 left-10 hidden xl:flex justify-center items-center bg-dark-green ${iconWrapperClassName}`}
      >
        <span className={`text-lg text-yellow ${iconClassName}`}>
          {icon}
        </span>
      </div>

      {/* Text */}
      <p className={`text-[15px] text-gray-green ${messageClassName}`}>
        <strong className={`font-semibold text---foreground ${titleClassName}`}>
          {title}:
        </strong>{" "}
        {message}
      </p>
    </div>
  );
};

export default Notice;
