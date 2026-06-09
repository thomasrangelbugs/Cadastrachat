import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import { IconCheck } from "./icons";

export default function PricingSection() {
  const { t } = useI18n();

  return (
    <section className="section section-compact section-muted" id="planos">
      <div className="section-title centered reveal">
        <span className="eyebrow">{t.sections.pricingEyebrow}</span>
        <h2>{t.sections.pricingTitle}</h2>
        <p>{t.sections.pricingText}</p>
      </div>

      <div className="pricing-grid">
        {t.pricing.map((plan, i) => (
          <article
            className={`pricing-card reveal reveal-delay-${i + 1}${plan.popular ? " is-popular" : ""}`}
            key={plan.name}
          >
            {plan.popular && <span className="pricing-badge">{plan.cta}</span>}
            <h3>{plan.name}</h3>
            <div className="pricing-price">
              <strong>{plan.price}</strong>
              {plan.period && <span>{plan.period}</span>}
            </div>
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <IconCheck />
                  {f}
                </li>
              ))}
            </ul>
            <Link className={`button${plan.popular ? "" : " button-ghost"}`} to="/contato">
              {plan.popular ? t.nav.demo : plan.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
