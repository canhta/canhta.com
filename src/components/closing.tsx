import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from './contact-actions'

/**
 * The end of the argument, and the only place on the page that inverts.
 *
 * A visitor who has read this far has already met the primary action once, at
 * the top, and has spent four sections deciding. Ink ground is the one piece of
 * contrast the page spends, and it is spent here — where the reading order ends
 * and the decision is made — rather than on decorating a section head.
 *
 * There used to be a third copy of this CTA in the footer, roughly 250px below,
 * with the plain email address forty pixels from that: three doors to one inbox.
 * The address is a genuinely different affordance (copy it, write later, from
 * somewhere else), so it stays — in the footer, alone.
 */
export function Closing({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).closing

  return (
    <section className="bg-ink text-bg">
      <div className="shell band-1 pb-[var(--rank-1)]">
        <h2 className="title max-w-[20ch]">{copy.heading}</h2>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-bg/70">
          {copy.reassure}
        </p>
        <div className="mt-9">
          <ContactActions locale={locale} invert />
        </div>
      </div>
    </section>
  )
}
