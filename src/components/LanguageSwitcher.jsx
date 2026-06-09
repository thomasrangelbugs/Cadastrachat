import { useI18n } from "../i18n/I18nContext";

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useI18n();

  return (
    <div className="lang-switcher" role="group" aria-label="Idioma">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn${lang === l.code ? " is-active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
