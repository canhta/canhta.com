'use client'

import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { capabilities } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { duration, ease } from '@/lib/motion'
import { SectionHead } from '@/components/motion/section-head'

/**
 * `bestFor.vi` used to be 'Hợp khi' — the identical string `work-together.tsx`
 * shipped for its own column head. Two different English labels collapsing to
 * one Vietnamese label is the translation telling you the two sections were
 * saying the same thing. Both were renamed apart.
 *
 * The heading no longer opens with "What": three of four section headings did,
 * which left nothing in the heading rhythm to tell a scanner which one matters.
 */
const COPY = {
  heading: { en: 'Where I can help', vi: 'Tôi giúp được gì' },
  bestFor: { en: 'Best for', vi: 'Hợp với việc' },
  canDeliver: { en: 'You get', vi: 'Bạn nhận' },
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
  ] as const

  return (
    <section className="container-sheet figure-secondary">
      <SectionHead fig="FIG. 3" title={t(COPY.heading, locale)} />

      <div className="mt-10 grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap) => {
          const isActive = active === cap.id
          return (
            <m.div
              key={cap.id}
              onMouseEnter={() => setActive(cap.id)}
              className="relative flex flex-1 flex-col bg-surface p-5"
            >
              {/* A drawn rule marks the active column. A drawing does not change
                  its fill to show selection; the pen marks it.

                  It used to sit on the column's top edge — roughly 300px above
                  where the reader's eye actually is, since they are reading the
                  text at the bottom. On the left edge it runs alongside the text
                  for the column's whole height, which is also the leader-tick
                  vernacular the rest of the sheet uses. */}
              <m.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 origin-top bg-ink"
                initial={false}
                animate={{ scaleY: isActive ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : duration.state, ease: ease.plot }}
              />
              <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
                <h3 className="text-[20px] font-extrabold tracking-[-0.02em]">
                  <button
                    type="button"
                    onFocus={() => setActive(cap.id)}
                    onClick={() => setActive(cap.id)}
                    aria-pressed={isActive}
                    className="text-left underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-ink"
                  >
                    {t(cap.name, locale)}
                  </button>
                </h3>
              </div>

              <dl className="flex-1">
                {rows.map((row) => (
                  <div key={row.key} className="border-b border-rule py-3 last:border-b-0">
                    <dt
                      className={`annot transition-colors duration-150 ${isActive ? 'text-ink' : ''}`}
                    >
                      {t(row.label, locale).toUpperCase()}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-snug">{t(cap[row.key], locale)}</dd>
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
