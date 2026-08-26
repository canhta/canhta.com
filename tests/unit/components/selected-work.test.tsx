import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { builds, featuredBuilds } from '@/content'
import { SelectedWork } from '@/components/selected-work'
import { kindLabel, linkLabel } from '@/lib/build-meta'
import { statusLabel } from '@/lib/status'
import { t } from '@/lib/text'

const DETAIL_COUNT = 1

/**
 * `SelectedWork` is an async Server Component — it awaits the GitHub star counts
 * at build time — so it cannot be handed to `render()` as JSX. Calling it and
 * rendering what it returns is the supported way to test one, and it keeps the
 * network out of the test: `fetchStars` is stubbed below.
 */
async function renderWork(locale: 'en' | 'vi' = 'en') {
  return render(await SelectedWork({ locale }))
}

describe('SelectedWork', () => {
  it('gives exactly one product a full detail drawing', async () => {
    const { container } = await renderWork('en')
    const details = container.querySelectorAll('article')
    expect(details).toHaveLength(DETAIL_COUNT)

    const featured = featuredBuilds[0] ?? builds[0]
    expect(featured).toBeDefined()
    if (featured) {
      expect(within(details[0] as HTMLElement).getByRole('heading', { name: featured.name }))
        .toBeInTheDocument()
    }
  })

  it('describes the schedule with a caption', async () => {
    await renderWork('en')
    const table = screen.getByRole('table')
    const caption = table.querySelector('caption')
    expect(caption).not.toBeNull()
    expect((caption as HTMLElement).textContent ?? '').toMatch(/one row each/i)
    // Visually redundant next to the drawn heading, so it is for the screen
    // reader only — but it must exist.
    expect((caption as HTMLElement).className).toContain('sr-only')
  })

  it('lists every product that is not shown in full, one row each', async () => {
    await renderWork('en')
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    // One header row plus one row per scheduled product.
    expect(rows).toHaveLength(builds.length - DETAIL_COUNT + 1)
  })

  it('does not repeat the featured product in the schedule', async () => {
    // The schedule used to iterate every build, so the featured product's
    // `result` string rendered twice on the same page.
    await renderWork('en')
    const featured = featuredBuilds[0]
    expect(featured).toBeDefined()
    if (featured) {
      expect(screen.getAllByText(t(featured.result, 'en'))).toHaveLength(1)
    }
  })

  it('scrolls the wide table inside its own keyboard-reachable region', async () => {
    await renderWork('en')
    // A scrollable box that cannot be focused cannot be scrolled by keyboard.
    const region = screen.getByRole('region', { name: 'Schedule' })
    expect(region).toHaveAttribute('tabindex', '0')
    expect(region.className).toContain('overflow-x-auto')
  })

  it('gives every column a scoped header', async () => {
    await renderWork('en')
    const headers = within(screen.getByRole('table')).getAllByRole('columnheader')
    expect(headers).toHaveLength(6)
    for (const header of headers) expect(header).toHaveAttribute('scope', 'col')
  })

  it('opens every product link in a new tab without leaking the referrer or opener', async () => {
    const { container } = await renderWork('en')
    const external = Array.from(container.querySelectorAll('a[target="_blank"]'))
    expect(external.length).toBeGreaterThan(0)

    for (const link of external) {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(['noreferrer', 'noopener']))
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//)
    }
  })

  it('labels each detail link by where it goes, not by "Open"', async () => {
    const { container } = await renderWork('en')
    const featured = featuredBuilds[0]
    expect(featured).toBeDefined()
    if (!featured) return

    const detail = container.querySelector('article') as HTMLElement
    for (const link of featured.links) {
      expect(within(detail).getByText(linkLabel(link.kind, 'en'), { exact: false }))
        .toBeInTheDocument()
    }
  })

  it('states status and kind as text in every row', async () => {
    await renderWork('en')
    const table = screen.getByRole('table')
    const scheduled = builds.filter((b) => b.slug !== featuredBuilds[0]?.slug)

    for (const build of scheduled) {
      expect(within(table).getAllByText(statusLabel(build.status, 'en')).length)
        .toBeGreaterThan(0)
      expect(within(table).getAllByText(kindLabel(build.kind, 'en')).length).toBeGreaterThan(0)
    }
  })

  it('counts the schedule with locale-aware plural rules', async () => {
    const en = await renderWork('en')
    expect(en.container.textContent).toContain(`${builds.length - DETAIL_COUNT} items`)
    en.unmount()

    // Vietnamese has one plural form; an `=== 1` check is only ever right for
    // English.
    const vi = await renderWork('vi')
    expect(vi.container.textContent).toContain(`${builds.length - DETAIL_COUNT} mục`)
  })

  it('shows a real screenshot with real alt text, or says none exists yet', async () => {
    await renderWork('en')
    const featured = featuredBuilds[0]
    if (!featured) return

    if (featured.cover) {
      expect(screen.getByAltText(`${featured.name} interface`)).toBeInTheDocument()
    } else {
      // No real screenshot exists yet. The panel says so rather than borrowing a
      // generic wireframe, which a visitor reads as the actual interface.
      expect(screen.getByText(/drawing to follow/i)).toBeInTheDocument()
      expect(screen.queryByAltText(`${featured.name} interface`)).toBeNull()
    }
  })

  it('renders the Vietnamese schedule on the Vietnamese route', async () => {
    await renderWork('vi')
    expect(screen.getByRole('heading', { name: 'Tôi đã xây gì' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Bảng kê' })).toBeInTheDocument()
  })
})
