import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { builds } from '@/content'
import { Work } from '@/components/work'
import { kindLabel, linkLabel } from '@/lib/build-meta'
import { statusLabel } from '@/lib/status'
import { t } from '@/lib/text'

/**
 * `Work` is an async Server Component — it awaits the GitHub star counts at
 * build time — so it cannot be handed to `render()` as JSX. Calling it and
 * rendering what it returns is the supported way to test one, and it keeps the
 * network out of the test: `fetch` is stubbed to reject in tests/setup.ts, so
 * `fetchStars` takes its fail-soft path and no star count is asserted.
 */
async function renderWork(locale: 'en' | 'vi' = 'en') {
  return render(await Work({ locale }))
}

describe('Work', () => {
  it('gives every project the same treatment', async () => {
    // The section used to promote one product to a "detail" and demote the rest
    // to rows in a table. With three projects that told a visitor which two you
    // were not proud of, and it built a six-column register to hold two rows.
    const { container } = await renderWork('en')
    const entries = container.querySelectorAll('article')
    expect(entries).toHaveLength(builds.length)

    for (const [i, build] of builds.entries()) {
      expect(
        within(entries[i] as HTMLElement).getByRole('heading', { name: build.name }),
      ).toBeInTheDocument()
    }
  })

  it('states the problem, the build and where it stands for every project', async () => {
    const { container } = await renderWork('en')
    const entries = Array.from(container.querySelectorAll('article'))

    for (const [i, build] of builds.entries()) {
      const entry = within(entries[i] as HTMLElement)
      expect(entry.getByText(t(build.problem, 'en'))).toBeInTheDocument()
      expect(entry.getByText(t(build.built, 'en'))).toBeInTheDocument()
      expect(entry.getByText(t(build.result, 'en'))).toBeInTheDocument()
    }
  })

  it('states status and kind as text, never as colour alone', async () => {
    const { container } = await renderWork('en')
    const entries = Array.from(container.querySelectorAll('article'))

    for (const [i, build] of builds.entries()) {
      const entry = within(entries[i] as HTMLElement)
      expect(entry.getByText(statusLabel(build.status, 'en'))).toBeInTheDocument()
      expect(entry.getByText(kindLabel(build.kind, 'en'))).toBeInTheDocument()
    }
  })

  it('never repeats a project, in a table or anywhere else', async () => {
    // The old schedule iterated every build including the featured one, so that
    // product's `result` string rendered twice on the same page.
    const { container } = await renderWork('en')
    expect(container.querySelector('table')).toBeNull()

    for (const build of builds) {
      expect(screen.getAllByText(t(build.result, 'en'))).toHaveLength(1)
    }
  })

  it('ships no placeholder standing in for a screenshot', async () => {
    // No real screenshot exists for any project. The previous layout gave the
    // featured product a seven-column image panel anyway, which rendered as a
    // 500px hatched box — the largest object in the section, carrying nothing.
    const { container } = await renderWork('en')
    expect(container.querySelector('img')).toBeNull()
    expect(screen.queryByText(/drawing to follow/i)).toBeNull()
  })

  it('opens every project link in a new tab without leaking the referrer or opener', async () => {
    const { container } = await renderWork('en')
    const external = Array.from(container.querySelectorAll('a[target="_blank"]'))
    expect(external.length).toBeGreaterThan(0)

    for (const link of external) {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(['noreferrer', 'noopener']))
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//)
    }
  })

  it('labels each link by where it goes, not by "Open"', async () => {
    const { container } = await renderWork('en')
    const entries = Array.from(container.querySelectorAll('article'))

    for (const [i, build] of builds.entries()) {
      for (const link of build.links) {
        expect(
          within(entries[i] as HTMLElement).getByText(linkLabel(link.kind, 'en'), { exact: false }),
        ).toBeInTheDocument()
      }
    }
  })

  it('counts the projects with locale-aware plural rules', async () => {
    // Vietnamese has one plural form; an `=== 1` check is only ever right for
    // English, and the count is only in the sentence when there is more than one.
    const en = await renderWork('en')
    if (builds.length === 1) {
      expect(en.container.textContent).toContain('One project.')
    } else {
      expect(en.container.textContent).toContain(`${builds.length} projects.`)
    }
    en.unmount()

    const vi = await renderWork('vi')
    if (builds.length === 1) {
      expect(vi.container.textContent).toContain('Một dự án.')
    } else {
      expect(vi.container.textContent).toContain(`${builds.length} dự án.`)
    }
  })

  it('renders the Vietnamese copy on the Vietnamese route', async () => {
    await renderWork('vi')
    expect(screen.getByRole('heading', { name: 'Tôi đã làm gì' })).toBeInTheDocument()
  })
})
