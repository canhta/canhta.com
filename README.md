# canhta.com

Site for our digital transformation, software and AI services for small
businesses, plus some of our products.

**Live:** [canhta.com](https://canhta.com)

Next.js 16 · React 19 · TypeScript strict · Tailwind 4 · next-intl · pnpm

## The site

- Four pages in two languages: home, services, products and contact. English
  at `/`, `/services`, `/products`, `/contact`; Vietnamese at `/vi`,
  `/vi/dich-vu`, `/vi/san-pham`, `/vi/lien-he`.
- Each page also has a Markdown copy (`/services.md`, `/vi/dich-vu.md`, ...),
  plus `llms.txt` and `llms-full.txt`.
- Type is Be Vietnam Pro. The palette is night (`#131517`) grounds with light
  bands, and one lime accent (`#d1fe17`) for actions.
- Copy lives in `src/content/locales/*.ts` and `messages/*.json`. Components
  never hardcode it, and no client component imports `@/content`.
- The owner's rules for content, voice and design are in `AGENTS.md`.

## Commands

```bash
pnpm dev         # local server
pnpm build       # production build
pnpm typecheck   # tsc --noEmit
pnpm lint        # ESLint
pnpm test        # Vitest unit tests
pnpm test:all    # typecheck + unit tests
```

## Gates

Typecheck, lint, unit tests and build must pass, then a visual check in a real
browser at phone and desktop width, in both languages. There are no browser
end-to-end tests.
