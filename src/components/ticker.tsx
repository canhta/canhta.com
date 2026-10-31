'use client'

import { useState } from 'react'

/**
 * One strip of scope words (ERP, CRM, chatbots, ...) that slides sideways. It
 * exists to show breadth at a glance. It is the only looping animation on the
 * site, so it has every way out: it pauses on hover and focus, has a real
 * pause button, and with reduced motion it does not move at all and the words
 * simply wrap. The second copy of the list is hidden from screen readers.
 * Words arrive as props; this file never imports content.
 */
export function Ticker({ words, label, pause }: { words: string[]; label: string; pause: string }) {
  const [paused, setPaused] = useState(false)

  return (
    <section aria-label={label} className="ticker ground-accent on-accent" data-paused={paused}>
      <div className="ticker-bar">
        <div className="ticker-window">
          <div className="ticker-track">
            <ul className="ticker-list">
              {words.map((w) => (
                <li key={w} className="ticker-item" translate="no">
                  {w}
                </li>
              ))}
            </ul>
            <ul className="ticker-list ticker-copy" aria-hidden="true">
              {words.map((w) => (
                <li key={w} className="ticker-item" translate="no">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button type="button" className="ticker-btn" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
          <span aria-hidden="true" className="ticker-icon" data-paused={paused} />
          <span className="sr-only">{pause}</span>
        </button>
      </div>
    </section>
  )
}
