import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile, services } from '@/content'
import { WorkTogether } from '@/components/work-together'
import { t } from '@/lib/text'

describe('WorkTogether', () => {
  it('renders the engagements as one list with one item each', () => {
    render(<WorkTogether locale="en" />)
    const list = screen.getByRole('list')
    expect(within(list).getAllByRole('listitem')).toHaveLength(services.length)
  })

  it('states what you get and when it fits, for every engagement', () => {
    render(<WorkTogether locale="en" />)
    for (const service of services) {
      expect(screen.getByRole('heading', { name: t(service.name, 'en') })).toBeInTheDocument()
      expect(screen.getByText(t(service.output, 'en'))).toBeInTheDocument()
      expect(screen.getByText(t(service.suitedTo, 'en'))).toBeInTheDocument()
    }
  })

  it('offers one real way to start, pointing at the profile CTA', () => {
    render(<WorkTogether locale="en" />)
    const cta = screen.getByRole('link', { name: /book a conversation/i })
    expect(cta).toHaveAttribute('href', profile.ctaHref)
    expect(profile.ctaHref).toMatch(/^mailto:/)
  })

  it('hides the decorative rule and the arrow from assistive technology', () => {
    const { container } = render(<WorkTogether locale="en" />)
    // The hover rule and the CTA arrow carry no information; announcing them
    // would read as noise between the label and the next control.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
    for (const el of Array.from(container.querySelectorAll('[aria-hidden="true"]'))) {
      expect(el.textContent ?? '').not.toMatch(/[a-z]{3}/i)
    }
  })

  it('gives the column labels wording distinct from FIG. 3', async () => {
    // `suited.vi` was once 'Hợp khi', byte-identical to FIG. 3's own column
    // head; two sections shipping one Vietnamese string is the translation
    // saying they were the same section.
    const { CapabilityMatrix } = await import('@/components/capability-matrix')
    // Content is a prop now, not an import: pulling `@/content` into a client
    // component dragged the build-time fixture guard into the browser bundle
    // and threw on every page load.
    const { capabilities } = await import('@/content')
    const work = render(<WorkTogether locale="vi" />)
    const workText = work.container.textContent ?? ''
    work.unmount()

    const matrix = render(<CapabilityMatrix locale="vi" capabilities={capabilities} />)
    const matrixText = matrix.container.textContent ?? ''

    expect(workText).toContain('ĐÚNG LÚC BẠN')
    expect(matrixText).toContain('HỢP VỚI VIỆC')
    expect(workText).not.toContain('HỢP VỚI VIỆC')
  })

  it('renders the Vietnamese copy on the Vietnamese route', () => {
    render(<WorkTogether locale="vi" />)
    expect(screen.getByRole('heading', { name: 'Cách hợp tác' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /đặt lịch nói chuyện/i })).toBeInTheDocument()
  })
})
