<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Evil Buttons — Project Guide

A **shadcn/ui registry** of animated button components (built on **Motion**),
served via a **fumadocs** MDX docs site.

## Stack
- Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (CSS-first `@theme`)
- Motion for animation · `ogl` for WebGL effects · fumadocs-mdx for docs
- **Package manager: pnpm** — run `pnpm` / `pnpm dlx`, never `npm` / `npx`.

## Adding or changing a component (read this first)
Components live in `components/evil-buttons/*.tsx`. The registry is generated,
so a new component is NOT done until it's wired through the whole pipeline.
**Use the `evil-button-docs` skill** — it documents the exact glue:
1. `content/docs/<slug>.mdx` (with a live `<PreviewCard>`)
2. preview wiring in `components/mdx-custom-components.tsx`
3. registry entry in `scripts/build-registry.mjs`
4. verify: `pnpm registry:build && pnpm registry:test && pnpm lint && pnpm build`

## Conventions
- Animations: prefer `transform` / `opacity`; honor `prefers-reduced-motion`.
  Animation is this library's identity — **use the `motion-animations` skill**.
- Use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`), not raw colors.
- SEO is a priority — new docs pages must use the `lib/seo.ts` metadata helpers.
