export default function SectionTitle({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`section-title reveal reveal-blur${centered ? " centered" : ""}`}>
      <span className="eyebrow reveal reveal-delay-1">{eyebrow}</span>
      <h2 className="reveal-text">{title}</h2>
      {text && <p className="reveal reveal-delay-2">{text}</p>}
    </div>
  );
}
