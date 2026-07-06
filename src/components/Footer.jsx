import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import BrandLogo from "./BrandLogo";
import { getWhatsAppUrl, INSTAGRAM_URL, WHATSAPP_DISPLAY } from "../config/contact";
import { IconInstagram, IconLinkedIn } from "./icons";

export default function Footer() {
  const { t } = useI18n();

  const menuLinks = [
    { label: t.nav.how, href: "/#como-funciona" },
    { label: t.nav.features, href: "/#recursos" },
    { label: t.nav.pricing, href: "/#planos" },
    { label: t.nav.tech, href: "/#tecnologia" },
    { label: t.nav.benefits, href: "/#beneficios" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.faq, href: "/#faq" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <BrandLogo variant="footer" />
        <p>{t.footer.tagline}</p>
      </div>

      <div className="footer-col">
        <h4>{t.footer.nav}</h4>
        {menuLinks.map((link) =>
          link.href.startsWith("/blog") ? (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          )
        )}
      </div>

      <div className="footer-col">
        <h4>{t.footer.contactCol}</h4>
        <a href="mailto:contato@contratachat.com.br">contato@contratachat.com.br</a>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
        <Link to="/contato">{t.nav.demo}</Link>
        <a href="/#faq">{t.nav.help}</a>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ContrataChat. {t.footer.rights}
        </span>
        <div className="footer-social">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <IconLinkedIn />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
