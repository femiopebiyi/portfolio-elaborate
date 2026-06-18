# femi-folio

Brutalist-tech portfolio for Femi Opebiyi — Rust & Solana systems engineer.
Built with Next.js (App Router) + TypeScript. No CSS framework; a hand-written
design system in `app/globals.css`.

## Design

- **Identity:** blueprint grid · terminal phosphor · exposed structure
- **Type:** Space Grotesk (display) + JetBrains Mono (everything structural)
- **Color:** near-black paper, bone ink, hairline grid, one loud accent
  (phosphor lime `#c6f24e`) with a secondary signal blue `#5b8cff`
- **Motion:** hero "boots up" line by line; scroll-reveals and sharp hover
  states elsewhere. Respects `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

Push to GitHub, then import the repo at vercel.com/new — Next.js is detected
automatically, no config needed. Add the custom domain `opebiyi.dev` (or a
subdomain) in Vercel → Settings → Domains.

## Structure

```
app/
├── layout.tsx     fonts + metadata
├── globals.css    the entire design system
└── page.tsx       all sections + project schematics (client component)
```

Content (projects, capabilities, timeline) lives in plain arrays at the top of
`page.tsx` — edit there to update.
