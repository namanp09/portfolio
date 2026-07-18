# Naman Padiyar — Portfolio

A production-ready developer portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (custom design tokens — dark theme, purple/cyan accents)
- Framer Motion (scroll reveals, hero animation, micro-interactions)
- React Router (project case-study pages)
- React Icons

## Getting started

```bash
npm install
npm run dev       # start local dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint      # lint the codebase
```

## Project structure

```
src/
  components/     # all reusable UI sections (Hero, About, Experience, Projects, etc.)
  pages/          # Home.tsx (assembles sections) and ProjectDetail.tsx (case studies)
  data/           # resumeData.ts, projects.ts, knowledgeBase.ts — all real content lives here
public/
  Naman_Padiyar_Resume.pdf
  favicon.svg, robots.txt, sitemap.xml
```

All resume-derived content (experience, education, skills, achievements, projects) lives in
`src/data/`. To update the site, edit those files — no component code needs to change.

## "Ask Naman AI"

`src/data/knowledgeBase.ts` contains a small JSON knowledge base and a keyword-scoring
`answerQuery()` function. It's intentionally dependency-free so the feature works with **zero
backend and zero API cost**.

**Upgrade path to a real RAG system:**
1. Replace `answerQuery()` with an embeddings-based similarity search (e.g. embed each `KBEntry`
   with OpenAI/Voyage/Cohere embeddings, store in a vector DB like Pinecone/Qdrant/pgvector).
2. On query, embed the user's question, retrieve top-k KB entries, and pass them as context to an
   LLM call (Claude, GPT, etc.) instead of returning the stored `answer` string directly.
3. The `KBEntry` shape (`questions`, `tags`, `answer`) already maps cleanly onto retrieval + generation —
   `tags`/`questions` become the text you embed, `answer` becomes grounding context for the LLM.
4. Swap the `setTimeout` in `AskNamanAI.tsx` for a real `fetch` call to your API route.

## Personalizing content

Before deploying, replace the placeholder URLs in `src/data/resumeData.ts`:

```ts
links: {
   github: 'https://github.com/namanp09',
   linkedin: 'https://linkedin.com/in/<your-handle>',
   leetcode: 'https://leetcode.com/u/naman_padiyar/',
}
```

Also update `github` links inside each project in `src/data/projects.ts`, and add real project
screenshots to `public/projects/<slug>/` (referenced from `ProjectDetail.tsx`).

The contact form currently opens the visitor's email client pre-filled (zero backend required).
To wire it to a real inbox without a backend, swap the `mailto:` logic in `Contact.tsx` for a
service like Formspree or Resend.

## SEO

- Meta tags, Open Graph, and Twitter Card tags are set in `index.html`.
- `public/robots.txt` and `public/sitemap.xml` are included — update the domain once you have one.
- JSON-LD `Person` structured data is embedded in `index.html`.
- Replace `https://namanpadiyar.dev` throughout with your actual deployed domain.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. `vercel.json` is already configured to rewrite all routes to `index.html` so client-side
   routing (`/projects/:slug`) works correctly on refresh/direct links.
5. Deploy — no environment variables required for the base site.

## Accessibility & performance notes

- Semantic HTML landmarks (`header`, `nav`, `main`, `footer`, `article`).
- Visible focus rings (`:focus-visible`) and ARIA labels on icon-only buttons.
- Respects `prefers-reduced-motion`.
- Code-split vendor/motion chunks via `vite.config.ts` `manualChunks`.
- Fonts loaded via `preconnect` + a single Google Fonts request.
