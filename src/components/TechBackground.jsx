import { useScrollSpeed } from "../hooks/useScrollSpeed";

export default function TechBackground() {
  const speed = useScrollSpeed();

  return (
    <div
      className="tech-bg"
      aria-hidden="true"
      style={{ "--bg-speed": speed.toFixed(2) }}
    >
      <div className="tech-bg-layer tech-bg-grid" />
      <div className="tech-bg-layer tech-bg-mesh" />
      <div className="tech-bg-layer tech-bg-lines" />
      <div className="tech-bg-layer tech-bg-nodes" />
      <div className="tech-bg-layer tech-bg-scan" />
    </div>
  );
}
