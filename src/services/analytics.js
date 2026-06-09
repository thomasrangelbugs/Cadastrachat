let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

  if (gaId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId, { anonymize_ip: true });
  }

  if (plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }
}

export function trackEvent(name, props = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", name, props);
  }

  if (window.plausible) {
    window.plausible(name, { props });
  }

  if (import.meta.env.DEV) {
    console.log("[analytics]", name, props);
  }
}
