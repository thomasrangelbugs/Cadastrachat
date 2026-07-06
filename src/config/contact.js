export const WHATSAPP_NUMBER = "555195501677";
export const WHATSAPP_DISPLAY = "+55 51 9550-1677";
export const INSTAGRAM_URL = "https://www.instagram.com/contratachat";

export const WHATSAPP_DEMO_MESSAGE =
  "Olá! Gostaria de solicitar uma demonstração da ContrataChat.";

export function getWhatsAppUrl(message = "") {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!message) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
