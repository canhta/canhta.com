import { CONTENT_IS_FIXTURE } from '@/content'

/**
 * Shown whenever the content is placeholder — including in production.
 *
 * This used to hide itself when `NODE_ENV === 'production'`, on the assumption
 * that the build guard in `src/content/index.ts` made a production build with
 * fixtures impossible. That assumption breaks the moment anyone sets
 * `ALLOW_FIXTURES=1` on a deploy, which is exactly what a preview of unfinished
 * content is — and the result was the worst possible combination: invented
 * product names and numbers, served publicly, with the warning suppressed.
 *
 * The guard is still the real defence. This is what makes the guard's bypass
 * visible instead of silent.
 */
export function FixtureBanner() {
  if (!CONTENT_IS_FIXTURE) return null
  return (
    <div className="bg-live-text px-4 py-1.5 text-center font-mono text-[11px] tracking-wide text-on-accent">
      FIXTURE CONTENT — every name, claim and number on this page is placeholder
    </div>
  )
}
