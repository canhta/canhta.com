import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Approach } from '@/components/approach'

/**
 * The page's one interaction, and the one that used to fall apart below 1024px.
 *
 * It was a drag on a 1000x360 SVG. Under `lg` the SVG was hidden entirely and
 * replaced by a vertical list plus a separate horizontal slider strip — so on a
 * phone, where most visitors are, the steps ran down the screen while the
 * control ran across it and the spatial argument the control exists to make was
 * simply gone.
 *
 * A radio group has no breakpoint. These tests pin the properties that make that
 * true: it is a real group of real radios, one layout serves every width, and
 * the state it communicates is readable as text rather than as colour.
 */
describe('Approach', () => {
  it('is a native radio group, so keyboard and screen reader support is not hand-rolled', () => {
    render(<Approach locale="en" />)
    const group = screen.getByRole('group', { name: /it goes live/i })
    expect(group.tagName).toBe('FIELDSET')

    const options = screen.getAllByRole('radio')
    expect(options).toHaveLength(4)
    for (const option of options) expect(option).toHaveAttribute('type', 'radio')
  })

  it('has exactly one option selected at rest, and it is the honest one', () => {
    render(<Approach locale="en" />)
    const checked = screen.getAllByRole('radio').filter((r) => (r as HTMLInputElement).checked)
    expect(checked).toHaveLength(1)
    // The default is where Canh actually puts the line, and the copy says so.
    expect(screen.getByText(/This is where I put the line/)).toBeInTheDocument()
  })

  it('marks every step past the line as running, in words', () => {
    render(<Approach locale="en" />)
    // Default is "when it is built": one of four steps runs for real.
    expect(screen.getAllByText('Running for real')).toHaveLength(1)
    expect(screen.getAllByText('Still on paper')).toHaveLength(3)
  })

  it('moves the line when a different option is chosen', async () => {
    const user = userEvent.setup()
    render(<Approach locale="en" />)

    await user.click(screen.getByRole('radio', { name: /as soon as we agree/i }))

    // Three of the four steps are now past the line.
    expect(screen.getAllByText('Running for real')).toHaveLength(3)
    expect(screen.getByText(/Live as soon as we agree what to build/)).toBeInTheDocument()
  })

  it('lets a keyboard move the line with arrow keys, for free', async () => {
    const user = userEvent.setup()
    render(<Approach locale="en" />)

    const radios = screen.getAllByRole('radio')
    await user.click(radios[0] as HTMLElement)
    await user.keyboard('{ArrowRight}')

    expect((radios[1] as HTMLInputElement).checked).toBe(true)
    expect(screen.getByText(/You see it work before it is finished/)).toBeInTheDocument()
  })

  it('keeps the option where nothing ships, because it is the argument', async () => {
    const user = userEvent.setup()
    render(<Approach locale="en" />)

    await user.click(screen.getByRole('radio', { name: /^never$/i }))

    expect(screen.queryByText('Running for real')).toBeNull()
    expect(screen.getByText(/nobody ever uses it/)).toBeInTheDocument()
  })

  it('announces the consequence, which happens away from the control', () => {
    const { container } = render(<Approach locale="en" />)
    expect(container.querySelector('[aria-live="polite"]')).not.toBeNull()
  })

  it('serves one layout at every width, with no breakpoint-only fallback', () => {
    // The regression this replaced: a whole second component behind `lg:hidden`.
    const { container } = render(<Approach locale="en" />)
    const html = container.innerHTML
    expect(html).not.toContain('lg:hidden')
    expect(html).not.toContain('hidden lg:block')
    expect(container.querySelector('svg')).toBeNull()
  })

  it('renders the Vietnamese copy on the Vietnamese route', () => {
    render(<Approach locale="vi" />)
    expect(screen.getByRole('heading', { name: 'Một dự án diễn ra thế nào' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Khi xây xong' })).toBeInTheDocument()
  })
})
