import {
  WHATSAPP_DEMO_MESSAGE,
  WHATSAPP_NUMBER,
  getWhatsAppUrl,
} from "../config/contact";

const apiUrl = import.meta.env.VITE_API_URL ?? "";
const widgetNumber =
  import.meta.env.VITE_WHATSAPP_WIDGET_NUMBER || WHATSAPP_NUMBER;

export function getWhatsAppLink(message = WHATSAPP_DEMO_MESSAGE) {
  const digits = widgetNumber.replace(/\D/g, "");
  const text = message || WHATSAPP_DEMO_MESSAGE;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export { getWhatsAppUrl, WHATSAPP_DEMO_MESSAGE };

export async function sendWhatsAppMessage(to, message) {
  const res = await fetch(`${apiUrl}/api/whatsapp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, message }),
  });

  if (!res.ok) {
    if (import.meta.env.DEV) {
      console.log("[whatsapp mock]", { to, message });
      return { mock: true };
    }
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Erro ao enviar WhatsApp");
  }
  return res.json();
}

export async function sendLeadConfirmation(whatsapp, name) {
  const message = `Olá ${name}! 👋 Recebemos sua solicitação de demo na ContrataChat. Em breve nosso time entrará em contato.`;
  return sendWhatsAppMessage(whatsapp, message);
}
