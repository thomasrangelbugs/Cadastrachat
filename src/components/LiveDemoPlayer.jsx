import { useEffect, useRef, useState } from "react";
import { DEMO_DURATION, DEMO_JOBS, DEMO_STEPS, getDemoScene } from "../data/demoScenes";
import useMediaQuery from "../hooks/useMediaQuery";
import { IconCheck, IconPlay } from "./icons";

const MOBILE_PANELS = [
  { id: "jobs", label: "Vagas", short: "Vagas" },
  { id: "chat", label: "WhatsApp", short: "Chat" },
  { id: "analysis", label: "Análise IA", short: "Análise" },
];

function panelForStep(step) {
  if (step <= 1) return "jobs";
  if (step === 2) return "chat";
  return "analysis";
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CriteriaIcon({ status }) {
  if (status === "pass") return <span className="demo-criteria-icon pass"><IconCheck /></span>;
  if (status === "fail") return <span className="demo-criteria-icon fail">✕</span>;
  if (status === "checking") return <span className="demo-criteria-icon checking" />;
  return <span className="demo-criteria-icon idle" />;
}

function JobsPanel({ scene }) {
  return (
    <>
      <h4>Vagas ativas</h4>
      {DEMO_JOBS.map((job) => (
        <div className={`demo-job-item${job.active ? " active" : ""}`} key={job.name}>
          <strong>{job.name}</strong>
          <span>{job.count} candidatos</span>
        </div>
      ))}

      {scene.funnel && (
        <div className="demo-funnel">
          <h4>Funil da vaga</h4>
          <div className="demo-funnel-row"><span>Recebidos</span><strong>{scene.funnel.received}</strong></div>
          <div className="demo-funnel-row"><span>Triados</span><strong>{scene.funnel.triaged}</strong></div>
          <div className="demo-funnel-row"><span>Em entrevista</span><strong>{scene.funnel.interviewing}</strong></div>
          <div className="demo-funnel-row highlight"><span>Qualificados</span><strong>{scene.funnel.qualified}</strong></div>
          <div className="demo-funnel-row muted"><span>Descartados</span><strong>{scene.funnel.rejected}</strong></div>
        </div>
      )}
    </>
  );
}

function ChatPanel({ scene, showTyping, chatRef }) {
  return (
    <>
      <div className="demo-chat-header">
        <div className="demo-chat-avatar">CC</div>
        <div className="demo-chat-header-text">
          <strong>WhatsApp — {scene.candidateName || "Mariana Alves"}</strong>
          <span>SDR Pleno · Entrevista automática</span>
        </div>
      </div>
      <div className="demo-chat-live demo-chat-thread" ref={chatRef}>
        {(scene.chat || []).map((msg, i) => (
          <div className={`demo-bubble ${msg.type} is-live`} key={i}>
            {msg.text}
          </div>
        ))}
        {showTyping && (
          <div className="demo-typing-live" aria-hidden="true">
            <span /><span /><span />
          </div>
        )}
      </div>
    </>
  );
}

function AnalysisPanel({ scene }) {
  return (
    <>
      {scene.criteria && (
        <div className="demo-criteria-block">
          <h4>Critérios da vaga (pente fino)</h4>
          <ul className="demo-criteria-list">
            {scene.criteria.map((c) => (
              <li key={c.label} className={`demo-criteria-item status-${c.status}`}>
                <CriteriaIcon status={c.status} />
                <div>
                  <span>{c.label}</span>
                  <small>Peso {c.weight}{c.score != null ? ` · ${c.score}%` : ""}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {scene.analyzing && (
        <div className="demo-analyzing">
          <div className="demo-analyzing-bar" />
          <span>IA cruzando respostas com critérios…</span>
        </div>
      )}

      {scene.totalScore != null && (
        <div className="demo-score-card">
          <span>Score de aderência</span>
          <strong>{scene.totalScore}%</strong>
          {scene.breakdown && (
            <div className="demo-breakdown">
              {scene.breakdown.map((b) => (
                <div className="demo-breakdown-row" key={b.label}>
                  <span>{b.label}</span>
                  <div className="demo-breakdown-bar">
                    <div style={{ width: `${b.pct}%` }} />
                  </div>
                  <em>{b.pct}%</em>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {scene.candidates && scene.candidates.length > 0 && (
        <div className="demo-ranking-block">
          <h4>Ranking de candidatos</h4>
          {scene.candidates.map((c, i) => (
            <div className={`demo-rank-card status-${c.status}`} key={c.name}>
              <span className="demo-rank-pos">{i + 1}</span>
              <div className="demo-rank-info">
                <strong>{c.name}</strong>
                <small>{c.breakdown || c.tag}</small>
              </div>
              {c.score != null && <span className="demo-rank-score">{c.score}%</span>}
              <span className={`demo-rank-tag tag-${c.status}`}>{c.tag}</span>
            </div>
          ))}
        </div>
      )}

      {scene.showRejectDetail && scene.rejectDetail && (
        <div className="demo-reject-card">
          <h4>Descarte documentado</h4>
          <strong>{scene.rejectDetail.name}</strong>
          <p>{scene.rejectDetail.reason}</p>
          <ul>
            {scene.rejectDetail.failed.map((f) => (
              <li key={f}>✕ {f}</li>
            ))}
          </ul>
        </div>
      )}

      {scene.exportReady && (
        <div className="demo-export-badge">📋 Lista pronta para exportar ao ATS</div>
      )}
    </>
  );
}

export default function LiveDemoPlayer({ onClose, fullscreen = false }) {
  const isCompact = useMediaQuery("(max-width: 768px)");
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [mobilePanel, setMobilePanel] = useState("jobs");
  const [userPickedPanel, setUserPickedPanel] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const timeRef = useRef(0);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    startRef.current = performance.now() - timeRef.current * 1000;

    function tick(now) {
      const elapsed = (now - startRef.current) / 1000;
      const looped = elapsed % DEMO_DURATION;
      timeRef.current = looped;
      setTime(looped);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [time, mobilePanel]);

  const scene = getDemoScene(time);
  const progress = (time / DEMO_DURATION) * 100;
  const activeStep = scene.step ?? 2;
  const showTyping =
    playing && scene.step === 2 && scene.chat?.length > 0 && scene.chat[scene.chat.length - 1]?.type === "in" && time % 2 < 1.2;

  useEffect(() => {
    if (!isCompact || userPickedPanel) return;
    setMobilePanel(panelForStep(activeStep));
  }, [activeStep, isCompact, userPickedPanel]);

  function handlePanelSelect(id) {
    setMobilePanel(id);
    setUserPickedPanel(true);
  }

  function handlePlayToggle() {
    setPlaying((p) => {
      const next = !p;
      if (next) setUserPickedPanel(false);
      return next;
    });
  }

  const compact = isCompact || fullscreen;
  const toolbarUrl = compact
    ? "ContrataChat — Triagem"
    : "app.contratachat.com.br — Painel de triagem";

  return (
    <div className={`demo-player demo-player--full${compact ? " demo-player--compact" : ""}${fullscreen ? " demo-player--overlay" : ""}`}>
      <div className="demo-player-screen">
        <div className="demo-toolbar">
          <span className="demo-dot red" />
          <span className="demo-dot yellow" />
          <span className="demo-dot green" />
          <span className="demo-url">{toolbarUrl}</span>
          <span className="demo-live-badge">AO VIVO</span>
        </div>

        <div className="demo-phase-bar">
          <span className="demo-phase-text">{scene.phase}</span>
        </div>

        <div className="demo-steps" aria-label="Etapas da demo">
          {DEMO_STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`demo-step${i === activeStep ? " active" : ""}${i < activeStep ? " done" : ""}`}
            >
              <span className="demo-step-num">{i + 1}</span>
              <span className="demo-step-label">{compact ? s.label.split(" ")[0] : s.label}</span>
            </div>
          ))}
        </div>

        {compact && (
          <div className="demo-panel-tabs" role="tablist" aria-label="Painéis da demo">
            {MOBILE_PANELS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={mobilePanel === tab.id}
                className={`demo-panel-tab${mobilePanel === tab.id ? " active" : ""}`}
                onClick={() => handlePanelSelect(tab.id)}
              >
                {compact ? tab.short : tab.label}
              </button>
            ))}
          </div>
        )}

        <div className={`demo-workspace${compact ? " demo-workspace--compact" : ""}`}>
          {!compact ? (
            <>
              <aside className="demo-panel demo-panel-jobs">
                <JobsPanel scene={scene} />
              </aside>
              <div className="demo-panel demo-panel-chat">
                <ChatPanel scene={scene} showTyping={showTyping} chatRef={chatRef} />
              </div>
              <aside className="demo-panel demo-panel-analysis">
                <AnalysisPanel scene={scene} />
              </aside>
            </>
          ) : (
            <>
              <aside
                className={`demo-panel demo-panel-jobs${mobilePanel !== "jobs" ? " is-hidden" : ""}`}
                role="tabpanel"
                hidden={mobilePanel !== "jobs"}
              >
                <JobsPanel scene={scene} />
              </aside>
              <div
                className={`demo-panel demo-panel-chat${mobilePanel !== "chat" ? " is-hidden" : ""}`}
                role="tabpanel"
                hidden={mobilePanel !== "chat"}
              >
                <ChatPanel scene={scene} showTyping={showTyping} chatRef={chatRef} />
              </div>
              <aside
                className={`demo-panel demo-panel-analysis${mobilePanel !== "analysis" ? " is-hidden" : ""}`}
                role="tabpanel"
                hidden={mobilePanel !== "analysis"}
              >
                <AnalysisPanel scene={scene} />
              </aside>
            </>
          )}
        </div>

        {scene.insight && (
          <div className="demo-insight-bar">
            <span aria-hidden="true">💡</span>
            <span className="demo-insight-text">{scene.insight}</span>
          </div>
        )}
      </div>

      <div className="demo-player-controls">
        <button
          type="button"
          className="demo-ctrl-btn"
          onClick={handlePlayToggle}
          aria-label={playing ? "Pausar" : "Reproduzir"}
        >
          {playing ? "⏸" : <IconPlay />}
        </button>
        <span className="demo-ctrl-time">{formatTime(time)}</span>
        <div className="demo-ctrl-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="demo-ctrl-progress" style={{ width: `${progress}%` }} />
        </div>
        <span className="demo-ctrl-time demo-ctrl-time-end">{formatTime(DEMO_DURATION)}</span>
        {onClose && (
          <button type="button" className="demo-ctrl-close" onClick={onClose} aria-label="Fechar demo">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
