import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";

export default function LiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="lite-footer">
      <p>{t.footer.tagline}</p>
      <span>
        © {new Date().getFullYear()} ContrataChat · {t.lite.edition}
      </span>
      {" · "}
      <Link to="/">{t.lite.switchFull}</Link>
    </footer>
  );
}
