import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from './contact-actions'

/**
 * The ask, on the lime band: giant night type on the left and the three
 * ways to reach us as big rows on the right. Night type on lime is 15.6:1; white would
 * be 1.2:1, so nothing on this band is white.
 */
export function Closing({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).closing

  return (
    <section aria-labelledby="closing-title" className="band sheet ground-accent on-accent">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="reveal lg:col-span-7">
          <h2 id="closing-title" className="closing-title max-w-[11ch]">
            {copy.heading}
          </h2>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug font-bold">{copy.body}</p>
        </div>
        <div className="reveal lg:col-span-5">
          <ContactActions locale={locale} />
        </div>
      </div>
    </section>
  )
}
