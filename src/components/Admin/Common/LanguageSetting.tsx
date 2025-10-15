import { FaLanguage } from "react-icons/fa";
import LanguageToggle from "./LanguageToggle";
import LanguageSwitcher from "../../LanguageSwitcher";

interface LanguageSettingProps {
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}
const LanguageSetting: React.FC<LanguageSettingProps> = ({
  language,
  setLanguage,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full items-start">
      <div className="flex items-center gap-4 w-full">
        <div className="w-12 h-12 bg-primaryColor/10 text-primaryColor rounded-full flex items-center justify-center">
          <FaLanguage size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">Language</h3>
          <p className="text-gray-500 text-sm mt-1">
            Change the display language.
          </p>
        </div>
      </div>
      <div className="mt-4 pl-16">
        <LanguageSwitcher rounded="rounded-lg" paddingx="px-2" paddingy="py-2"/>
        {/* <LanguageToggle language={language} onChange={setLanguage} /> */}
      </div>
    </div>
  );
};
export default LanguageSetting;
