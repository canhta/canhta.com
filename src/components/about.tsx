import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Who is behind the page: the one sentence we can stand behind, then the
 * promises that are true for every project. No names or numbers we cannot show.
 */
export function About({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).about

  return (
    <section aria-labelledby="about-title" className="band sheet ground-wash">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-14">
        <h2 id="about-title" className="subtitle lg:col-span-3">
          {copy.heading}
        </h2>
        <div className="lg:col-span-9">
          <p className="max-w-[40ch] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.5]">{copy.proof}</p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {copy.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-3 font-bold">
                <span aria-hidden="true" className="mv-check" style={{ width: 24, height: 24 }} />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
