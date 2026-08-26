# canhta.com

Bilingual one-page site — English at `/`, Vietnamese at `/vi` — drawn as a
technical engineering sheet.

**Live:** [canhta.com](https://canhta.com)

Next.js 16 · React 19 · TypeScript strict · Tailwind 4 · Motion · next-intl · pnpm

## Status

The three projects are real. The profile, services and FAQ are still
placeholder, so a draft banner shows on every page.

A guard in `src/content/index.ts` refuses a production build while any
`__fixture` marker is reachable. `vercel.json` holds `ALLOW_FIXTURES=1` to keep
the deploy green — **delete that block when the last placeholder goes.** The
banner clears itself.

## Commands

```bash
pnpm dev:fixtures   # develop against current content
pnpm build          # production build; the guard applies
pnpm test           # Vitest + RTL          (109)
pnpm test:e2e       # Playwright + axe      (49)
pnpm test:all       # typecheck + both
```

## Notes

- `src/content/` is the only place copy lives; components never hardcode a string.
- FIG. 1 is the one interaction: a section line you drag. Right of it is running,
  left of it is still on paper.
- No claim ships without a link that proves it — no invented metrics, no
  testimonials, no screenshots that are not real screenshots.
