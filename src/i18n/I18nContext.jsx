import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { languages, translations } from "./translations";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("cc-lang") || "pt");

  const t = useMemo(() => translations[lang] || translations.pt, [lang]);

  useEffect(() => {
    localStorage.setItem("cc-lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
