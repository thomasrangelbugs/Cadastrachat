export default function SectionTitle({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`section-title${centered ? " centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
