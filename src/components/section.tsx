import { Words } from './words'

/**
 * A section opens with its heading and, only when it has a job, one line under
 * it. There is no eyebrow label above the heading: the heading already says
 * what the section is.
 */
export function SectionHeading({
  title,
  sub,
  id,
}: {
  title: string
  sub?: string
  id?: string
}) {
  return (
    <header>
      <h2 id={id} className="section-title max-w-[24ch]">
        <Words text={title} />
      </h2>
      {sub ? <p className="lead mt-4 max-w-[52ch]">{sub}</p> : null}
    </header>
  )
}
