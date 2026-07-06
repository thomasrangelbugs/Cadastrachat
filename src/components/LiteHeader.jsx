import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { getWhatsAppUrl } from "../config/contact";
import { IconWhatsApp } from "./icons";

export default function LiteHeader() {
  const { t } = useI18n();

  return (
    <header className="lite-header">
      <div className="lite-header-inner">
        <Link className="lite-brand" to="/lite" aria-label="ContrataChat">
          <BrandLogo variant="header" />
          <span className="lite-edition-pill">{t.lite.edition}</span>
        </Link>

        <div className="lite-header-actions">
          <Link className="lite-link" to="/">
            {t.lite.switchFull}
          </Link>
          <LanguageSwitcher />
          <a className="lite-btn lite-btn--wa lite-btn--sm" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp />
            <span className="lite-btn-label">{t.nav.demo}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
