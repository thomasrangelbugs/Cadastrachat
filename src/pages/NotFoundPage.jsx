import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";

export default function NotFoundPage() {
  const { t } = useI18n();

  return (
    <main className="page-shell center-page">
      <span className="eyebrow">{t.notFound.eyebrow}</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link className="button" to="/">
        {t.notFound.back}
      </Link>
    </main>
  );
}
