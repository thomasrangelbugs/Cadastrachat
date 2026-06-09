const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const formGuid = import.meta.env.VITE_HUBSPOT_FORM_GUID;
const apiUrl = import.meta.env.VITE_API_URL ?? "";

export async function submitToHubSpotForm(lead) {
  if (!portalId || !formGuid) return { skipped: true, reason: "HubSpot não configurado" };

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: lead.name },
          { name: "company", value: lead.company },
          { name: "phone", value: lead.whatsapp },
          { name: "job_volume", value: lead.jobs },
          { name: "message", value: lead.message || "" },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`HubSpot Forms: ${await res.text()}`);
  return res.json();
}

export async function submitToServer(lead) {
  const res = await fetch(`${apiUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erro ao enviar lead");
  return data;
}

export async function submitLead(lead) {
  const results = {};

  try {
    results.hubspot = await submitToHubSpotForm(lead);
  } catch (e) {
    results.hubspot = { error: e.message };
  }

  try {
    results.server = await submitToServer(lead);
  } catch (e) {
    results.server = { error: e.message };
  }

  const hasSuccess = results.hubspot?.inlineMessage || results.server?.ok;

  if (!hasSuccess) {
    const stored = JSON.parse(localStorage.getItem("cc-leads") || "[]");
    stored.push({ ...lead, savedAt: new Date().toISOString() });
    localStorage.setItem("cc-leads", JSON.stringify(stored));
    results.local = true;

    if (results.hubspot?.error && results.server?.error) {
      if (import.meta.env.DEV) return results;
      throw new Error("Não foi possível enviar. Tente novamente ou use o WhatsApp.");
    }
  }

  return results;
}
