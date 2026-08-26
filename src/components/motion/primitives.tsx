'use client'

import { m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PEN, ease, penTime } from '@/lib/motion'

/**
 * The page's motion vocabulary — deliberately two things.
 *
 * There used to be a general-purpose `Reveal` and `RevealList` here, and they
 * were applied to roughly forty elements: every heading, every product, every
 * capability column, every FAQ row. The result read as slop, because an effect
 * used everywhere carries no information. It is not a reveal if everything
 * reveals.
 *
 * What is left is one event per section: the figure's rule draws itself at pen
 * speed. Body content is present from first paint and stays present. That is the
 * confident version, and it is also the one that survives a dead observer.
 */

/**
 * Server-rendered content paints visible, so a component that starts hidden must
 * not flip to hidden the instant it hydrates. Nothing animates until mounted, and
 * before that every primitive renders in its finished state.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

const VIEWPORT = { once: true, amount: 0.2 } as const

/** A hairline that draws itself left to right, the way a plotter lays one down. */
export function DrawRule({
  className = '',
  delay = 0,
  weight = 'rule',
}: {
  className?: string
  delay?: number
  weight?: 'rule' | 'ink'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const [span, setSpan] = useState(0)
  const [belowFoldAtLoad, setBelowFoldAtLoad] = useState<boolean | null>(null)

  // A plotter has a speed, not a duration — measure the rule and derive the time.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setSpan(entry?.contentRect.width ?? 0))
    ro.observe(el)
    const r = el.getBoundingClientRect()
    setBelowFoldAtLoad(r.top >= window.innerHeight)
    return () => ro.disconnect()
  }, [])

  /**
   * This used to read `reduced || !mounted || inView`, which retracts.
   *
   * `setMounted(true)` flushes in the same passive-effect pass that calls
   * `observe()`, and the first IntersectionObserverEntry arrives *after* that
   * flush. So there is a guaranteed render with mounted true and inView false —
   * and with `initial={false}` Motion animates an already-drawn rule from
   * scaleX 1 back to 0, then forward again when the observer reports. Any rule
   * on screen at load visibly stutters.
   *
   * Same fix as FIG. 1: a rule may only start undrawn if it was below the fold
   * when the page loaded, so the undrawn state is never rendered where anyone
   * can see it. Null means not measured yet — treat as drawn.
   */
  const drawn = reduced || belowFoldAtLoad !== true || inView

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className={`h-px origin-left ${weight === 'ink' ? 'bg-ink' : 'bg-rule'} ${className}`}
      initial={false}
      animate={{ scaleX: drawn ? 1 : 0 }}
      transition={{
        duration: reduced ? 0 : penTime(span || 600, PEN),
        ease: ease.plot,
        delay: reduced ? 0 : delay,
      }}
    />
  )
}

/**
 * An annotation landing. No travel — mono labels on a drawing are stamped, not
 * slid, so this is opacity plus a hair of scale. Used only on figure references.
 */
export function Stamp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const play = mounted && !reduced && inView

  return (
    <span
      ref={ref}
      className={`${className} ${play ? 'stamp-in' : ''}`}
      style={{ ['--reveal-delay' as string]: `${delay * 1000}ms` }}
    >
      {children}
    </span>
  )
}
