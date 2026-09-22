import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
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
export function Answers({ locale }: { locale: Locale }) {
  const { faq } = getSiteContent(locale)
  if (faq.length === 0) return null
  const copy = getMessages(locale).answers

  return (
    <section className="shell band-3">
      <SectionHeading
        kicker={copy.kicker}
        title={copy.heading}
        sub={copy.sub}
      />

      <dl className="mt-10 grid gap-x-12 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.id} className="border-t border-line py-6">
            <dt className="subtitle max-w-[30ch]">{item.question}</dt>
            <dd className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
