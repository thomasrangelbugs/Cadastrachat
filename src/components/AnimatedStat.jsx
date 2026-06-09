import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";

export default function AnimatedStat({ stat, delay }) {
  const { t } = useI18n();
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const label = t.stats[stat.labelKey];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(stat.value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div className={`stat-card reveal reveal-delay-${delay + 1}`} ref={ref}>
      <span className="stat-value">
        {value}
        {stat.suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
