import { useState } from "react";
import { StepIcon } from "./icons";

export default function StepsTabs({ steps }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="steps-tabs">
      <div className="steps-tabs-nav" role="tablist" aria-label="Etapas do processo">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`steps-tab-btn${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="steps-tab-num">{s.number}</span>
            <span className="steps-tab-label">{s.title}</span>
          </button>
        ))}
      </div>

      <div className="steps-tab-panel reveal is-visible" role="tabpanel" key={active}>
        <div className="steps-tab-panel-inner">
          <div className="step-icon">
            <StepIcon index={active} />
          </div>
          <div className="steps-tab-copy">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </div>
        <div className="steps-progress" aria-hidden="true">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`steps-progress-dot${i <= active ? " is-done" : ""}${i === active ? " is-current" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Etapa ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
