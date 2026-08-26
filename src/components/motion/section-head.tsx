'use client'

import { DrawRule, Reveal, Stamp } from './primitives'

/**
 * Every figure on the sheet opens the same way: the reference stamps in, the
 * title arrives, then the rule is drawn beneath it. Three beats, ~0.5s total —
 * short enough that the heading is never what you are waiting for.
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
        <Reveal delay={0.08} y={10}>
          <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>
      </div>
      <DrawRule weight="ink" delay={0.16} />
      {sub ? (
        <Reveal delay={0.26} y={8}>
          <p className="mt-4 max-w-[48ch] text-[16px] text-graphite">{sub}</p>
        </Reveal>
      ) : null}
    </header>
  )
}
