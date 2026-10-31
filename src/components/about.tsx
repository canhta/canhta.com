import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from './contact-actions'

/**
 * Who is behind the page, in one sentence we can stand behind and no names or
 * numbers we cannot show, then the ask itself with its three ways to reach us.
 * The dark ground is the page's one inversion.
 */
export function About({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).about

  return (
    <section aria-labelledby="about-title" className="on-navy mt-[var(--rank-1)] bg-navy text-white">
      <div className="reveal shell py-[var(--rank-1)]">
        <h2 id="about-title" className="title">
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[34ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-bold">
          {copy.proof}
        </p>
        <div className="mt-8">
          <ContactActions locale={locale} tone="dark" />
        </div>
      </div>
    </section>
  )
}
