import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * This notice used to hide itself when `NODE_ENV === 'production'`, on the
 * assumption that the build guard made a production build with fixtures
 * impossible. That assumption dies the moment anyone sets `ALLOW_FIXTURES=1` on
 * a deploy — which is exactly what a preview of unfinished content is. The
 * result was the worst available combination: invented copy served publicly,
 * with the warning suppressed.
 *
 * So the production case is the case that matters, and it is asserted first.
 */
async function renderNotice(locale: 'en' | 'vi' = 'en'): Promise<void> {
  vi.resetModules()
  const { DraftNotice } = await import('@/components/draft-notice')
  render(<DraftNotice locale={locale} />)
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.doUnmock('@/content')
  vi.resetModules()
})

describe('DraftNotice', () => {
  it('renders in production, where the warning matters most', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderNotice()

    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('names exactly which parts are still placeholder', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderNotice()

    // The wording is the whole point: a bare "DRAFT" tells a visitor nothing,
    // and a blanket "everything here is invented" is false in the other
    // direction now that the projects are real. The notice has to be as
    // accurate as the page it is warning about.
    expect(
      screen.getByText(/The projects are real\. The profile, engagements and answers are still/i),
    ).toBeInTheDocument()
  })

  it('is translated, like everything else a visitor reads', async () => {
    // It was English on both routes, which made the one element admitting the
    // content is unfinished the one element that was.
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderNotice('vi')

    expect(screen.getByText('Bản nháp')).toBeInTheDocument()
    expect(screen.getByText(/Các dự án là thật/)).toBeInTheDocument()
  })

  it('is announced, not hidden from assistive technology', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderNotice()

    const notice = screen.getByText('Draft')
    expect(notice).not.toHaveAttribute('aria-hidden')
    expect(notice.className).not.toContain('sr-only')
    expect(notice.className).not.toContain('hidden')
  })

  it.each(['development', 'test', 'production'])('renders under NODE_ENV=%s', async (env) => {
    vi.stubEnv('NODE_ENV', env)
    vi.stubEnv('ALLOW_FIXTURES', '1')

    await renderNotice()

    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('disappears once the content is real', async () => {
    // The only condition that may silence it.
    vi.doMock('@/content', () => ({ CONTENT_IS_FIXTURE: false }))
    vi.stubEnv('NODE_ENV', 'production')

    vi.resetModules()
    const { DraftNotice } = await import('@/components/draft-notice')
    const { container } = render(<DraftNotice locale="en" />)

    expect(container).toBeEmptyDOMElement()
  })

  it('is driven by the content flag alone, never by the environment', async () => {
    // A regression would most likely reappear as an env check inside the
    // component, so the source is read directly: this component must not
    // mention NODE_ENV outside its explanatory comment.
    const { readFile } = await import('node:fs/promises')
    const { resolve } = await import('node:path')
    const source = await readFile(resolve(process.cwd(), 'src/components/draft-notice.tsx'), 'utf8')
    const code = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    expect(code).not.toContain('NODE_ENV')
    expect(code).not.toContain('process.env')
  })
})
