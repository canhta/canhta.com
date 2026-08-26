'use client'

import { m, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { duration, ease } from '@/lib/motion'

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
}: {
  className?: string
  delay?: number
  weight?: 'rule' | 'ink'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className={`h-px origin-left ${weight === 'ink' ? 'bg-ink' : 'bg-rule'} ${className}`}
      initial={false}
      animate={{ scaleX: reduced || inView ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.62, ease: ease.out, delay: reduced ? 0 : delay }}
      style={{ scaleX: reduced ? 1 : undefined }}
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
  const on = reduced || inView

  return (
    <m.span
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.94 }}
      transition={{
        duration: reduced ? 0 : duration.feedback,
        ease: ease.out,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </m.span>
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
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const on = reduced || inView

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : y }}
      transition={{
        duration: reduced ? 0 : duration.reveal,
        ease: ease.out,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </m.div>
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
  const on = reduced || inView
  const MotionAs = (As === 'ul' ? m.ul : As === 'dl' ? m.dl : m.div) as typeof m.div
  // `ul > div > li` and `dl > div > dt` are invalid and break list semantics for
  // assistive technology, so the wrapper takes the element the parent requires.
  const MotionItem = (As === 'ul' ? m.li : m.div) as typeof m.div

  return (
    <MotionAs ref={ref} className={className}>
      {children.map((child, i) => (
        // A real wrapper, not `display: contents` — transforms and opacity do not
        // apply to a box that has been removed from the layout tree.
        <MotionItem
          key={i}
          className={itemClassName}
          initial={false}
          animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
          transition={{
            duration: reduced ? 0 : duration.reveal,
            ease: ease.out,
            delay: reduced ? 0 : i * stagger,
          }}
        >
          {child}
        </MotionItem>
      ))}
    </MotionAs>
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
      <m.div className="h-full w-px origin-top bg-live" style={{ scaleY }} />
    </div>
  )
}
