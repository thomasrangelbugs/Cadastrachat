# ContrataChat (Cadastrachat)

Plataforma web de recrutamento e seleção com IA e WhatsApp: cadastro de candidatos, triagem e organização do processo seletivo.

## Como usar

Demo: https://contratachat-beta.vercel.app/

Localmente:

```bash
npm install
npm run dev
```

Para API local junto com o front:

```bash
npm run dev:full
```

Build: `npm run build` — preview: `npm run preview`.

## Linguagem e tecnologias

- **HTML / CSS / JavaScript**
- **React** + **Vite**
- **Node.js / Express** (`server/index.mjs`)
- **Vercel** — hospedagem

## Estrutura do projeto

```
Cadastrachat/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx / main.jsx / pages/ / components/
│   ├── services/          # WhatsApp, CRM, analytics
│   └── i18n/
├── server/index.mjs
└── public/
```

## Autor

Thomas Rangel Bugs
