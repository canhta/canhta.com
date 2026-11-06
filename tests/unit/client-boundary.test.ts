import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * A client component must never import `@/content`.
 *
 * `src/content/index.ts` resolves and checks both locales' copy at module scope.
 * A single `'use client'` file importing it would ship every word of both
 * languages, and that work, to the browser.
 *
 * Content is server data. It reaches a client component as a prop.
 */
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return walk(full)
    return full.endsWith('.tsx') || full.endsWith('.ts') ? [full] : []
  })
}

describe('client boundary', () => {
  const files = [...walk('src/components'), ...walk('src/app')]

  it('finds source files to check', () => {
    expect(files.length).toBeGreaterThan(10)
  })

  it('no client component imports the content module', () => {
    const offenders = files.filter((f) => {
      const src = readFileSync(f, 'utf8')
      if (!/^\s*['"]use client['"]/m.test(src)) return false
      // Type-only imports are erased at compile time and are harmless.
      return /import\s+(?!type\b)[^;]*from\s+['"]@\/content['"]/.test(src)
    })

    expect(offenders, `these ship the content module to the browser: ${offenders.join(', ')}`).toEqual(
      [],
    )
  })
})
