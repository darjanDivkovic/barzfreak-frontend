// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("preferredLanguage") || "bs";
  });

  useEffect(() => {
    const existing = localStorage.getItem("preferredLanguage");

    if (existing) {
      localStorage.setItem("preferredLanguage", lang);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
