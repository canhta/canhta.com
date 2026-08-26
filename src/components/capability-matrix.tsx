'use client'

import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { capabilities } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { duration, ease } from '@/lib/motion'

const COPY = {
  heading: { en: 'What I can build with you', vi: 'Tôi có thể cùng bạn xây gì' },
  bestFor: { en: 'Best for', vi: 'Hợp khi' },
  canDeliver: { en: 'You get', vi: 'Bạn nhận' },
  engagement: { en: 'How it runs', vi: 'Chạy thế nào' },
} as const

/**
 * A matrix, not an accordion: four areas against three questions is twelve facts,
 * and a drawing sheet can show all twelve at once. Selecting a column raises it
 * rather than revealing it — nothing is hidden behind interaction.
 */
export function CapabilityMatrix({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(capabilities[0]?.id ?? '')
  const reduced = useReducedMotion()

  const rows = [
    { key: 'bestFor', label: COPY.bestFor },
    { key: 'canDeliver', label: COPY.canDeliver },
    { key: 'engagement', label: COPY.engagement },
  ] as const

  return (
    <section className="container-sheet py-20 md:py-24">
      <div className="flex items-baseline gap-4 border-b border-ink pb-3">
        <span className="fig-label shrink-0">FIG. 3</span>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
          {t(COPY.heading, locale)}
        </h2>
      </div>

      <div className="mt-10 grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap) => {
          const isActive = active === cap.id
          return (
            <m.div
              key={cap.id}
              onMouseEnter={() => setActive(cap.id)}
              onFocusCapture={() => setActive(cap.id)}
              initial={false}
              animate={{ backgroundColor: isActive ? '#e8eae7' : '#eff0ee' }}
              transition={{ duration: reduced ? 0 : duration.state, ease: ease.out }}
              className="flex flex-col p-5"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
                <h3 className="text-[17px] font-extrabold tracking-[-0.02em]">
                  {t(cap.name, locale)}
                </h3>
                <m.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : duration.feedback }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-live"
                />
              </div>

              <dl className="flex-1">
                {rows.map((row) => (
                  <div key={row.key} className="border-b border-rule py-3 last:border-b-0">
                    <dt className="annot">{t(row.label, locale).toUpperCase()}</dt>
                    <dd className="mt-1 text-[14px] leading-snug">{t(cap[row.key], locale)}</dd>
                  </div>
                ))}
              </dl>
            </m.div>
          )
        })}
      </div>
    </section>
  )
}
