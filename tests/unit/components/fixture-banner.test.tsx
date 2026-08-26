import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * This banner used to hide itself when `NODE_ENV === 'production'`, on the
 * assumption that the build guard made a production build with fixtures
 * impossible. That assumption dies the moment anyone sets `ALLOW_FIXTURES=1` on
 * a deploy — which is exactly what a preview of unfinished content is. The
 * result was the worst available combination: invented product names and
 * numbers served publicly, with the warning suppressed.
 *
 * So the production case is the case that matters, and it is asserted first.
 */
async function renderBanner(): Promise<void> {
  vi.resetModules()
  const { FixtureBanner } = await import('@/components/fixture-banner')
  render(<FixtureBanner />)
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.doUnmock('@/content')
  vi.resetModules()
})

describe('FixtureBanner', () => {
  it('renders in production, where the warning matters most', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderBanner()

    expect(screen.getByText(/DRAFT/)).toBeInTheDocument()
  })

  it('names exactly which parts are still placeholder', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderBanner()

    // The wording is the whole point: a bare "FIXTURE" tells a visitor nothing.
    // The wording used to claim EVERY name was invented. The projects are real
    // now, so that had become a false statement in the other direction — the
    // banner has to be as accurate as the page it is warning about.
    expect(screen.getByText(/the projects are real; the profile, services and FAQ are still placeholder/i))
      .toBeInTheDocument()
  })

  it('is announced, not hidden from assistive technology', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderBanner()

    const banner = screen.getByText(/DRAFT/)
    expect(banner).not.toHaveAttribute('aria-hidden')
    expect(banner.className).not.toContain('sr-only')
    expect(banner.className).not.toContain('hidden')
  })

  it.each(['development', 'test', 'production'])('renders under NODE_ENV=%s', async (env) => {
    vi.stubEnv('NODE_ENV', env)
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderBanner()

    expect(screen.getByText(/DRAFT/)).toBeInTheDocument()
  })

  it('disappears once the content is real', async () => {
    // The only condition that may silence it.
    vi.doMock('@/content', () => ({ CONTENT_IS_FIXTURE: false }))
    vi.stubEnv('NODE_ENV', 'production')

    vi.resetModules()
    const { FixtureBanner } = await import('@/components/fixture-banner')
    const { container } = render(<FixtureBanner />)

    expect(container).toBeEmptyDOMElement()
  })

  it('is driven by the content flag alone, never by the environment', async () => {
    // A regression would most likely reappear as an env check inside the
    // component, so the source is read directly: this component must not
    // mention NODE_ENV outside its explanatory comment.
    const { readFile } = await import('node:fs/promises')
    const { resolve } = await import('node:path')
    const source = await readFile(
      resolve(process.cwd(), 'src/components/fixture-banner.tsx'),
      'utf8',
    )
    const code = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    expect(code).not.toContain('NODE_ENV')
    expect(code).not.toContain('process.env')
  })
})
