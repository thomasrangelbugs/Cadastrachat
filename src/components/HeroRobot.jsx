const badges = [
  { label: "Dados protegidos", icon: "🔒" },
  { label: "Processos seguros", icon: "🛡️" },
  { label: "IA + RH", icon: "✨" },
];

export default function HeroRobot() {
  return (
    <div className="hero-robot-scene" aria-hidden="true">
      <div className="hero-robot-badges">
        {badges.map((badge, i) => (
          <div className={`hero-robot-badge hero-robot-badge--${i + 1}`} key={badge.label}>
            <span className="hero-robot-badge-icon">{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-robot-figure">
        <div className="hero-robot-ring" />
        <div className="hero-robot-ring hero-robot-ring--inner" />

        <picture>
          <source srcSet="/hero-robot.webp" type="image/webp" />
          <img
            className="hero-robot-img"
            src="/hero-robot.png"
            alt=""
            width={682}
            height={1024}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
