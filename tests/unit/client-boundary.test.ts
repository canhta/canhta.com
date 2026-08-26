import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * A client component must never import `@/content`.
 *
 * This is not a style rule. `src/content/index.ts` runs a build-time guard at
 * module scope, and a single `'use client'` file importing it pulled that guard
 * into the browser bundle — where Next inlines NODE_ENV as 'production' but does
 * not inline ALLOW_FIXTURES, because only NEXT_PUBLIC_* variables reach the
 * client. The guard therefore read "production, flag missing" and threw on every
 * page load, taking down a deployment whose build had passed.
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

    expect(offenders, `these ship the fixture guard to the browser: ${offenders.join(', ')}`).toEqual(
      [],
    )
  })
})
