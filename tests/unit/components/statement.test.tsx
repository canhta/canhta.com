import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import { Statement } from '@/components/statement'

const { profile } = getSiteContent('en')

/**
 * The fact row is why this file exists.
 *
 * It used to be a bordered `dl` with `md:grid-cols-3 lg:grid-cols-6` and four
 * rows in it. The container carried the top and left rules and each cell
 * carried its own right and bottom rule, so the two empty columns had no bottom
 * edge: at 1440px the table's rule ran the full 1064px while the cells stopped
 * at 708px, and the block visibly broke off in mid-air. It was equally broken at
 * 768px, where four cells in a three-column grid leave two thirds of the second
 * row open.
 *
 * A grid whose column count is written by hand cannot survive a change to the
 * number of facts. The row wraps now, and these tests pin the two properties
 * that keep it honest: one group per fact, and no fixed column count in the
 * markup.
 */
function expectLegalDescriptionList(list: HTMLElement, pairs: number): void {
  const groups = Array.from(list.children)
  expect(groups).toHaveLength(pairs)

  for (const group of groups) {
    expect(group.tagName).toBe('DIV')
    expect(Array.from(group.children).filter((el) => el.tagName === 'DT')).toHaveLength(1)
    expect(Array.from(group.children).filter((el) => el.tagName === 'DD')).toHaveLength(1)
  }

  expect(list.querySelectorAll('dt')).toHaveLength(pairs)
  expect(list.querySelectorAll('dd')).toHaveLength(pairs)
}

describe('Statement', () => {
  it('renders one legal dt/dd grouping per fact', () => {
    const { container } = render(<Statement locale="en" />)
    const list = container.querySelector('dl')
    expect(list).not.toBeNull()
    expectLegalDescriptionList(list as HTMLElement, profile.spec.length)
  })

  it('lays the facts out so a count change cannot leave a hole', () => {
    const { container } = render(<Statement locale="en" />)
    const list = container.querySelector('dl') as HTMLElement
    // A wrapping flow, not a grid with a column count someone has to remember
    // to update. `grid-cols-*` here is the exact bug this replaced.
    expect(list.className).toContain('flex')
    expect(list.className).toContain('flex-wrap')
    expect(list.className).not.toMatch(/grid-cols-\d/)
  })

  it('renders the fact for every label', () => {
    render(<Statement locale="en" />)
    for (const row of profile.spec) {
      expect(screen.getByText(row.value)).toBeInTheDocument()
    }
  })

  it('uppercases labels with CSS, not with a lossy string transform', () => {
    // Screen readers spell out shouted words, so the source text stays sentence
    // case and the `label` class does the shouting. Regression guard against
    // someone reaching for `.toUpperCase()`.
    const { container } = render(<Statement locale="en" />)
    const terms = Array.from(container.querySelectorAll('dt'))
    expect(terms.length).toBeGreaterThan(0)
    for (const term of terms) {
      expect(term.className).toContain('label')
      expect(term.textContent).not.toBe(term.textContent?.toUpperCase())
    }
  })

  it('leads with the hook as the page heading and offers the primary action', () => {
    render(<Statement locale="en" />)
    expect(screen.getByRole('heading', { level: 1, name: profile.hook })).toBeInTheDocument()

    const cta = screen.getByRole('link', { name: new RegExp(profile.ctaLabel, 'i') })
    expect(cta).toHaveAttribute('href', profile.ctaHref)
    expect(profile.ctaHref).toMatch(/^mailto:/)
  })
})
