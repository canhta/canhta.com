import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import { Engagements } from '@/components/engagements'

const { profile, services } = getSiteContent('en')

describe('Engagements', () => {
  it('renders the engagements as one list with one item each', () => {
    render(<Engagements locale="en" />)
    const list = screen.getByRole('list')
    expect(within(list).getAllByRole('listitem')).toHaveLength(services.length)
  })

  it('states what you get and when it fits, for every engagement', () => {
    render(<Engagements locale="en" />)
    for (const service of services) {
      expect(screen.getByRole('heading', { name: service.name })).toBeInTheDocument()
      expect(screen.getByText(service.output)).toBeInTheDocument()
      expect(screen.getByText(service.suitedTo)).toBeInTheDocument()
    }
  })

  it('does not carry its own copy of the page CTA', () => {
    // The primary action was once duplicated in the hero, this section and the
    // footer — three hand-maintained copies of one conversion action, which is
    // how they drift apart. It now appears twice, both times from
    // `ContactActions`, and neither of them is here.
    render(<Engagements locale="en" />)
    expect(
      screen.queryByRole('link', { name: new RegExp(profile.ctaLabel, 'i') }),
    ).toBeNull()
  })
})
