// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./public/locales/english/index.json";
import hindiTranslation from "./public/locales/hindi/index.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: englishTranslation },
      hi: { translation: hindiTranslation },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
