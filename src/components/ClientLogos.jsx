import { useI18n } from "../i18n/I18nContext";

export default function ClientLogos() {
  const { t } = useI18n();
  const clients = [...t.clients, ...t.clients];

  return (
    <section className="section section-compact section-muted clients-section">
      <div className="section-title centered reveal">
        <span className="eyebrow">{t.sections.clientsEyebrow}</span>
        <h2>{t.sections.clientsTitle}</h2>
      </div>

      <div className="clients-marquee" aria-hidden="true">
        <div className="clients-track">
          <div className="clients-group">
            {clients.map((client, i) => (
              <div className="client-logo" key={`${client.name}-${i}`} style={{ "--client-color": client.color }}>
                <span className="client-logo-icon">{client.name.charAt(0)}</span>
                <span className="client-logo-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
