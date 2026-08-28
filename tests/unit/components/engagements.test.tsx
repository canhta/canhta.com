import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile, services } from '@/content'
import { Engagements } from '@/components/engagements'
import { t } from '@/lib/text'

describe('Engagements', () => {
  it('renders the engagements as one list with one item each', () => {
    render(<Engagements locale="en" />)
    const list = screen.getByRole('list')
    expect(within(list).getAllByRole('listitem')).toHaveLength(services.length)
  })

  it('states what you get and when it fits, for every engagement', () => {
    render(<Engagements locale="en" />)
    for (const service of services) {
      expect(screen.getByRole('heading', { name: t(service.name, 'en') })).toBeInTheDocument()
      expect(screen.getByText(t(service.output, 'en'))).toBeInTheDocument()
      expect(screen.getByText(t(service.suitedTo, 'en'))).toBeInTheDocument()
    }
  })

  it('does not carry its own copy of the page CTA', () => {
    // The primary action was once duplicated in the hero, this section and the
    // footer — three hand-maintained copies of one conversion action, which is
    // how they drift apart. It now appears twice, both times from
    // `ContactActions`, and neither of them is here.
    render(<Engagements locale="en" />)
    expect(
      screen.queryByRole('link', { name: new RegExp(t(profile.ctaLabel, 'en'), 'i') }),
    ).toBeNull()
  })

  it('gives its column labels wording distinct from the scope section', async () => {
    // `suited.vi` was once 'Hợp khi', byte-identical to the scope section's own
    // column head; two sections shipping one Vietnamese string is the
    // translation saying they were the same section.
    const { Capabilities } = await import('@/components/capabilities')
    // Content is a prop, not an import: pulling `@/content` into a component
    // that could end up in a client bundle dragged the build-time fixture guard
    // into the browser and threw on every page load.
    const { capabilities } = await import('@/content')

    const engagements = render(<Engagements locale="vi" />)
    const engagementsText = engagements.container.textContent ?? ''
    engagements.unmount()

    const scope = render(<Capabilities locale="vi" capabilities={capabilities} />)
    const scopeText = scope.container.textContent ?? ''

    expect(engagementsText).toContain('Đúng lúc bạn')
    expect(scopeText).toContain('Hợp với việc')
    expect(engagementsText).not.toContain('Hợp với việc')
  })

  it('renders the Vietnamese copy on the Vietnamese route', () => {
    render(<Engagements locale="vi" />)
    expect(screen.getByRole('heading', { name: 'Ba cách thuê tôi' })).toBeInTheDocument()
  })
})
