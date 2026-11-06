import type { ReactNode } from 'react'
import { Words } from './words'

/**
 * The top of an inner page: a full-width band with one h1 and one line saying
 * what the page is for. It starts at the very top of the page, behind the
 * floating pill, so the header clearance is part of its padding. `children`
 * sits to the right on a desktop (the contact page puts its rows there).
 * `visual` is a decorative picture that takes the same place (the services
 * page draws its range there); it drops under the text on a smaller screen.
 */
export function PageHeader({
  title,
  intro,
  children,
  visual,
}: {
  title: string
  intro: string
  children?: ReactNode
  visual?: ReactNode
}) {
  const side = children ?? visual
  return (
    <header className="page-head ground-night on-night">
      <div
        className={`shell ${side ? `grid gap-8 lg:grid-cols-12 lg:gap-12 ${children ? 'lg:items-end' : 'lg:items-center'}` : ''}`}
      >
        <div className={side ? 'lg:col-span-7' : ''}>
          <h1 className="headline max-w-[16ch]" aria-label={title}>
            <Words text={title} load />
          </h1>
          <p className="lead enter mt-5 max-w-[46ch]">{intro}</p>
        </div>
        {side ? <div className="enter lg:col-span-5">{side}</div> : null}
      </div>
    </header>
  )
}
