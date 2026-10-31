import type { ReactNode } from 'react'

/**
 * The top of an inner page: a full-width band with one h1 and one line saying
 * what the page is for. It starts at the very top of the page, behind the
 * floating pill, so the header clearance is part of its padding. `children`
 * sits to the right on a desktop (the contact page puts its rows there).
 */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: ReactNode
}) {
  return (
    <header
      className="page-head ground-night on-night"
    >
      <div className={`shell ${children ? 'grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14' : ''}`}>
        <div className={children ? 'lg:col-span-7' : ''}>
          <h1 className="headline enter max-w-[16ch]">{title}</h1>
          <p className="lead enter enter-1 mt-6 max-w-[46ch]">{intro}</p>
        </div>
        {children ? <div className="enter enter-2 lg:col-span-5">{children}</div> : null}
      </div>
    </header>
  )
}
