import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Answers, not an accordion. Every one is visible at once: hiding "who owns the
 * code" behind a tap is the wrong move on a page whose job is to remove doubt.
 * The heading sits left on a desktop and the answers run down the right, so
 * this band reads differently from the bento above it.
 *
 * The `dt`/`dd` pairs are wrapped in a grouping element so a screen reader keeps
 * the pairing; a test pins the structure.
 */
export function Answers({ locale }: { locale: Locale }) {
  const { faq } = getSiteContent(locale)
  if (faq.length === 0) return null
  const heading = getMessages(locale).services.faqHeading

  return (
    <section aria-labelledby="answers-title" className="band sheet ground-tint">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 id="answers-title" className="title-band section-title reveal self-start lg:col-span-4">
          {heading}
        </h2>
        <dl className="reveal lg:col-span-8">
          {faq.map((item) => (
            <div key={item.id} className="border-t-2 border-ink py-6 first:border-t-0 first:pt-0 lg:first:pt-2">
              <dt className="title max-w-[26ch]">{item.question}</dt>
              <dd className="lead mt-3 max-w-[52ch]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
