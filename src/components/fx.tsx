'use client'

import { useEffect } from 'react'
import { afterLoadAndIdle } from '@/lib/idle'

/**
 * Loads the small script that drives the hover and press effects the page needs
 * JavaScript for (see fx-engine.ts): the ripple, the magnetic buttons, the card
 * lean and the header highlight. It renders nothing.
 *
 * The script is requested after load and idle, so none of it competes with the
 * first paint. Until it arrives, every effect that has a CSS-only form (lifts,
 * underlines, colour changes) already works.
 */
export function Fx() {
  useEffect(() => {
    let stop: (() => void) | null = null
    let gone = false
    const cancel = afterLoadAndIdle(() => {
      void import('./fx-engine').then(({ startFx }) => {
        if (!gone) stop = startFx()
      })
    })
    return () => {
      gone = true
      cancel()
      stop?.()
    }
  }, [])

  return null
}
