import { useEffect, useState } from "react";

const chatMessages = [
  { type: "in", text: "Olá! Posso te fazer algumas perguntas sobre sua experiência?", time: "14:02" },
  { type: "out", text: "Pode sim! Tenho 3 anos em marketing digital.", time: "14:03" },
  { type: "in", text: "Ótimo! Você já trabalhou com prospecção ativa (SDR)?", time: "14:03" },
  { type: "out", text: "Sim, 2 anos focado em outbound B2B.", time: "14:04" },
  { type: "in", text: "Perfeito! Vamos te chamar para a próxima etapa. 🎯", time: "14:04" },
];

export default function WhatsAppMockup() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const timer = setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount((c) => c + 1);
        }, 900);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div className="phone-frame" aria-label="Simulação de conversa no WhatsApp">
      <div className="phone-notch" />
      <div className="wa-header">
        <div className="wa-avatar">CC</div>
        <div className="wa-header-info">
          <strong>ContrataChat — SDR Pleno</strong>
          <span>online</span>
        </div>
        <span className="wa-header-status" aria-hidden="true" />
      </div>
      <div className="wa-chat">
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <div className={`wa-bubble ${msg.type}`} key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            {msg.text}
            <span className="wa-bubble-time">{msg.time}</span>
          </div>
        ))}
        {showTyping && (
          <div className="wa-typing" aria-label="Digitando">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
      <div className="phone-badge">
        <span className="phone-badge-score">86%</span>
        <div>
          <strong>Mariana Alves</strong>
          <span>Alta aderência — SDR Pleno</span>
        </div>
      </div>
    </div>
  );
}
