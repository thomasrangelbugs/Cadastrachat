import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/api/leads", async (req, res) => {
  const { name, company, whatsapp, jobs, message, source = "website" } = req.body;

  if (!name || !company || !whatsapp) {
    return res.status(400).json({ ok: false, error: "Campos obrigatórios ausentes." });
  }

  const lead = { name, company, whatsapp, jobs, message, source, createdAt: new Date().toISOString() };
  const results = { hubspot: null, rdStation: null, whatsapp: null };

  try {
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      results.hubspot = await submitHubSpot(lead);
    }

    if (process.env.RD_STATION_TOKEN) {
      results.rdStation = await submitRDStation(lead);
    }

    if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      results.whatsapp = await notifyWhatsApp(lead);
    }

    console.log("[lead]", lead, results);
    res.json({ ok: true, lead, integrations: results });
  } catch (error) {
    console.error("[lead error]", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/whatsapp/send", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ ok: false, error: "Destino e mensagem são obrigatórios." });
  }

  try {
    const result = await sendWhatsAppMessage(to, message);
    res.json({ ok: true, result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

async function submitHubSpot(lead) {
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        firstname: lead.name,
        company: lead.company,
        phone: lead.whatsapp,
        job_volume: lead.jobs,
        message: lead.message || "",
        lead_source: lead.source,
      },
    }),
  });

  if (!res.ok) throw new Error(`HubSpot: ${await res.text()}`);
  return res.json();
}

async function submitRDStation(lead) {
  const res = await fetch("https://api.rd.services/platform/conversions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RD_STATION_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "contratachat-demo",
        name: lead.name,
        company_name: lead.company,
        personal_phone: lead.whatsapp,
        cf_volume_vagas: lead.jobs,
        cf_mensagem: lead.message || "",
      },
    }),
  });

  if (!res.ok) throw new Error(`RD Station: ${await res.text()}`);
  return res.json();
}

async function notifyWhatsApp(lead) {
  const adminNumber = process.env.WHATSAPP_NOTIFY_NUMBER;
  if (!adminNumber) return { skipped: true };

  const text = `🆕 Novo lead ContrataChat\n\nNome: ${lead.name}\nEmpresa: ${lead.company}\nWhatsApp: ${lead.whatsapp}\nVagas/mês: ${lead.jobs}\n${lead.message ? `Msg: ${lead.message}` : ""}`;

  return sendWhatsAppMessage(adminNumber, text);
}

async function sendWhatsAppMessage(to, text) {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to.replace(/\D/g, ""),
      type: "text",
      text: { body: text },
    }),
  });

  if (!res.ok) throw new Error(`WhatsApp API: ${await res.text()}`);
  return res.json();
}

app.listen(PORT, () => {
  console.log(`Lead API rodando em http://localhost:${PORT}`);
});
