# Evolução FADE

O cérebro operacional da FADE House — cultura, conhecimento, playbooks, produtos e evolução de cada colaborador.

Não é um curso. É a plataforma interna de desenvolvimento profissional da FADE House.

## Stack
- React + Vite
- Tailwind CSS (design tokens: off-white, Verde Império, grafite, marrom couro)
- React Router (HashRouter, compatível com GitHub Pages)
- PWA (vite-plugin-pwa)
- Persistência local via `localStorage` (fase atual — Supabase entra na próxima fase)

## Rodando localmente
```bash
npm install
npm run dev
```

## Deploy
O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push em `main`,
publicando em GitHub Pages. Ative em **Settings → Pages → Source: GitHub Actions**.

## Status
Fundação completa: shell de navegação (13 módulos), Dashboard, busca global (⌘K),
dark/light mode, Biblioteca (sistema de conhecimento completo com CRUD) e
Observações de Campo (registro de campo completo com fotos, nota e backlog de ideias).

Módulos ainda em construção: Playbooks, Produtos, Treinamentos, Liderança,
Hospitalidade, Operação, Marketing, Arquitetura, Laboratório — mesma arquitetura,
conteúdo real a ser adicionado nas próximas etapas.
