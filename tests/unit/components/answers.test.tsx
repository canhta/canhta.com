import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import { Answers } from '@/components/answers'
import { getMessages } from '@/i18n/messages'

const { faq } = getSiteContent('en')
const copy = getMessages('en').answers

/**
 * The list structure here was a real bug: the `dt`/`dd` pairs were not wrapped
 * in a grouping `div`, which makes the markup an invalid description list and
 * breaks the pairing a screen reader announces. It is pinned rather than
 * described, because it looks correct on screen either way.
 */
describe('Answers', () => {
  it('wraps every question and answer in one legal grouping div', () => {
    const { container } = render(<Answers locale="en" />)
    const list = container.querySelector('dl')
    expect(list).not.toBeNull()

    const groups = Array.from((list as HTMLElement).children)
    expect(groups).toHaveLength(faq.length)

    for (const group of groups) {
      expect(group.tagName).toBe('DIV')
      expect(Array.from(group.children).filter((el) => el.tagName === 'DT')).toHaveLength(1)
      expect(Array.from(group.children).filter((el) => el.tagName === 'DD')).toHaveLength(1)
    }
  })

  it('answers every question in the open, with no disclosure widget', () => {
    const { container } = render(<Answers locale="en" />)

    for (const item of faq) {
      expect(screen.getByText(item.question)).toBeInTheDocument()
      expect(screen.getByText(item.answer)).toBeInTheDocument()
    }

    // Hiding "who owns the code" behind a click is the wrong move on a page
    // whose job is to remove doubt.
    expect(container.querySelector('details')).toBeNull()
    expect(container.querySelector('summary')).toBeNull()
    expect(container.querySelector('[aria-expanded]')).toBeNull()
    expect(container.querySelector('[hidden]')).toBeNull()
  })

  it('sits under its own heading', () => {
    render(<Answers locale="en" />)
    expect(screen.getByRole('heading', { name: copy.heading })).toBeInTheDocument()
  })
})
