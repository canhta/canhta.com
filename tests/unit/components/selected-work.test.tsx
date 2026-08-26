import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { builds, featuredBuilds } from '@/content'
import { SelectedWork } from '@/components/selected-work'
import { kindLabel, linkLabel } from '@/lib/build-meta'
import { statusLabel } from '@/lib/status'
import { t } from '@/lib/text'

const DETAIL_COUNT = 1

describe('SelectedWork', () => {
  it('gives exactly one product a full detail drawing', () => {
    const { container } = render(<SelectedWork locale="en" />)
    const details = container.querySelectorAll('article')
    expect(details).toHaveLength(DETAIL_COUNT)

    const featured = featuredBuilds[0] ?? builds[0]
    expect(featured).toBeDefined()
    if (featured) {
      expect(within(details[0] as HTMLElement).getByRole('heading', { name: featured.name }))
        .toBeInTheDocument()
    }
  })

  it('describes the schedule with a caption', () => {
    render(<SelectedWork locale="en" />)
    const table = screen.getByRole('table')
    const caption = table.querySelector('caption')
    expect(caption).not.toBeNull()
    expect((caption as HTMLElement).textContent ?? '').toMatch(/one row each/i)
    // Visually redundant next to the drawn heading, so it is for the screen
    // reader only — but it must exist.
    expect((caption as HTMLElement).className).toContain('sr-only')
  })

  it('lists every product that is not shown in full, one row each', () => {
    render(<SelectedWork locale="en" />)
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    // One header row plus one row per scheduled product.
    expect(rows).toHaveLength(builds.length - DETAIL_COUNT + 1)
  })

  it('does not repeat the featured product in the schedule', () => {
    // The schedule used to iterate every build, so the featured product's
    // `result` string rendered twice on the same page.
    render(<SelectedWork locale="en" />)
    const featured = featuredBuilds[0]
    expect(featured).toBeDefined()
    if (featured) {
      expect(screen.getAllByText(t(featured.result, 'en'))).toHaveLength(1)
    }
  })

  it('scrolls the wide table inside its own keyboard-reachable region', () => {
    render(<SelectedWork locale="en" />)
    // A scrollable box that cannot be focused cannot be scrolled by keyboard.
    const region = screen.getByRole('region', { name: 'Schedule' })
    expect(region).toHaveAttribute('tabindex', '0')
    expect(region.className).toContain('overflow-x-auto')
  })

  it('gives every column a scoped header', () => {
    render(<SelectedWork locale="en" />)
    const headers = within(screen.getByRole('table')).getAllByRole('columnheader')
    expect(headers).toHaveLength(6)
    for (const header of headers) expect(header).toHaveAttribute('scope', 'col')
  })

  it('opens every product link in a new tab without leaking the referrer or opener', () => {
    const { container } = render(<SelectedWork locale="en" />)
    const external = Array.from(container.querySelectorAll('a[target="_blank"]'))
    expect(external.length).toBeGreaterThan(0)

    for (const link of external) {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(['noreferrer', 'noopener']))
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//)
    }
  })

  it('labels each detail link by where it goes, not by "Open"', () => {
    const { container } = render(<SelectedWork locale="en" />)
    const featured = featuredBuilds[0]
    expect(featured).toBeDefined()
    if (!featured) return

    const detail = container.querySelector('article') as HTMLElement
    for (const link of featured.links) {
      expect(within(detail).getByText(linkLabel(link.kind, 'en'), { exact: false }))
        .toBeInTheDocument()
    }
  })

  it('states status and kind as text in every row', () => {
    render(<SelectedWork locale="en" />)
    const table = screen.getByRole('table')
    const scheduled = builds.filter((b) => b.slug !== featuredBuilds[0]?.slug)

    for (const build of scheduled) {
      expect(within(table).getAllByText(statusLabel(build.status, 'en')).length)
        .toBeGreaterThan(0)
      expect(within(table).getAllByText(kindLabel(build.kind, 'en')).length).toBeGreaterThan(0)
    }
  })

  it('counts the schedule with locale-aware plural rules', () => {
    const en = render(<SelectedWork locale="en" />)
    expect(en.container.textContent).toContain(`${builds.length - DETAIL_COUNT} items`)
    en.unmount()

    // Vietnamese has one plural form; an `=== 1` check is only ever right for
    // English.
    const vi = render(<SelectedWork locale="vi" />)
    expect(vi.container.textContent).toContain(`${builds.length - DETAIL_COUNT} mục`)
  })

  it('gives the detail image a real alternative text', () => {
    render(<SelectedWork locale="en" />)
    const featured = featuredBuilds[0]
    if (featured) {
      expect(screen.getByAltText(`${featured.name} interface`)).toBeInTheDocument()
    }
  })

  it('renders the Vietnamese schedule on the Vietnamese route', () => {
    render(<SelectedWork locale="vi" />)
    expect(screen.getByRole('heading', { name: 'Tôi đã xây gì' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Bảng kê' })).toBeInTheDocument()
  })
})
