import { Link, Route, Routes } from "react-router-dom";
import logo from "./assets/images/logo-contratachat.png";


// Lista de links do menu. Os links com # levam para seções dentro da mesma página.
const menuLinks = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Benefícios", href: "/#beneficios" },
  { label: "FAQ", href: "/#faq" },
];

// Etapas principais do processo da ContrataChat.
const steps = [
  {
    number: "01",
    icon: "Vaga",
    title: "Cadastre a vaga",
    text: "Informe requisitos, perguntas e critérios de qualificação para a IA seguir.",
  },
  {
    number: "02",
    icon: "Busca",
    title: "Escolha onde procurar",
    text: "Organize candidatos vindos de currículos, links, indicações e canais próprios.",
  },
  {
    number: "03",
    icon: "Chat",
    title: "Entreviste no WhatsApp",
    text: "O agente conversa, coleta respostas e mantém o candidato dentro do canal que ele já usa.",
  },
  {
    number: "04",
    icon: "OK",
    title: "Contrate com clareza",
    text: "Receba candidatos ranqueados, histórico da conversa e sinais de aderência à vaga.",
  },
];

// Recursos exibidos em cards na landing page.
const features = [
  {
    icon: "IA",
    title: "Agente qualificador",
    text: "Filtra candidatos automaticamente com base nos requisitos definidos pela empresa.",
  },
  {
    icon: "Zap",
    title: "Chat de WhatsApp",
    text: "Centraliza a conversa com candidatos em um fluxo rápido e natural.",
  },
  {
    icon: "RH",
    title: "Gestão de vagas",
    text: "Mantém processos, etapas e candidatos organizados por oportunidade.",
  },
  {
    icon: "Seg",
    title: "Processo cagado",
    text: "Valoriza critérios claros, rastreabilidade e redução de ruído operacional.",
  },
];

// Benefícios de negócio mostrados na seção de benefícios.
const benefits = [
  "Menos tempo triando currículos manualmente.",
  "Mais candidatos respondendo pelo WhatsApp.",
  "Critérios padronizados para cada vaga.",
  "Visão simples dos melhores perfis para avançar.",
];

// Perguntas frequentes. Cada item vira um bloco expansível na página.
const faqs = [
  {
    question: "A ContrataChat substitui o recrutador?",
    answer:
      "Não. A plataforma automatiza etapas repetitivas para o recrutador focar na decisão e no relacionamento.",
  },
  {
    question: "Preciso mudar meu processo atual?",
    answer:
      "Não necessariamente. A ideia é encaixar a IA nas etapas de triagem, qualificação e comunicação.",
  },
  {
    question: "Funciona para qualquer tipo de vaga?",
    answer:
      "Funciona melhor quando a vaga tem critérios claros, perguntas objetivas e volume de candidatos para organizar.",
  },
];

// Métricas fictícias usadas apenas para deixar o painel do hero mais visual.
const stats = [
  { value: "248", label: "candidatos triados" },
  { value: "86%", label: "aderência média" },
  { value: "32h", label: "economizadas" },
];

// O componente App controla quais páginas aparecem conforme a URL.
export default function App() {
  return (
    <>
      <Header />

      {/* Routes define as páginas do projeto. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

// Header é o cabeçalho do site, com logo, links de navegação e botão de contato.
function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Voltar para o início">
        <img src={logo} alt="ContrataChat" />
      </Link>

      <nav className="nav-links" aria-label="Menu principal">
        {menuLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}

        <Link className="button button-small" to="/contato">
          Solicitar demo
        </Link>
      </nav>
    </header>
  );
}

// HomePage monta a landing page completa.
function HomePage() {
  return (
    <main>
      <section className="hero-section" id="inicio">
        <div className="hero-content">
          <span className="eyebrow">IA para contratação via WhatsApp</span>
          <h1>ContrataChat</h1>
          <p>
            Plataforma de contratação com IA via WhatsApp para qualificar candidatos, organizar etapas e acelerar
            decisões de recrutamento.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/contato">
              Solicitar demo
            </Link>
            <a className="button button-ghost" href="#como-funciona">
              Ver processo
            </a>
          </div>
        </div>

        <HeroPanel />
      </section>

      <section className="section" id="como-funciona">
        <SectionTitle
          eyebrow="3 passos simples"
          title="Do cadastro da vaga à lista dos melhores candidatos"
          text="A ContrataChat ajuda seu time a transformar critérios da vaga em conversas guiadas no WhatsApp."
        />

        <div className="cards-grid">
          {steps.map((step) => (
            <article className="info-card" key={step.title}>
              <span className="card-number">{step.number}</span>
              <span className="text-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted-section" id="recursos">
        <SectionTitle
          eyebrow="Recursos"
          title="Tudo que importa para uma triagem mais limpa"
          text="Componentes simples, pensados para reduzir trabalho manual e manter o processo rastreável."
        />

        <div className="cards-grid">
          {features.map((feature) => (
            <article className="info-card" key={feature.title}>
              <span className="text-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="beneficios">
        <div>
          <SectionTitle
            eyebrow="Benefícios"
            title="Mais velocidade para contratar com critério"
            text="A automação entra onde há repetição. A decisão continua humana, com dados melhores para escolher."
          />

          <ul className="benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span className="check-icon">OK</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="whatsapp-preview">
          <span className="text-icon">Zap</span>
          <h3>Fluxo conectado ao WhatsApp</h3>
          <p>
            O candidato responde no próprio chat e o recrutador acompanha o resumo para avançar quem tem mais aderência.
          </p>
        </div>
      </section>

      <section className="section" id="faq">
        <SectionTitle
          eyebrow="FAQ"
          title="Perguntas frequentes"
          text="Respostas diretas para entender onde a ContrataChat entra no processo."
        />

        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

// HeroPanel cria o painel visual ao lado do texto principal.
// Ele é feito em HTML e CSS, sem imagem de fundo e sem biblioteca de ícones.
function HeroPanel() {
  return (
    <div className="hero-panel" aria-label="Painel demonstrativo da ContrataChat">
      <div className="chat-card">
        <strong>WhatsApp da vaga</strong>
        <p className="chat-message inbound">Olá! Posso te fazer algumas perguntas sobre sua experiência?</p>
        <p className="chat-message outbound">Pode sim, tenho 3 anos de experiência em marketing digital</p>
        <p className="chat-message inbound">Perfeito vamos te chamar para conversar</p>
      </div>

      <div className="candidate-card">
        <div>
          <span className="eyebrow">Candidato qualificado</span>
          <h3>Mariana Alves</h3>
          <p>Alta aderência para SDR Pleno</p>
        </div>
        <span className="score">86%</span>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// SectionTitle evita repetir a mesma estrutura de título em várias seções.
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

// ContactPage é uma segunda página para demonstrar roteamento real no React.
function ContactPage() {
  // preventDefault impede o navegador de recarregar a página ao enviar o formulário.
  function handleSubmit(event) {
    event.preventDefault();
    alert("Solicitação enviada! Em um projeto real, estes dados iriam para o CRM.");
  }

  return (
    <main className="page-shell">
      <section className="contact-layout">
        <div>
          <span className="eyebrow">Solicitar demo</span>
          <h1>Veja a ContrataChat no seu processo de contratação</h1>
          <p>
            Preencha os dados principais para simular o contato comercial. O formulário está funcional no front-end e
            preparado para integração futura.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>

          <label>
            Empresa
            <input name="company" type="text" placeholder="Nome da empresa" required />
          </label>

          <label>
            WhatsApp
            <input name="whatsapp" type="tel" placeholder="(00) 00000-0000" required />
          </label>

          <label>
            Volume de vagas
            <select name="jobs" required defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option value="1-5">1 a 5 por mês</option>
              <option value="6-20">6 a 20 por mês</option>
              <option value="20+">Mais de 20 por mês</option>
            </select>
          </label>

          <button className="button" type="submit">
            Enviar solicitação
          </button>
        </form>
      </section>
    </main>
  );
}

// NotFoundPage aparece quando o usuário tenta acessar uma rota inexistente.
function NotFoundPage() {
  return (
    <main className="page-shell center-page">
      <span className="eyebrow">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe dentro deste projeto.</p>
      <Link className="button" to="/">
        Voltar para o início
      </Link>
    </main>
  );
}

// Footer é o rodapé com uma frase institucional e links úteis.
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={logo} alt="ContrataChat" />
        <p>Contratação com IA via WhatsApp para times que precisam ganhar velocidade sem perder critério.</p>
      </div>

      <div className="footer-links">
        {menuLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <Link to="/contato">Contato</Link>
      </div>
    </footer>
  );
}
