import { Fragment, type CSSProperties } from 'react'

/**
 * A heading's words, each in its own span so CSS can settle them in one by one
 * (see `.sw` in fx.css). The text is the same string with the same spaces, so a
 * screen reader, search and copy-paste see exactly the original heading. `load`
 * is for the first screen of a page (plays once on arrival); without it the words
 * follow the heading as it scrolls into view.
 */
export function Words({ text, load = false }: { text: string; load?: boolean }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? ' ' : null}
      <span className={load ? 'sw sw-load' : 'sw'} style={{ '--i': i } as CSSProperties}>
        {word}
      </span>
    </Fragment>
  ))
}
