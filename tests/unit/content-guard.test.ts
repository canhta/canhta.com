/**
 * @vitest-environment node
 *
 * The guard only runs on the server — it is skipped when `window` exists, because
 * a client bundle can never see `ALLOW_FIXTURES` (Next inlines only NEXT_PUBLIC_*
 * variables) and a guard that throws in a browser is an outage, not a safety net.
 *
 * The rest of this suite runs in jsdom, where `window` is defined and the guard
 * would therefore never fire. Testing it there would have asserted nothing while
 * looking green.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * The production guard in `src/content/index.ts` is the last thing standing
 * between placeholder product names and a public deploy, and it runs exactly
 * once — at module evaluation. Every case therefore has to drop the module from
 * the registry and re-import it dynamically; a top-level `import` would be
 * evaluated once, under whichever environment happened to load first, and every
 * assertion after that would be theatre.
 */
async function importContent(): Promise<typeof import('@/content')> {
  vi.resetModules()
  return import('@/content')
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('fixture guard', () => {
  it('refuses a production build when ALLOW_FIXTURES is absent', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', undefined)

    await expect(importContent()).rejects.toThrow(/Refusing to build/)
  })

  it('names the escape hatch in the failure, so the fix is not a guess', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', undefined)

    await expect(importContent()).rejects.toThrow(/ALLOW_FIXTURES=1/)
  })

  it('refuses any value other than exactly "1"', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    for (const value of ['0', 'true', 'yes', '']) {
      vi.stubEnv('ALLOW_FIXTURES', value)
      await expect(importContent()).rejects.toThrow(/Refusing to build/)
    }
  })

  it('allows a production build once ALLOW_FIXTURES=1 is set', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    const content = await importContent()
    expect(content.CONTENT_IS_FIXTURE).toBe(true)
    expect(content.getSiteContent('en').profile.name).toBe('Canh Ta')
  })

  it('does not obstruct development or test runs', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('ALLOW_FIXTURES', undefined)

    await expect(importContent()).resolves.toBeDefined()
  })

  it('reports the content as fixture, which is what arms both the guard and the banner', async () => {
    const { CONTENT_IS_FIXTURE } = await importContent()
    expect(CONTENT_IS_FIXTURE).toBe(true)
  })

  it('finds markers nested inside arrays, not just on the top-level objects', async () => {
    const { getSiteContent } = await importContent()
    const { builds, capabilities, services, faq, social } = getSiteContent('en')

    // The guard's deep scan is only worth as much as the markers it can find.
    // `builds` is deliberately excluded: those projects are real, so they
    // carry no marker. That is the point of a per-item marker rather than a
    // single global flag — content can go real one module at a time, and the
    // guard stays armed until the last placeholder is gone.
    for (const collection of [capabilities, services, faq, social]) {
      expect(collection.length).toBeGreaterThan(0)
      for (const item of collection) {
        expect(item).toHaveProperty('__fixture', true)
      }
    }

    expect(builds.length).toBeGreaterThan(0)
    for (const build of builds) {
      expect(build, 'a real project reintroduced a fixture marker').not.toHaveProperty('__fixture')
    }
  })
})
