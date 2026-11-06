import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import { Answers } from '@/components/answers'
import { getMessages } from '@/i18n/messages'

const { faq } = getSiteContent('en')
const copy = getMessages('en').services

describe('Answers', () => {
  it('lists every question as its own disclosure, the first three open', () => {
    const { container } = render(<Answers locale="en" />)
    const items = Array.from(container.querySelectorAll('details'))
    expect(items).toHaveLength(faq.length)
    items.forEach((item, i) => {
      expect(item.querySelector('summary')).not.toBeNull()
      expect(item.open).toBe(i < 3)
    })
  })

  it('keeps every answer in the page, open or closed', () => {
    render(<Answers locale="en" />)
    for (const item of faq) {
      expect(screen.getByText(item.question)).toBeInTheDocument()
      expect(screen.getByText(item.answer)).toBeInTheDocument()
    }
  })

  it('sits under its own heading', () => {
    render(<Answers locale="en" />)
    expect(screen.getByRole('heading', { name: copy.faqHeading })).toBeInTheDocument()
  })
})
