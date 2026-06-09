export const blogPosts = [
  {
    slug: "whatsapp-recrutamento-2026",
    date: "2026-03-15",
    readTime: 6,
    cover: "whatsapp",
    pt: {
      title: "Por que o WhatsApp é o canal #1 do recrutamento em 2026",
      excerpt: "Taxas de resposta 3x maiores, menor atrito e conversas naturais. Entenda por que migrar a triagem para o WhatsApp.",
      content: [
        "O recrutamento mudou. Candidatos não querem mais preencher formulários longos ou esperar dias por retorno. Eles querem conversar — e o WhatsApp é onde essa conversa acontece naturalmente.",
        "Dados de operações de RH mostram que a taxa de resposta em e-mail gira em torno de 15-20%, enquanto no WhatsApp ultrapassa 60% em processos bem estruturados.",
        "A ContrataChat automatiza a triagem nesse canal: a IA faz as perguntas certas, registra respostas e ranqueia candidatos — sem perder o tom humano da conversa.",
        "O segredo não é substituir o recrutador, mas eliminar o trabalho repetitivo para que ele foque em quem realmente tem fit com a vaga.",
      ],
    },
    en: {
      title: "Why WhatsApp is the #1 hiring channel in 2026",
      excerpt: "3x higher response rates, less friction and natural conversations.",
      content: [
        "Hiring has changed. Candidates don't want long forms or days of waiting. They want to chat — and WhatsApp is where that happens naturally.",
        "Email response rates hover around 15-20%, while WhatsApp exceeds 60% in well-structured processes.",
        "ContrataChat automates screening on this channel: AI asks the right questions, records answers and ranks candidates.",
        "The goal isn't replacing recruiters, but eliminating repetitive work so they focus on the best fits.",
      ],
    },
    es: {
      title: "Por qué WhatsApp es el canal #1 de reclutamiento en 2026",
      excerpt: "Tasas de respuesta 3x mayores y conversaciones naturales.",
      content: [
        "El reclutamiento cambió. Los candidatos quieren conversar — y WhatsApp es donde eso ocurre naturalmente.",
        "El email ronda 15-20% de respuesta, mientras WhatsApp supera 60%.",
        "ContrataChat automatiza el filtrado: la IA hace preguntas, registra respuestas y rankea candidatos.",
        "No se trata de reemplazar reclutadores, sino de eliminar trabajo repetitivo.",
      ],
    },
  },
  {
    slug: "ia-triagem-candidatos",
    date: "2026-02-28",
    readTime: 5,
    cover: "ai",
    pt: {
      title: "IA na triagem: como qualificar sem perder o critério humano",
      excerpt: "A diferença entre filtrar por palavra-chave e qualificar com contexto real da vaga.",
      content: [
        "Muitas ferramentas de RH ainda dependem de match de palavras-chave no currículo. O problema: um candidato excelente pode ser descartado por não usar o termo exato.",
        "A IA conversacional da ContrataChat conduz entrevistas estruturadas, adaptando follow-ups conforme cada resposta.",
        "O resultado é um score de aderência baseado em critérios que você definiu — não em suposições.",
        "O recrutador recebe um painel com ranking, histórico da conversa e sinais claros para avançar ou descartar.",
      ],
    },
    en: {
      title: "AI in screening: qualify without losing human criteria",
      excerpt: "The difference between keyword filtering and context-based qualification.",
      content: [
        "Many HR tools still rely on keyword matching. Great candidates get discarded for not using the exact term.",
        "ContrataChat's conversational AI runs structured interviews with adaptive follow-ups.",
        "The result is a fit score based on criteria you defined — not assumptions.",
        "Recruiters get a dashboard with ranking, conversation history and clear signals.",
      ],
    },
    es: {
      title: "IA en el filtrado: calificar sin perder criterio humano",
      excerpt: "La diferencia entre filtrar por palabra clave y calificar con contexto.",
      content: [
        "Muchas herramientas dependen de palabras clave. Candidatos excelentes son descartados.",
        "La IA conversacional conduce entrevistas estructuradas con follow-ups adaptativos.",
        "El resultado es un score basado en criterios que tú definiste.",
        "El reclutador recibe ranking, historial y señales claras.",
      ],
    },
  },
  {
    slug: "reduzir-time-to-hire",
    date: "2026-01-10",
    readTime: 7,
    cover: "metrics",
    pt: {
      title: "5 formas de reduzir o time-to-hire com automação inteligente",
      excerpt: "Métricas práticas e ações que times de RH podem implementar esta semana.",
      content: [
        "Time-to-hire alto custa caro: vagas abertas por mais tempo significam perda de produtividade e candidatos desistindo do processo.",
        "Padronize perguntas de triagem para cada vaga. Isso sozinho elimina horas de revisão manual.",
        "Centralize a comunicação no WhatsApp para reduzir o vai-e-vem de e-mails.",
        "Use scores de aderência para priorizar entrevistas — não para substituir julgamento humano.",
        "Automatize follow-ups com candidatos que não responderam em 24h.",
        "Meça cada etapa: tempo de resposta, taxa de conversão por fase e motivos de descarte.",
      ],
    },
    en: {
      title: "5 ways to reduce time-to-hire with smart automation",
      excerpt: "Practical metrics and actions HR teams can implement this week.",
      content: [
        "High time-to-hire is expensive: open roles mean lost productivity and candidate drop-off.",
        "Standardize screening questions per role. This alone saves hours of manual review.",
        "Centralize communication on WhatsApp to reduce email back-and-forth.",
        "Use fit scores to prioritize interviews — not replace human judgment.",
        "Automate follow-ups with candidates who didn't respond in 24h.",
        "Measure each stage: response time, conversion rate and drop-off reasons.",
      ],
    },
    es: {
      title: "5 formas de reducir el time-to-hire con automatización",
      excerpt: "Métricas prácticas que equipos de RRHH pueden implementar.",
      content: [
        "Un time-to-hire alto cuesta caro: vacantes abiertas significan pérdida de productividad.",
        "Estandariza preguntas de filtrado por vacante.",
        "Centraliza la comunicación en WhatsApp.",
        "Usa scores para priorizar entrevistas.",
        "Automatiza follow-ups a las 24h.",
        "Mide cada etapa del proceso.",
      ],
    },
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLocalizedPost(post, lang) {
  const loc = post[lang] || post.pt;
  return { ...post, ...loc };
}
