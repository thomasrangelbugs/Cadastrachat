import useMediaQuery from "../hooks/useMediaQuery";

export default function DemoPreview() {
  const isCompact = useMediaQuery("(max-width: 768px)");

  if (isCompact) {
    return (
      <div className="demo-screen-inner demo-preview-static demo-preview--mobile">
        <div className="demo-toolbar">
          <span className="demo-dot red" />
          <span className="demo-dot yellow" />
          <span className="demo-dot green" />
          <span className="demo-url">ContrataChat — Triagem</span>
          <span className="demo-preview-badge">52s</span>
        </div>

        <div className="demo-phase-bar">
          <span className="demo-phase-text">Triagem → WhatsApp → Ranking com IA</span>
        </div>

        <div className="demo-preview-mobile-body">
          <div className="demo-panel demo-panel-chat">
            <div className="demo-chat-header demo-chat-header--mini">
              <div className="demo-chat-avatar">CC</div>
              <strong>Mariana Alves · SDR</strong>
            </div>
            <div className="demo-bubble in">Quantos anos em vendas B2B?</div>
            <div className="demo-bubble out">3 anos em SaaS para PMEs.</div>
            <div className="demo-bubble in">Prospecção ativa outbound?</div>
          </div>

          <div className="demo-preview-mobile-side">
            <div className="demo-score-card mini">
              <span>Score</span>
              <strong>89%</strong>
            </div>
            <div className="demo-funnel-row highlight">
              <span>Qualificados</span>
              <strong>4</strong>
            </div>
            <div className="demo-rank-card status-qualified demo-rank-card--mini">
              <strong>Mariana</strong>
              <span className="demo-rank-score">89%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-screen-inner demo-preview-static">
      <div className="demo-toolbar">
        <span className="demo-dot red" />
        <span className="demo-dot yellow" />
        <span className="demo-dot green" />
        <span className="demo-url">app.contratachat.com.br — Painel de triagem</span>
      </div>

      <div className="demo-phase-bar">
        <span className="demo-phase-text">Pente fino completo — da triagem ao ranking</span>
      </div>

      <div className="demo-steps demo-steps--mini">
        {["Vaga", "Triagem", "WhatsApp", "Análise", "Ranking"].map((label, i) => (
          <div className={`demo-step${i === 2 ? " active" : i < 2 ? " done" : ""}`} key={label}>
            <span className="demo-step-num">{i + 1}</span>
            <span className="demo-step-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="demo-workspace demo-workspace--mini">
        <div className="demo-panel demo-panel-jobs">
          <div className="demo-job-item active">
            <strong>SDR Pleno</strong>
            <span>12 candidatos</span>
          </div>
          <div className="demo-funnel">
            <div className="demo-funnel-row highlight"><span>Qualificados</span><strong>4</strong></div>
            <div className="demo-funnel-row muted"><span>Descartados</span><strong>36</strong></div>
          </div>
        </div>

        <div className="demo-panel demo-panel-chat">
          <div className="demo-bubble in">Quantos anos em vendas B2B?</div>
          <div className="demo-bubble out">3 anos em SaaS para PMEs.</div>
          <div className="demo-bubble in">Prospecção ativa outbound?</div>
        </div>

        <div className="demo-panel demo-panel-analysis">
          <div className="demo-score-card mini">
            <span>Score</span>
            <strong>89%</strong>
          </div>
          <div className="demo-rank-card status-qualified">
            <strong>Mariana Alves</strong>
            <span className="demo-rank-score">89%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
