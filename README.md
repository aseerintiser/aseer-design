# aseer.design

Source for [aseer.design](https://aseer.design), the portfolio site for Md Aseer Intiser (UX & Product Designer, Human-Technology Interaction). Built with Next.js App Router, TypeScript, and Tailwind CSS v4.

## Status

Early build. The design system, layout primitives, navigation, motion foundation, and page routing are in place; most case-study and page copy is still placeholder pending content work. See commit history for the incremental build order.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static generation)
- TypeScript (strict mode)
- Tailwind CSS v4
- [Motion](https://motion.dev/) for animation, with `prefers-reduced-motion` respected throughout
- Self-hosted variable fonts via `@fontsource-variable` (Fraunces + Inter), no runtime dependency on Google Fonts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (static export of all routes) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/                 Routes (App Router): home, work, research, about, resume
  components/
    layout/            Container, Grid, Section, NavBar, Footer, SkipLink
    ui/                Button, Heading, Text, EvidenceStatusTag, ProjectCard, motion primitives
    case-study/         Reusable seven-section case-study template
  content/             Typed project/site data (no CMS; content lives in code for now)
  lib/                 Motion tokens and shared utilities
```

## Design principles this codebase follows

- WCAG AA contrast, checked for every color pair in both the light and dark (section-alternation) tone sets.
- Semantic HTML, one `<h1>` per page, visible focus states on every interactive element.
- `prefers-reduced-motion` respected globally, with no exceptions for signature motion moments.
- Every metric on the site carries an evidence-status tag (verified / internal / directional) rather than being stated as fact by default.

## License

All rights reserved. This repository is public for review purposes; the code and content are not licensed for reuse.
