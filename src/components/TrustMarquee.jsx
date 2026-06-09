import { useI18n } from "../i18n/I18nContext";
import { IconCheck } from "./icons";

export default function TrustMarquee() {
  const { t } = useI18n();
  const items = t.trustItems.map((key) => {
    const parts = key.split(".");
    return t[parts[0]][parts[1]];
  });
  const doubled = [...items, ...items];

  return (
    <div className="trust-marquee" aria-hidden="true">
      <div className="trust-marquee-track">
        <div className="trust-marquee-group">
          {doubled.map((item, i) => (
            <span className="trust-marquee-item" key={`${item}-${i}`}>
              <IconCheck />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
