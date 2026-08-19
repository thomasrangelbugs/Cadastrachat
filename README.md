# ContrataChat (Cadastrachat)

Plataforma web de recrutamento e seleção com IA e integração WhatsApp: landing, demo, captura de leads e organização de processos seletivos.

## Demonstração

https://contratachat-beta.vercel.app/

## Requisitos

- **Node.js 20+** (recomendado LTS)
- **npm** 10+
- Navegador moderno

## Como usar / rodar localmente

### Somente front-end

```bash
npm install
npm run dev
```

Acesse a URL exibida no terminal (geralmente `http://localhost:5173`).

### Front-end + API de leads (WhatsApp/CRM)

```bash
cp .env.example .env
# Edite .env com tokens reais (opcional para demo estática)
npm install
npm run dev:full
```

### Build e preview

```bash
npm run build
npm run preview
```

## Variáveis de ambiente

Copie `.env.example` para `.env`. Principais chaves:

| Variável | Uso |
|----------|-----|
| `VITE_SITE_URL` | URL canônica do site |
| `VITE_GA_MEASUREMENT_ID` / `VITE_PLAUSIBLE_DOMAIN` | Analytics |
| `VITE_HUBSPOT_*` / `VITE_RD_STATION_TOKEN` | CRM |
| `VITE_WHATSAPP_*` / `WHATSAPP_ACCESS_TOKEN` | WhatsApp Business API |
| `VITE_API_URL` | URL do servidor Express em dev |

Sem tokens, a landing e a demo visual funcionam; integrações reais exigem credenciais.

## Linguagem e tecnologias

- **React 19** + **Vite 7**
- **Express 5** (`server/index.mjs`) — leads e webhooks
- **CSS** modular, i18n, componentes de demo WhatsApp
- **Vercel** — deploy de produção

## Estrutura do projeto

```
Cadastrachat/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example
├── src/
│   ├── App.jsx, main.jsx
│   ├── pages/              # Home, Blog, Contato
│   ├── components/         # Hero, demo, pricing, WhatsApp
│   ├── services/           # whatsapp, crm, analytics
│   └── i18n/
├── server/index.mjs        # API Express
├── scripts/optimize-images.mjs
└── public/
```

## Deploy

- **Vercel:** conecte o repositório e configure as variáveis `VITE_*` e secrets do servidor.
- Build: `npm run build` — saída em `dist/`.

## Limitações

- Integrações WhatsApp/CRM são opcionais e dependem de credenciais externas.
- Formulários de demonstração não substituem fluxo de produção com LGPD/consentimento.

## Repositório

[thomasrangelbugs/Cadastrachat](https://github.com/thomasrangelbugs/Cadastrachat)

## Autor

**Thomas Rangel Bugs** — [github.com/thomasrangelbugs](https://github.com/thomasrangelbugs)
