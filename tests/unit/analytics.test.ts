import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Measurement must not be gated on the content being finished.
 *
 * The layout used to read `NODE_ENV === 'production' && !CONTENT_IS_FIXTURE`.
 * The live site therefore shipped both Vercel scripts and reported nothing, for
 * as long as any placeholder remained — a measurement setup that silently
 * measures nothing, which you only find out about later, when the numbers you
 * wanted are already gone.
 *
 * This is asserted against the source rather than by rendering, because the
 * condition is evaluated once at module scope from `process.env` and the failure
 * it guards against is invisible at runtime by definition: the page renders
 * perfectly either way.
 */
const LAYOUT = resolve(process.cwd(), 'src/app/[locale]/layout.tsx')

function code(): string {
  return readFileSync(LAYOUT, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
}

describe('measurement', () => {
  it('renders both Vercel packages from their App Router entry points', () => {
    const source = code()
    // The `/next` entry point, not the bare package: it reads the App Router's
    // own `useParams`/`usePathname`, so a visit is reported against the route
    // `/[locale]` instead of splitting one page into two unrelated URLs.
    expect(source).toContain("from '@vercel/analytics/next'")
    expect(source).toContain("from '@vercel/speed-insights/next'")
    expect(source).toMatch(/<Analytics\s*\/>/)
    expect(source).toMatch(/<SpeedInsights\s*\/>/)
  })

  it('is gated on the environment alone, never on whether the content is real', () => {
    const source = code()
    const gate = source.match(/const MEASURE = (.+)/)?.[1] ?? ''
    expect(gate, 'no MEASURE gate found in the layout').not.toBe('')
    expect(gate).toContain("process.env.NODE_ENV === 'production'")
    expect(gate, 'measurement is switched off while the content is fixture again').not.toContain(
      'CONTENT_IS_FIXTURE',
    )
  })

  it('stays off in development, where it is one person reloading', () => {
    // Both packages would otherwise pull their debug scripts and narrate to the
    // console on every local save.
    expect(code()).toMatch(/MEASURE \? \(/)
  })
})
