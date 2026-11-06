import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Measurement is on in every deployment and off in development.
 *
 * This is asserted against the source rather than by rendering, because the
 * condition is evaluated once at module scope from `process.env` and a wrong
 * gate is invisible at runtime: the page renders perfectly either way.
 */
const LAYOUT = resolve(process.cwd(), 'src/app/[locale]/layout.tsx')
const MEASURE_FILE = resolve(process.cwd(), 'src/components/measure.tsx')

function code(file = LAYOUT): string {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
}

describe('measurement', () => {
  it('renders both Vercel packages from their App Router entry points', () => {
    const source = code(MEASURE_FILE)
    // The `/next` entry point, not the bare package: it reads the App Router's
    // own `useParams`/`usePathname`, so a visit is reported against the route
    // `/[locale]` instead of splitting one page into two unrelated URLs.
    expect(source).toContain("import('@vercel/analytics/next')")
    expect(source).toContain("import('@vercel/speed-insights/next')")
    expect(source).toMatch(/<Analytics\s*\/>/)
    expect(source).toMatch(/<SpeedInsights\s*\/>/)
  })

  it('starts them after the page is idle, not on the way to first paint', () => {
    expect(code(MEASURE_FILE)).toContain('afterLoadAndIdle')
  })

  it('stays off in development, where it is one person reloading', () => {
    // Both packages would otherwise pull their debug scripts and narrate to the
    // console on every local save.
    expect(code()).toMatch(/MEASURE \? <Measure \/>/)
  })
})
