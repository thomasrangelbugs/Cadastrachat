import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import LiteContactForm from "../components/LiteContactForm";
import { LiteCheckIcon, LiteWhatsAppIcon } from "../components/lite/LiteIcons";
import { getWhatsAppUrl } from "../config/contact";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SECTIONS = [
  { id: "inicio", key: "start", num: "00" },
  { id: "processo", key: "process", num: "01" },
  { id: "recursos", key: "features", num: "02" },
  { id: "planos", key: "pricing", num: "03" },
  { id: "faq", key: "faq", num: "04" },
  { id: "contato", key: "contact", num: "05" },
];

function TopNav({ activeId }) {
  const { t } = useI18n();

  return (
    <nav className="lite-top-nav" aria-label={t.lite.navLabel}>
      <div className="lite-top-nav-inner">
        {SECTIONS.map(({ id, key, num }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`lite-top-nav-link${activeId === id ? " is-active" : ""}`}
          >
            <span className="lite-top-nav-num">{num}</span>
            {t.lite.nav[key]}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function LiteHomePage() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState("inicio");
  const pageRef = useScrollReveal();

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopNav activeId={activeId} />

      <div className="lite-container" ref={pageRef}>
        <section className="lite-hero-split reveal reveal-blur" id="inicio">
          <div className="lite-hero-copy">
            <span className="lite-badge reveal reveal-delay-1">{t.lite.edition}</span>
            <p className="lite-hero-eyebrow reveal reveal-delay-1">{t.hero.eyebrow}</p>
            <h1 className="reveal-text reveal-delay-2">
              {t.hero.title}
              <em>{t.hero.titleHighlight}</em>
            </h1>
            <p className="lite-hero-lead reveal reveal-delay-3">{t.lite.heroText}</p>
            <div className="lite-hero-actions reveal reveal-delay-4">
              <a className="lite-btn lite-btn--wa" href="#contato">
                <LiteWhatsAppIcon />
                {t.hero.cta}
              </a>
              <a className="lite-btn lite-btn--outline" href="#processo">
                {t.hero.secondary}
              </a>
            </div>
          </div>

          <div className="lite-hero-bento reveal-scale reveal-delay-2">
            <div className="lite-stat-card lite-stat-card--accent">
              <strong>+500</strong>
              <span>{t.hero.trust1}</span>
            </div>
            <div className="lite-stat-card">
              <strong>3x</strong>
              <span>{t.hero.trust2}</span>
            </div>
            <div className="lite-stat-card lite-stat-card--dark">
              <strong>LGPD</strong>
              <span>{t.hero.trust3}</span>
            </div>
            <div className="lite-stat-card lite-stat-card--wide">
              <span className="lite-stat-label">{t.lite.quickPitch}</span>
              <p>{t.hero.text}</p>
            </div>
          </div>
        </section>

        <section className="lite-block reveal" id="processo">
          <header className="lite-block-head reveal-left">
            <span className="lite-block-num">01</span>
            <div>
              <h2>{t.sections.howTitle}</h2>
              <p>{t.sections.howText}</p>
            </div>
          </header>
          <div className="lite-steps-row">
            {t.steps.map((step, i) => (
              <article className={`lite-step-card reveal-scale reveal-delay-${(i % 4) + 1}`} key={step.number}>
                <span className="lite-step-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lite-block lite-block--alt reveal" id="recursos">
          <header className="lite-block-head reveal-right">
            <span className="lite-block-num">02</span>
            <div>
              <h2>{t.sections.featuresTitle}</h2>
              <p>{t.sections.featuresText}</p>
            </div>
          </header>
          <div className="lite-bento">
            {t.features.map((feature, i) => (
              <article
                className={`lite-bento-tile lite-bento-tile--${(i % 3) + 1}${feature.highlight ? " is-highlight" : ""} ${i % 2 ? "reveal-right" : "reveal-left"} reveal-delay-${(i % 4) + 1}`}
                key={feature.title}
              >
                <span className="lite-bento-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lite-block reveal" id="planos">
          <header className="lite-block-head reveal-left">
            <span className="lite-block-num">03</span>
            <div>
              <h2>{t.sections.pricingTitle}</h2>
              <p>{t.sections.pricingText}</p>
            </div>
          </header>
          <div className="lite-pricing-cards">
            {t.pricing.map((plan) => (
              <article className={`lite-plan reveal-scale reveal-delay-${plan.popular ? 2 : 1}${plan.popular ? " is-popular" : ""}`} key={plan.name}>
                {plan.popular && <span className="lite-plan-badge">{t.lite.pricingPopular}</span>}
                <h3>{plan.name}</h3>
                <div className="lite-plan-price">
                  {plan.price}
                  {plan.period && <small>{plan.period}</small>}
                </div>
                <p className="lite-plan-desc">{plan.desc}</p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <LiteCheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
                <a className={`lite-btn${plan.popular ? " lite-btn--wa" : " lite-btn--outline"}`} href="#contato">
                  {plan.popular ? t.nav.demo : plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="lite-block lite-block--alt reveal" id="faq">
          <header className="lite-block-head reveal-right">
            <span className="lite-block-num">04</span>
            <div>
              <h2>{t.sections.faqTitle}</h2>
              <p>{t.sections.faqText}</p>
            </div>
          </header>
          <div className="lite-faq-grid">
            {t.faqs.map((item) => (
              <details className="lite-faq-item reveal reveal-delay-1" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="lite-contact-band reveal-scale" id="contato">
          <header className="lite-block-head lite-block-head--light">
            <span className="lite-block-num">05</span>
            <div>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.text}</p>
            </div>
          </header>
          <LiteContactForm />
        </section>

        <p className="lite-switch">
          {t.lite.preferFull}{" "}
          <Link to="/">{t.lite.switchFull}</Link>
        </p>
      </div>

      <div className="lite-mobile-bar">
        <a className="lite-btn lite-btn--wa lite-btn--block" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <LiteWhatsAppIcon />
          {t.hero.cta}
        </a>
      </div>
    </>
  );
}
