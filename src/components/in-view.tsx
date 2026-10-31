'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Plays a small picture once, the first time it is mostly on screen.
 *
 * The server renders the finished picture (data-play="idle"), so with no script,
 * with reduced motion, or if anything here fails, the visitor sees the final
 * state and nothing is missing. When the browser can animate, the picture is
 * "armed" (pieces moved to their start positions) and then "play" settles them.
 * Only transforms change. Children arrive as props, so this file never imports
 * content.
 */
export function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'armed' | 'play'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    // Arm at once: pieces go to their start positions while the picture is off
    // screen, so nothing visibly jumps. The first time it is mostly in view, play.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- arming needs the browser
    setState('armed')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        requestAnimationFrame(() => setState('play'))
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} data-play={state} aria-hidden="true">
      {children}
    </div>
  )
}
