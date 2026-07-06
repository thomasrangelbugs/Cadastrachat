import { useState } from "react";
import { IconWhatsApp } from "./icons";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "../config/contact";
import { useI18n } from "../i18n/I18nContext";
import { trackEvent } from "../services/analytics";
import { submitLead } from "../services/crm";
import { sendLeadConfirmation } from "../services/whatsapp";

export default function LiteContactForm() {
  const { t } = useI18n();
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
      source: "lite_contact_form",
    };

    try {
      await submitLead(lead);
      trackEvent("lead_submitted", { jobs: lead.jobs, source: "lite" });

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
    <div className="lite-contact-grid">
      <div>
        <ul className="lite-perks">
          <li>{t.contact.perk1}</li>
          <li>{t.contact.perk2}</li>
          <li>{t.contact.perk3}</li>
        </ul>
        <p className="lite-section-lead">
          {t.contact.whatsappDirect}{" "}
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>

      <form className="lite-form" onSubmit={handleSubmit}>
        {status === "success" && <div className="lite-alert lite-alert--success">{t.contact.success}</div>}
        {status === "error" && <div className="lite-alert lite-alert--error">{errorMsg}</div>}

        <label>
          {t.contact.name}
          <input name="name" type="text" required disabled={status === "loading"} />
        </label>

        <label>
          {t.contact.company}
          <input name="company" type="text" required disabled={status === "loading"} />
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
          <textarea name="message" rows={2} disabled={status === "loading"} />
        </label>

        <button className="lite-btn lite-btn--wa lite-btn--block" type="submit" disabled={status === "loading"}>
          <IconWhatsApp />
          {status === "loading" ? t.contact.sending : t.contact.submit}
        </button>
      </form>
    </div>
  );
}
