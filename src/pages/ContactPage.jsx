import { useState } from "react";
import { IconCheck, IconWhatsApp } from "../components/icons";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n/I18nContext";
import { trackEvent } from "../services/analytics";
import { submitLead } from "../services/crm";
import { sendLeadConfirmation } from "../services/whatsapp";

export default function ContactPage() {
  const { t } = useI18n();
  const pageRef = useScrollReveal();
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.target;
    const lead = {
      name: form.name.value,
      company: form.company.value,
      whatsapp: form.whatsapp.value,
      jobs: form.jobs.value,
      message: form.message?.value || "",
      source: "contact_form",
    };

    try {
      await submitLead(lead);
      trackEvent("lead_submitted", { jobs: lead.jobs });

      try {
        await sendLeadConfirmation(lead.whatsapp, lead.name);
      } catch {
        /* WhatsApp opcional */
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || t.contact.error);
      trackEvent("lead_error", { error: err.message });
    }
  }

  return (
    <main className="page-shell" ref={pageRef}>
      <section className="contact-layout">
        <div className="reveal">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h1>{t.contact.title}</h1>
          <p>{t.contact.text}</p>

          <div className="contact-perks">
            <div className="contact-perk">
              <IconCheck />
              {t.contact.perk1}
            </div>
            <div className="contact-perk">
              <IconCheck />
              {t.contact.perk2}
            </div>
            <div className="contact-perk">
              <IconCheck />
              {t.contact.perk3}
            </div>
          </div>
        </div>

        <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
          {status === "success" && <div className="form-alert success">{t.contact.success}</div>}
          {status === "error" && <div className="form-alert error">{errorMsg}</div>}

          <label>
            {t.contact.name}
            <input name="name" type="text" placeholder={t.contact.name} required disabled={status === "loading"} />
          </label>

          <label>
            {t.contact.company}
            <input name="company" type="text" placeholder={t.contact.company} required disabled={status === "loading"} />
          </label>

          <label>
            {t.contact.whatsapp}
            <input name="whatsapp" type="tel" placeholder="(00) 00000-0000" required disabled={status === "loading"} />
          </label>

          <label>
            {t.contact.jobs}
            <select name="jobs" required defaultValue="" disabled={status === "loading"}>
              <option value="" disabled>
                {t.contact.jobsPlaceholder}
              </option>
              <option value="1-5">{t.contact.jobs1}</option>
              <option value="6-20">{t.contact.jobs2}</option>
              <option value="20+">{t.contact.jobs3}</option>
            </select>
          </label>

          <label>
            {t.contact.message}
            <textarea name="message" placeholder={t.contact.message} rows={3} disabled={status === "loading"} />
          </label>

          <button className="button" type="submit" disabled={status === "loading"}>
            <IconWhatsApp />
            {status === "loading" ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      </section>
    </main>
  );
}
