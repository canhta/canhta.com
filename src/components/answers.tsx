import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { SectionHeading } from './section'

/**
 * Answers, not an accordion. Every one is visible at once: hiding "who owns the
 * code" behind a tap is the wrong move on a page whose job is to remove doubt.
 *
 * The `dt`/`dd` pairs are wrapped in a grouping element so a screen reader keeps
 * the pairing; a test pins the structure.
 */
export function Answers({ locale }: { locale: Locale }) {
  const { faq } = getSiteContent(locale)
  if (faq.length === 0) return null
  const heading = getMessages(locale).services.faqHeading

  return (
    <section aria-labelledby="answers-title" className="shell band-1 reveal">
      <SectionHeading id="answers-title" title={heading} />

      <dl className="mt-10 grid gap-x-14 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.id} className="border-t border-line py-6">
            <dt className="subtitle max-w-[30ch]">{item.question}</dt>
            <dd className="mt-2 max-w-[50ch] text-[16px] leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
