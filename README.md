# canhta.com

Bilingual one-page site — English at `/`, Vietnamese at `/vi`.

**Live:** [canhta.com](https://canhta.com)

Next.js 16 · React 19 · TypeScript strict · Tailwind 4 · next-intl · pnpm

## The direction

An argued page, not a brochure. There are no product screenshots and no metrics
anyone could check, so the thing being sold is the writing and the
reachability — and the design spends its best space on sentences rather than on
image slots waiting to be filled.

Three rules the whole system obeys, all of them enforced by tests:

- **One accent.** Vermilion means "this is real and running", and it also means
  "this is the action". Status is carried by words; colour is never the only
  signal.
- **Serif argues, sans organises.** Newsreader sets everything a visitor is meant
  to read and believe; Be Vietnam Pro sets labels, controls and metadata.
- **Nothing waits on JavaScript to become legible.** There is no
  reveal-on-scroll and no motion library. Every resting state is the visible one.

Sections are ranked rather than evenly spaced: `band-1` for the statement, the
work and the close, `band-2` for process and engagements, `band-3` for scope and
answers. The space between two sections belongs to the second one.

## Status

The projects are real. The profile, engagements and answers are still
placeholder.

A guard in `src/content/index.ts` refuses a production build while any
`__fixture` marker is reachable. `vercel.json` holds `ALLOW_FIXTURES=1` to keep
the deploy green — **delete that block when the last placeholder goes.**

## Commands

```bash
pnpm dev:fixtures   # develop against current content
pnpm build          # production build; the guard applies
pnpm lint           # ESLint (flat config)
pnpm test           # Vitest + RTL          (102)
pnpm test:e2e       # Playwright + axe      (51)
pnpm test:all       # typecheck + both
```

## Notes

- `src/content/` is the only place copy lives; components never hardcode a
  string, and no client component may import `@/content` — a unit test pins it.
- The one interaction is the process panel: choose where the work goes live and
  the steps past that point are marked running. It is a native radio group, so
  one layout serves every width and the keyboard support is the platform's.
- No claim ships without a link that proves it: no invented metrics, no
  testimonials, no screenshots that are not real screenshots.
- Copy is written plainly and in the first person. No em-dash codas, no
  "not X, but Y", no sentences about the page itself.
