import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from './contact-actions'

/** A short ask at the end of a page: tell us, we reply within a working day. */
export function Closing({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).closing

  return (
    <section aria-labelledby="closing-title" className="on-navy mt-[var(--rank-1)] bg-navy text-white">
      <div className="reveal shell py-[var(--rank-1)]">
        <h2 id="closing-title" className="headline max-w-[18ch]">
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[44ch] text-[18px] leading-relaxed text-white/75">{copy.body}</p>
        <div className="mt-8">
          <ContactActions locale={locale} tone="dark" />
        </div>
      </div>
    </section>
  )
}
