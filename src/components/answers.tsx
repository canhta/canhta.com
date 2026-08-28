import { faq } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { SectionHeading } from './section'

/**
 * Answers, not an accordion. Every one is visible at once — hiding the answer to
 * "who owns the code" behind a click is exactly the wrong move on a page whose
 * job is to remove doubt, and it costs a visitor six taps to read six sentences.
 *
 * The `dt`/`dd` pairs are wrapped in a grouping element. Tailwind's grid classes
 * make an illegal `dl` nesting look identical on screen while breaking the
 * pairing a screen reader announces, which is why a test pins the structure.
 */
const COPY = {
  kicker: { en: 'Questions', vi: 'Câu hỏi' },
  heading: { en: 'Before you write to me', vi: 'Trước khi bạn nhắn cho tôi' },
  sub: {
    en: 'The questions I get asked most often.',
    vi: 'Những câu tôi hay được hỏi nhất.',
  },
} as const

export function Answers({ locale }: { locale: Locale }) {
  if (faq.length === 0) return null

  return (
    <section className="shell band-3">
      <SectionHeading
        kicker={t(COPY.kicker, locale)}
        title={t(COPY.heading, locale)}
        sub={t(COPY.sub, locale)}
      />

      <dl className="mt-10 grid gap-x-12 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.id} className="border-t border-line py-6">
            <dt className="subtitle max-w-[30ch]">{t(item.question, locale)}</dt>
            <dd className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-muted">
              {t(item.answer, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
