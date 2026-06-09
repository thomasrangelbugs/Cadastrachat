import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { IconClose, IconMenu } from "./icons";

export default function Header() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuLinks = [
    { label: t.nav.how, href: "/#como-funciona" },
    { label: t.nav.features, href: "/#recursos" },
    { label: t.nav.pricing, href: "/#planos" },
    { label: t.nav.tech, href: "/#tecnologia" },
    { label: t.nav.benefits, href: "/#beneficios" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.faq, href: "/#faq" },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 900) setMenuOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <Link className="brand" to="/" aria-label="ContrataChat" onClick={closeMenu}>
          <BrandLogo />
        </Link>

        <nav className="nav-desktop" aria-label="Menu principal">
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
          <LanguageSwitcher />
          <ThemeToggle />
          <Link className="button button-small" to="/contato">
            {t.nav.demo}
          </Link>
        </nav>

        <div className="header-mobile-actions">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar" : "Menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>

      <nav className={`nav-mobile${menuOpen ? " is-open" : ""}`} aria-label="Menu mobile">
        {menuLinks.map((link) =>
          link.href.startsWith("/blog") ? (
            <Link key={link.href} to={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          )
        )}
        <Link className="button" to="/contato" onClick={closeMenu}>
          {t.nav.demo}
        </Link>
      </nav>
    </>
  );
}
