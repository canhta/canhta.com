'use client'

import { m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { duration, ease } from '@/lib/motion'

/**
 * The page's one stamp.
 *
 * `ease.stamp` — a solenoid attack into a dead stop — was previously spent on
 * 11px figure references, where a 110ms attack and a 0.8px blur are literally
 * imperceptible. This number is the only place on the sheet where LIVE red
 * appears at a size a person can see. One stamp per page, or it is a reveal
 * again.
 *
 * Only opacity and transform animate, and the resting state is the visible one:
 * the number is server-rendered and stays legible if nothing here ever runs.
 */
export function ProofStamp({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [belowFoldAtLoad, setBelowFoldAtLoad] = useState<boolean | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setBelowFoldAtLoad(el.getBoundingClientRect().top >= window.innerHeight)
  }, [])

  // Never render the hidden state where it could be seen: same rule as the
  // section rules and FIG. 1.
  const armed = !reduced && belowFoldAtLoad === true
  const landed = !armed || inView

  return (
    <m.p
      ref={ref}
      className="mt-6 flex items-baseline gap-3"
      initial={false}
      animate={{ opacity: landed ? 1 : 0, scale: landed ? 1 : 1.045 }}
      transition={{ duration: armed ? duration.stamp : 0, ease: ease.stamp }}
      style={{ transformOrigin: 'left bottom' }}
    >
      <span className="tnum font-mono text-[44px] leading-none font-medium text-live">
        {value}
      </span>
      <span className="annot">{label.toUpperCase()}</span>
    </m.p>
  )
}
