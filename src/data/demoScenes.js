export const DEMO_DURATION = 52;

export const DEMO_STEPS = [
  { id: "vaga", label: "Cadastro da vaga" },
  { id: "triagem", label: "Triagem inicial" },
  { id: "whatsapp", label: "Entrevista WhatsApp" },
  { id: "analise", label: "Análise IA" },
  { id: "ranking", label: "Ranking final" },
];

export const DEMO_JOBS = [
  { name: "SDR Pleno", count: 12, active: true },
  { name: "Marketing Jr", count: 8, active: false },
  { name: "Designer UI", count: 5, active: false },
];

export const demoScenes = [
  {
    at: 0,
    step: 0,
    phase: "Definindo critérios da vaga SDR Pleno…",
    funnel: { received: 48, triaged: 12, interviewing: 3, qualified: 0, rejected: 36 },
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "pass" },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "pass" },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "idle" },
      { label: "Disponibilidade imediata", weight: "15%", status: "idle" },
      { label: "Inglês intermediário+", weight: "15%", status: "idle" },
    ],
    chat: [],
    candidates: [],
    insight: null,
    candidateName: "Mariana Alves",
  },
  {
    at: 4,
    step: 1,
    phase: "Triagem automática — 48 currículos analisados",
    funnel: { received: 48, triaged: 12, interviewing: 3, qualified: 0, rejected: 36 },
    candidates: [
      { name: "Mariana Alves", score: null, status: "interviewing", tag: "Em entrevista" },
      { name: "Rafael Costa", score: null, status: "interviewing", tag: "Em entrevista" },
      { name: "Lucas Prado", score: null, status: "pending", tag: "Aguardando" },
      { name: "Ana Souza", score: 34, status: "rejected", tag: "Baixa aderência" },
    ],
    insight: "36 candidatos descartados por não atender requisitos mínimos.",
  },
  {
    at: 7,
    step: 2,
    phase: "Entrevista guiada no WhatsApp — Mariana Alves",
    candidates: [],
    totalScore: null,
    breakdown: null,
    showRejectDetail: false,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
    ],
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "idle" },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "idle" },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "idle" },
      { label: "Disponibilidade imediata", weight: "15%", status: "idle" },
      { label: "Inglês intermediário+", weight: "15%", status: "idle" },
    ],
  },
  {
    at: 10,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
    ],
  },
  {
    at: 12,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
    ],
  },
  {
    at: 14,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
    ],
  },
  {
    at: 16,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
    ],
  },
  {
    at: 18,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
      { type: "out", text: "Sim! 2 anos fazendo 60+ ligações/dia com metas de SQL." },
    ],
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "pass", score: 92 },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "checking" },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "idle" },
      { label: "Disponibilidade imediata", weight: "15%", status: "idle" },
      { label: "Inglês intermediário+", weight: "15%", status: "idle" },
    ],
  },
  {
    at: 20,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
      { type: "out", text: "Sim! 2 anos fazendo 60+ ligações/dia com metas de SQL." },
      { type: "in", text: "Qual CRM você já utilizou no dia a dia?" },
    ],
  },
  {
    at: 22,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
      { type: "out", text: "Sim! 2 anos fazendo 60+ ligações/dia com metas de SQL." },
      { type: "in", text: "Qual CRM você já utilizou no dia a dia?" },
      { type: "out", text: "HubSpot e Pipedrive. Sei criar cadências e relatórios." },
    ],
  },
  {
    at: 24,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
      { type: "out", text: "Sim! 2 anos fazendo 60+ ligações/dia com metas de SQL." },
      { type: "in", text: "Qual CRM você já utilizou no dia a dia?" },
      { type: "out", text: "HubSpot e Pipedrive. Sei criar cadências e relatórios." },
      { type: "in", text: "Quando você poderia iniciar, caso selecionada?" },
    ],
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "pass", score: 92 },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "pass", score: 88 },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "pass", score: 90 },
      { label: "Disponibilidade imediata", weight: "15%", status: "checking" },
      { label: "Inglês intermediário+", weight: "15%", status: "idle" },
    ],
  },
  {
    at: 26,
    chat: [
      { type: "in", text: "Olá Mariana! 👋 Sou o assistente da ContrataChat para a vaga SDR Pleno. Posso fazer algumas perguntas rápidas?" },
      { type: "out", text: "Oi! Pode sim, estou disponível agora." },
      { type: "in", text: "Quantos anos de experiência você tem em vendas B2B?" },
      { type: "out", text: "3 anos, focada em SaaS para PMEs." },
      { type: "in", text: "Você já fez prospecção ativa (cold call / outbound)?" },
      { type: "out", text: "Sim! 2 anos fazendo 60+ ligações/dia com metas de SQL." },
      { type: "in", text: "Qual CRM você já utilizou no dia a dia?" },
      { type: "out", text: "HubSpot e Pipedrive. Sei criar cadências e relatórios." },
      { type: "in", text: "Quando você poderia iniciar, caso selecionada?" },
      { type: "out", text: "Imediatamente — já estou em transição." },
    ],
  },
  {
    at: 28,
    step: 3,
    phase: "IA analisando respostas e cruzando critérios…",
    chat: [
      { type: "in", text: "Última pergunta: seu nível de inglês para reuniões?" },
      { type: "out", text: "Intermediário avançado — já apresentei demos em inglês." },
      { type: "in", text: "Perfeito, Mariana! ✅ Entrevista concluída. Seu perfil será analisado agora." },
    ],
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "pass", score: 92 },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "pass", score: 88 },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "pass", score: 90 },
      { label: "Disponibilidade imediata", weight: "15%", status: "pass", score: 95 },
      { label: "Inglês intermediário+", weight: "15%", status: "checking", score: null },
    ],
    insight: "Processando 5 critérios ponderados + histórico da conversa…",
    analyzing: true,
  },
  {
    at: 32,
    step: 3,
    phase: "Pente fino concluído — score de aderência calculado",
    criteria: [
      { label: "Experiência em vendas B2B", weight: "30%", status: "pass", score: 92 },
      { label: "Prospecção ativa (outbound)", weight: "25%", status: "pass", score: 88 },
      { label: "CRM (HubSpot/Pipedrive)", weight: "15%", status: "pass", score: 90 },
      { label: "Disponibilidade imediata", weight: "15%", status: "pass", score: 95 },
      { label: "Inglês intermediário+", weight: "15%", status: "pass", score: 82 },
    ],
    totalScore: 89,
    insight: "Mariana atende 5/5 critérios. Alta aderência para avançar à entrevista com RH.",
    breakdown: [
      { label: "Exp. B2B", pct: 92 },
      { label: "Outbound", pct: 88 },
      { label: "CRM", pct: 90 },
      { label: "Disp. imediata", pct: 95 },
      { label: "Inglês", pct: 82 },
    ],
    analyzing: false,
  },
  {
    at: 36,
    step: 4,
    phase: "Ranking atualizado — melhores perfis para a vaga",
    funnel: { received: 48, triaged: 12, interviewing: 1, qualified: 4, rejected: 36 },
    candidates: [
      { name: "Mariana Alves", score: 89, status: "qualified", tag: "⭐ Top pick", breakdown: "5/5 critérios" },
      { name: "Juliana Mendes", score: 84, status: "qualified", tag: "Alta aderência", breakdown: "4/5 critérios" },
      { name: "Rafael Costa", score: 71, status: "review", tag: "Revisar", breakdown: "3/5 critérios" },
      { name: "Lucas Prado", score: 58, status: "review", tag: "Parcial", breakdown: "2/5 critérios" },
      { name: "Ana Souza", score: 34, status: "rejected", tag: "Descartada", breakdown: "Sem outbound" },
    ],
    insight: "4 candidatos qualificados de 48 recebidos. Economia estimada: 28h de triagem.",
  },
  {
    at: 42,
    step: 4,
    phase: "Detalhe do pente fino — candidata descartada",
    showRejectDetail: true,
    rejectDetail: {
      name: "Ana Souza",
      reason: "Sem experiência comprovante em prospecção ativa (requisito obrigatório).",
      failed: ["Prospecção ativa (outbound)", "CRM"],
    },
    candidates: [
      { name: "Mariana Alves", score: 89, status: "qualified", tag: "⭐ Top pick", breakdown: "5/5 critérios" },
      { name: "Juliana Mendes", score: 84, status: "qualified", tag: "Alta aderência", breakdown: "4/5 critérios" },
      { name: "Rafael Costa", score: 71, status: "review", tag: "Revisar", breakdown: "3/5 critérios" },
      { name: "Ana Souza", score: 34, status: "rejected", tag: "Descartada", breakdown: "Sem outbound" },
    ],
    insight: "Cada descarte tem justificativa rastreável no histórico do WhatsApp.",
  },
  {
    at: 48,
    step: 4,
    phase: "Pronto para exportar — lista final para o recrutador",
    exportReady: true,
    candidates: [
      { name: "Mariana Alves", score: 89, status: "qualified", tag: "⭐ Top pick", breakdown: "5/5 critérios" },
      { name: "Juliana Mendes", score: 84, status: "qualified", tag: "Alta aderência", breakdown: "4/5 critérios" },
      { name: "Rafael Costa", score: 71, status: "review", tag: "Revisar", breakdown: "3/5 critérios" },
    ],
    insight: "Recrutador recebe ranking + conversas + scores. Decisão final continua humana.",
  },
];

export function getDemoScene(time) {
  let current = { ...demoScenes[0] };
  for (const scene of demoScenes) {
    if (time >= scene.at) {
      current = { ...current, ...scene };
    }
  }
  return current;
}
