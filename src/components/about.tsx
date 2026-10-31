import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/** The owner-approved proof, always readable and moving only on arrival. */
export function About({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).about

  return (
    <section aria-labelledby="about-title" className="band sheet ground-white">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-14">
        <h2 id="about-title" className="subtitle lg:col-span-3">
          {copy.heading}
        </h2>
        <p className="reveal max-w-[26ch] text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.15] font-extrabold tracking-[-0.035em] lg:col-span-9">
          {copy.proof}
        </p>
      </div>
    </section>
  )
}
