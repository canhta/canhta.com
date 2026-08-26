import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '@/content'
import { TitleBlock } from '@/components/title-block'
import { t } from '@/lib/text'

/**
 * A description list is only a description list to a screen reader if its
 * groupings are legal: `dt`/`dd` pairs either directly under the `dl` or wrapped
 * in a single `div`. Tailwind grid classes make an illegal nesting look
 * identical on screen, which is why this is asserted structurally.
 */
function expectLegalDescriptionList(list: HTMLElement, pairs: number): void {
  const groups = Array.from(list.children)
  expect(groups).toHaveLength(pairs)

  for (const group of groups) {
    expect(group.tagName).toBe('DIV')
    const terms = Array.from(group.children).filter((el) => el.tagName === 'DT')
    const details = Array.from(group.children).filter((el) => el.tagName === 'DD')
    expect(terms).toHaveLength(1)
    expect(details).toHaveLength(1)
  }

  expect(list.querySelectorAll('dt')).toHaveLength(pairs)
  expect(list.querySelectorAll('dd')).toHaveLength(pairs)
}

describe('TitleBlock', () => {
  it('renders one legal dt/dd grouping per spec row', () => {
    const { container } = render(<TitleBlock locale="en" />)
    const list = container.querySelector('dl')
    expect(list).not.toBeNull()
    expectLegalDescriptionList(list as HTMLElement, profile.spec.length)
  })

  it('renders the fact for every label', () => {
    render(<TitleBlock locale="en" />)
    for (const row of profile.spec) {
      expect(screen.getByText(t(row.value, 'en'))).toBeInTheDocument()
    }
  })

  it('uppercases labels with CSS, not with a lossy string transform', () => {
    // Screen readers spell out shouted words; the source text stays sentence
    // case, and the sheet's `annot` class does the shouting. Regression guard
    // against someone reaching for `.toUpperCase()` on the label.
    const { container } = render(<TitleBlock locale="en" />)
    const terms = Array.from(container.querySelectorAll('dt'))
    expect(terms.length).toBeGreaterThan(0)
    for (const term of terms) expect(term.className).toContain('annot')
  })

  it('renders the Vietnamese facts on the Vietnamese route', () => {
    const { container } = render(<TitleBlock locale="vi" />)
    const list = container.querySelector('dl') as HTMLElement
    const first = profile.spec[0]
    expect(first).toBeDefined()
    if (first) expect(within(list).getByText(t(first.value, 'vi'))).toBeInTheDocument()
  })
})
