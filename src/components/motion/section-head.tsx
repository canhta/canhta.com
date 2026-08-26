'use client'

import { DrawRule, Stamp } from './primitives'

/**
 * A figure opens with its reference stamping in and its rule drawing beneath it.
 * The heading and the note do not animate — a heading you have to wait for is a
 * heading that failed.
 */
export function SectionHead({
  fig,
  title,
  sub,
}: {
  fig: string
  title: string
  sub?: string
}) {
  return (
    <header>
      <div className="flex items-baseline gap-4 pb-3">
        <Stamp className="fig-label shrink-0">{fig}</Stamp>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      <DrawRule weight="ink" delay={0.08} />
      {sub ? <p className="mt-4 max-w-[48ch] text-[15px] text-graphite">{sub}</p> : null}
    </header>
  )
}
