import { Fragment, type CSSProperties } from 'react'

/**
 * A page's first heading, its words rising into place once on arrival (see
 * `.sw` in fx.css). Screen readers get the whole heading as one string; the
 * moving word spans are hidden from them. Headings further down the page stay
 * plain text: one motion per section is enough.
 */
export function Words({ text, load = false }: { text: string; load?: boolean }) {
  if (!load) return text
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? ' ' : null}
            <span className="sw" style={{ '--i': i } as CSSProperties}>
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  )
}
