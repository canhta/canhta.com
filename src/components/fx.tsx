'use client'

import { useEffect, useRef } from 'react'
import { afterLoadAndIdle } from '@/lib/idle'

/**
 * The pointer follower, and the loader for the small script that drives every
 * hover and press effect on the page (see fx-engine.ts). The markup is inert:
 * `display: none` until the engine switches the follower on, and it is only ever
 * switched on for a fine pointer with motion allowed. It sits on top of the native
 * cursor, never replaces it.
 *
 * The script is requested after load and idle, so none of it competes with the
 * first paint. Until it arrives, every effect that has a CSS-only form (lifts,
 * underlines, colour changes) already works. `open` is the one word the follower
 * shows over a card or a contact row; it arrives as a prop like all copy.
 */
export function Fx({ open }: { open: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let stop: (() => void) | null = null
    let gone = false
    const cancel = afterLoadAndIdle(() => {
      void import('./fx-engine').then(({ startFx }) => {
        if (!gone && ref.current) stop = startFx(ref.current)
      })
    })
    return () => {
      gone = true
      cancel()
      stop?.()
    }
  }, [])

  return (
    <div ref={ref} className="fx-cursor" aria-hidden="true" data-open={open}>
      <span className="fx-ring">
        <span className="fx-ring-i" />
        <span className="fx-label" />
      </span>
      <span className="fx-dot" />
    </div>
  )
}
