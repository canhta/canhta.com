# canhta.com

A bilingual one-page site — English at `/`, Vietnamese at `/vi` — drawn as a
technical engineering sheet.

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 ·
Motion for React · next-intl · pnpm.

---

## ⚠️ This site is currently running on placeholder content

Every product name, number, claim and FAQ answer in `src/content/*.fixture.ts`
is **invented**. Atlas, Lumen, Kite, Ledger and Plumb are not real products.

A guard in `src/content/index.ts` throws at build time when fixture content is
reachable from a rendered route, so this cannot ship by accident. Three things
currently hold the bypass open, and **all three must be removed together** when
real content lands:

| Where | What it does |
|---|---|
| `vercel.json` → `build.env.ALLOW_FIXTURES` | Lets the deploy build at all |
| `src/app/robots.ts` | Serves a blanket `Disallow: /` so no crawler indexes invented claims under this domain |
| `src/components/fixture-banner.tsx` | Red banner on every page |

The last two are automatic — they key off `CONTENT_IS_FIXTURE` and switch
themselves off the moment the fixtures go. **Only `vercel.json` is manual.**

The flag lives in version control rather than in a dashboard environment
variable on purpose: bypassing a safety guard should be visible in a diff, not
hidden in a settings page nobody reviews.

## Commands

```bash
pnpm dev            # real content only — fails while fixtures are present
pnpm dev:fixtures   # develop against the placeholder content
pnpm build          # production build; the guard applies
pnpm test           # Vitest + React Testing Library    (107 tests)
pnpm test:e2e       # Playwright + axe                   (49 tests)
pnpm test:all       # typecheck + both suites
```

## What still needs real input

Real product screenshots, a photograph, a booking URL, verified social links,
and sign-off on the FAQ answers — those are commercial commitments, not copy.
See `docs/superpowers/specs/2026-08-26-canhta-com-design.md` §17.
