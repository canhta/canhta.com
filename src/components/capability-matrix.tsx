'use client'

import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { capabilities } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { duration, ease } from '@/lib/motion'
import { SectionHead } from '@/components/motion/section-head'
import { RevealList } from '@/components/motion/primitives'

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
      <SectionHead fig="FIG. 3" title={t(COPY.heading, locale)} />

      <RevealList
        className="mt-10 grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2 lg:grid-cols-4"
        itemClassName="flex"
        stagger={0.06}
      >
        {capabilities.map((cap) => {
          const isActive = active === cap.id
          return (
            <m.div
              key={cap.id}
              onMouseEnter={() => setActive(cap.id)}
              className="relative flex flex-1 flex-col bg-surface p-5"
            >
              {/* A drawn rule marks the active column. A drawing does not change
                  its fill to show selection; the pen marks it. */}
              <m.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-ink"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: ease.plot }}
              />
              <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
                <h3 className="text-[17px] font-extrabold tracking-[-0.02em]">
                  <button
                    type="button"
                    onFocus={() => setActive(cap.id)}
                    onClick={() => setActive(cap.id)}
                    aria-pressed={isActive}
                    className="text-left"
                  >
                    {t(cap.name, locale)}
                  </button>
                </h3>
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
      </RevealList>
    </section>
  )
}
