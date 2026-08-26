import { faq } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

const COPY = {
  heading: { en: 'Before you write to me', vi: 'Trước khi bạn nhắn cho tôi' },
  sub: {
    en: 'The things people ask first, answered without the hedging.',
    vi: 'Những câu người ta hỏi đầu tiên, trả lời thẳng.',
  },
} as const

/**
 * Answers, not an accordion. Every one is visible at once — hiding the answer to
 * "who owns the code" behind a click is exactly the wrong move on a page whose
 * job is to remove doubt.
 */
export function Faq({ locale }: { locale: Locale }) {
  if (faq.length === 0) return null

  return (
    <section className="container-sheet py-20 md:py-24">
      <div className="flex items-baseline gap-4 border-b border-ink pb-3">
        <span className="fig-label shrink-0">NOTES</span>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
          {t(COPY.heading, locale)}
        </h2>
      </div>
      <p className="mt-4 max-w-[48ch] text-[16px] text-graphite">{t(COPY.sub, locale)}</p>

      <dl className="mt-10 grid gap-x-10 md:grid-cols-2">
        {faq.map((item, i) => (
          <div key={item.id} className="border-t border-rule py-6">
            <dt className="flex gap-3">
              <span className="fig-label mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[17px] font-bold tracking-[-0.02em]">
                {t(item.question, locale)}
              </span>
            </dt>
            <dd className="mt-2 max-w-[46ch] pl-9 text-[15px] leading-relaxed text-graphite">
              {t(item.answer, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
