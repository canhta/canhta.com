import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Who is behind the page, in the one sentence we can stand behind and no names
 * or numbers we cannot show, set large on its own white band.
 */
export function About({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).about

  return (
    <section aria-labelledby="about-title" className="band sheet ground-white">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-14">
        <h2 id="about-title" className="subtitle lg:col-span-3">
          {copy.heading}
        </h2>
        <p className="max-w-[26ch] text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] leading-[1.22] font-bold tracking-[-0.03em] lg:col-span-9">
          {copy.proof}
        </p>
      </div>
    </section>
  )
}
