// src/i18n/useTranslation.js   (if you don't have it yet)
import { useLanguage } from "../context/LanguageContext";
import { translations } from "./translations";

export function useTranslation() {
  const { lang } = useLanguage();
  const current = translations[lang] || translations.en;

  const t = (key) => {
    return key.split(".").reduce((obj, part) => obj?.[part], current) ?? key;
  };

  return { t, lang };
}
