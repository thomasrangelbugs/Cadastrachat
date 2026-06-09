import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { trackEvent } from "../services/analytics";
import { getWhatsAppLink } from "../services/whatsapp";
import { IconClose, IconWhatsApp } from "./icons";

export default function WhatsAppWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleSend(e) {
    e.preventDefault();
    const text = message.trim() || t.widget.greeting;
    trackEvent("widget_message", { source: "floating_widget" });
    window.open(getWhatsAppLink(text), "_blank", "noopener");
    setMessage("");
    setOpen(false);
  }

  return (
    <div className={`wa-widget${open ? " is-open" : ""}`}>
      {open && (
        <div className="wa-widget-panel" role="dialog" aria-label={t.widget.title}>
          <div className="wa-widget-header">
            <div>
              <strong>{t.widget.title}</strong>
              <span>{t.widget.subtitle}</span>
            </div>
            <button type="button" className="wa-widget-close" onClick={() => setOpen(false)} aria-label={t.widget.close}>
              <IconClose />
            </button>
          </div>
          <div className="wa-widget-body">
            <div className="wa-widget-bubble">{t.widget.greeting}</div>
          </div>
          <form className="wa-widget-input" onSubmit={handleSend}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.widget.placeholder}
              aria-label={t.widget.placeholder}
            />
            <button type="submit" aria-label={t.widget.send}>
              <IconWhatsApp />
            </button>
          </form>
        </div>
      )}

      <button
        className="wa-widget-fab"
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          trackEvent("widget_toggle", { open: !open });
        }}
        aria-label={open ? t.widget.close : t.widget.open}
        aria-expanded={open}
      >
        {open ? <IconClose /> : <IconWhatsApp />}
      </button>
    </div>
  );
}
