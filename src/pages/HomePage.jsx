import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedStat from "../components/AnimatedStat";
import ClientLogos from "../components/ClientLogos";
import DemoVideo from "../components/DemoVideo";
import HeroRobot from "../components/HeroRobot";
import PricingSection from "../components/PricingSection";
import SectionTitle from "../components/SectionTitle";
import StepsTabs from "../components/StepsTabs";
import TrustMarquee from "../components/TrustMarquee";
import WhatsAppMockup from "../components/WhatsAppMockup";
import {
  FeatureIcon,
  IconCheck,
  IconChevron,
  IconStar,
  IconWhatsApp,
  TechIcon,
} from "../components/icons";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n/I18nContext";

const candidates = [
  { name: "Mariana Alves", role: "SDR Pleno", score: 86, initials: "MA", color: "#38bdf8" },
  { name: "Rafael Costa", role: "Analista de Marketing", score: 72, initials: "RC", color: "#0ea5e9" },
  { name: "Juliana Mendes", role: "Designer UI", score: 91, initials: "JM", color: "#7dd3fc" },
];

export default function HomePage() {
  const { t } = useI18n();
  const pageRef = useScrollReveal();

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    requestAnimationFrame(() => {
      hero.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-text"
      ).forEach((node) => node.classList.add("is-visible"));
    });
  }, []);

  return (
    <main ref={pageRef}>
      <section className="hero-section hero-section--centered" id="inicio">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-content hero-content--centered">
            <span className="eyebrow reveal reveal-delay-1">
              <span className="eyebrow-dot" aria-hidden="true" />
              {t.hero.eyebrow}
            </span>
            <h1 className="reveal reveal-delay-1">
              {t.hero.title} <span>{t.hero.titleHighlight}</span>
            </h1>
          </div>

          <div className="hero-visual hero-visual--stacked reveal-scale reveal-delay-2">
            <HeroRobot />
            <div className="phone-mockup phone-mockup--floating">
              <WhatsAppMockup />
            </div>
          </div>

          <div className="hero-content hero-content--centered hero-content--bottom">
            <p className="reveal reveal-delay-3">{t.hero.text}</p>

            <div className="hero-actions hero-actions--centered reveal reveal-delay-4">
              <Link className="button" to="/contato">
                <IconWhatsApp />
                {t.hero.cta}
              </Link>
              <a className="button button-ghost" href="#como-funciona">
                {t.hero.secondary}
              </a>
            </div>
          </div>

          <div className="hero-trust hero-trust--pills reveal reveal-delay-5">
            <div className="hero-trust-item">
              <strong>+500</strong> {t.hero.trust1}
            </div>
            <div className="hero-trust-item">
              <strong>3x</strong> {t.hero.trust2}
            </div>
            <div className="hero-trust-item">
              <strong>LGPD</strong> {t.hero.trust3}
            </div>
          </div>
        </div>
      </section>

      <TrustMarquee />
      <ClientLogos />

      <section className="section section-dark section--angled" id="como-funciona">
        <SectionTitle
          centered
          eyebrow={t.sections.howEyebrow}
          title={t.sections.howTitle}
          text={t.sections.howText}
        />
        <StepsTabs steps={t.steps} />
      </section>

      <DemoVideo />

      <section className="section section-muted" id="recursos">
        <SectionTitle
          eyebrow={t.sections.featuresEyebrow}
          title={t.sections.featuresTitle}
          text={t.sections.featuresText}
        />
        <div className="features-zigzag">
          {t.features.map((feature, i) => (
            <article
              className={`feature-row ${i % 2 ? "feature-row--reverse reveal-right" : "reveal-left"} reveal-delay-${(i % 4) + 1}${feature.highlight ? " feature-row--highlight" : ""}`}
              key={feature.title}
            >
              <div className="feature-row-visual">
                <div className="feature-icon">
                  <FeatureIcon tag={feature.tag} />
                </div>
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <div className="feature-row-copy">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PricingSection />

      <section className="section section-compact section-dark">
        <div className="stats-band stats-band--inline">
          {t.statItems.map((stat, i) => (
            <AnimatedStat key={stat.labelKey} stat={stat} delay={i} />
          ))}
        </div>
      </section>

      <section className="section section-muted section--angled-reverse" id="tecnologia">
        <SectionTitle
          centered
          eyebrow={t.sections.techEyebrow}
          title={t.sections.techTitle}
          text={t.sections.techText}
        />
        <div className="tech-flow tech-flow--cards">
          {t.techFlow.map((item, i) => (
            <article className={`tech-card reveal-scale reveal-delay-${i + 1}`} key={item.title}>
              <span className="tech-step-label">{item.step}</span>
              <div className="feature-icon">
                <TechIcon index={i} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark split-section split-section--overlap" id="beneficios">
        <div className="reveal-left">
          <SectionTitle
            eyebrow={t.sections.benefitsEyebrow}
            title={t.sections.benefitsTitle}
            text={t.sections.benefitsText}
          />
          <ul className="benefit-list benefit-list--compact">
            {t.benefits.map((benefit) => (
              <li key={benefit}>
                <span className="benefit-check" aria-hidden="true">
                  <IconCheck />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-preview dashboard-preview--glass reveal-right reveal-delay-2">
          <div className="dashboard-header">
            <strong>Painel — SDR Pleno</strong>
            <span>12 candidatos</span>
          </div>
          {candidates.map((c) => (
            <div className="candidate-row" key={c.name}>
              <div className="candidate-avatar" style={{ background: c.color }}>
                {c.initials}
              </div>
              <div className="candidate-info">
                <strong>{c.name}</strong>
                <span>{c.role}</span>
              </div>
              <span className={`candidate-score ${c.score >= 80 ? "high" : "mid"}`}>{c.score}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <SectionTitle centered eyebrow={t.sections.testimonialsEyebrow} title={t.sections.testimonialsTitle} />
        <div className="testimonials-scroll">
          <div className="testimonials-track">
            {t.testimonials.map((item, i) => (
              <article className={`testimonial-card reveal reveal-delay-${i + 1}`} key={item.name}>
                <div className="testimonial-stars" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <IconStar key={j} />
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="faq">
        <SectionTitle
          centered
          eyebrow={t.sections.faqEyebrow}
          title={t.sections.faqTitle}
          text={t.sections.faqText}
        />
        <div className="faq-grid">
          {t.faqs.map((item, i) => (
            <details className={`faq-item reveal reveal-delay-${(i % 4) + 1}`} key={item.question}>
              <summary>
                {item.question}
                <IconChevron className="faq-chevron" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-section cta-section--full reveal-scale">
        <div className="cta-section-inner">
          <span className="eyebrow">{t.sections.ctaEyebrow}</span>
          <h2>{t.sections.ctaTitle}</h2>
          <p>{t.sections.ctaText}</p>
          <div className="cta-actions">
            <Link className="button" to="/contato">
              <IconWhatsApp />
              {t.sections.ctaButton}
            </Link>
            <a className="button button-ghost" href="#como-funciona">
              {t.sections.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
