import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "hi") => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = "ltr"; 
  };

  return (
    <div className="language-switcher px-2 py-2 cursor-pointer border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 text-sm">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value as "en" | "hi")}
        className="text-black px-3 outline-none cursor-pointer "
      >
        <option value="en" className="cursor-pointer ">
          EN
        </option>
        <option value="hi" className="cursor-pointer ">
          HN
        </option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
