import { useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../i18n/I18nContext";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import useMediaQuery from "../hooks/useMediaQuery";
import { IconPlay } from "./icons";
import DemoPreview from "./DemoPreview";
import LiveDemoPlayer from "./LiveDemoPlayer";

const externalUrl = import.meta.env.VITE_DEMO_VIDEO_URL;

function toEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
  }
  if (url.includes("youtube.com/embed")) return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function DemoLivePortal({ title, onClose }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="demo-player-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <LiveDemoPlayer onClose={onClose} fullscreen />
    </div>,
    document.body
  );
}

export default function DemoVideo() {
  const { t } = useI18n();
  const [mode, setMode] = useState("preview");
  const [mobileLive, setMobileLive] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const embedUrl = toEmbedUrl(externalUrl);
  const isLive = mode === "live";
  const showLivePortal = isLive && (isMobile || mobileLive);
  const showLiveInline = isLive && !showLivePortal;

  useBodyScrollLock(showLivePortal);

  function handlePlay() {
    const mobile = isMobileViewport();
    setMobileLive(mobile);

    if (embedUrl && !mobile) {
      setMode("embed");
      return;
    }

    setMode("live");
  }

  function closeLive() {
    setMode("preview");
    setMobileLive(false);
  }

  return (
    <>
      <section className="section section-compact section-dark" id="demo">
        <div className="section-title centered reveal">
          <span className="eyebrow">{t.sections.demoEyebrow}</span>
          <h2>{t.sections.demoTitle}</h2>
          <p>{t.sections.demoText}</p>
        </div>

        <div className="demo-container reveal">
          {mode === "embed" && embedUrl && (
            <div className="demo-video-embed">
              <iframe
                src={embedUrl}
                title={t.sections.demoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {showLiveInline && <LiveDemoPlayer onClose={closeLive} />}

          {mode === "preview" && (
            <button type="button" className="demo-screen" onClick={handlePlay} aria-label={t.sections.demoTitle}>
              <DemoPreview />
              <span className="demo-play-label">
                {isMobile ? "Assistir demo — 52s" : "Assistir demo completa — 52s"}
              </span>
              <span className="demo-play-btn">
                <IconPlay />
              </span>
            </button>
          )}
        </div>
      </section>

      {showLivePortal && <DemoLivePortal title={t.sections.demoTitle} onClose={closeLive} />}
    </>
  );
}
