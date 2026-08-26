'use client'

import { m, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PEN, duration, ease, penTime } from '@/lib/motion'

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

/**
 * The page's motion vocabulary, in one place.
 *
 * The direction is a technical drawing, so the motion is a plotter working:
 * rules draw rather than fade, annotations land like a stamp, rows register in
 * sequence. Nothing bounces, nothing floats.
 *
 * Every primitive collapses to its finished state under reduced motion, and every
 * resting state is the visible one — a failed animation leaves content readable.
 */

const VIEWPORT = { once: true, amount: 0.2 } as const

/** A hairline that draws itself left to right, the way a plotter lays one down. */
export function DrawRule({
  className = '',
  delay = 0,
  weight = 'rule',
  onLength,
}: {
  className?: string
  delay?: number
  weight?: 'rule' | 'ink'
  /** Reports the pen's travel time so callers can sequence against it. */
  onLength?: (seconds: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const [span, setSpan] = useState(0)

  // A plotter has a speed, not a duration — measure the rule and derive the time.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width ?? 0
      setSpan(w)
      onLength?.(penTime(w, PEN))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [onLength])

  const drawn = reduced || !mounted || inView

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
 * slid, so this is opacity plus a hair of scale.
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

/** A block arriving. Short travel, decisive landing. */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
}: {
  children: ReactNode
  delay?: number
  /** Retained for callers; used to scale the pen's travel time. */
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const play = mounted && !reduced && inView

  return (
    <div
      ref={ref}
      className={`${className} ${play ? 'ink-in' : ''}`}
      style={{
        ['--reveal-dur' as string]: `${Math.round(penTime(y * 30, PEN) * 1000)}ms`,
        ['--reveal-delay' as string]: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Rows registering in sequence. The stagger encodes reading order — it is short
 * enough that no row is ever waiting on the one above it to be legible.
 */
export function RevealList({
  children,
  stagger = 0.07,
  className = '',
  itemClassName = '',
  as: As = 'div',
}: {
  children: ReactNode[]
  stagger?: number
  className?: string
  /** Applied to each wrapper. Needed when the wrapper becomes the grid cell. */
  itemClassName?: string
  as?: 'div' | 'ul' | 'dl'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const play = mounted && !reduced && inView
  const Wrap = As as 'div'
  // `ul > div > li` and `dl > div > dt` are invalid and break list semantics for
  // assistive technology, so the wrapper takes the element the parent requires.
  const Item = (As === 'ul' ? 'li' : 'div') as 'div'

  return (
    <Wrap ref={ref} className={className}>
      {children.map((child, i) => (
        <Item
          key={i}
          className={`${itemClassName} ${play ? 'ink-in' : ''}`}
          style={{
            ['--reveal-dur' as string]: '380ms',
            ['--reveal-delay' as string]: `${Math.round(i * stagger * 1000)}ms`,
          }}
        >
          {child}
        </Item>
      ))}
    </Wrap>
  )
}

/**
 * The margin rule: a drawing sheet has a bound edge, and this one fills as you
 * move down the sheet. Ambient, never competing — it is one pixel wide.
 */
export function MarginProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-full w-px bg-rule lg:block"
    >
      <m.div className="h-full w-px origin-top bg-ink/40" style={{ scaleY }} />
    </div>
  )
}
