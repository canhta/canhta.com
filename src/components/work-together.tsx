import { profile, services } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { SectionHead } from '@/components/motion/section-head'
import { ContactActions } from '@/components/contact-actions'

/**
 * `suited.vi` was 'Hợp khi', the identical string FIG. 3 shipped for its own
 * column head, and `output` was a third wording of "what you receive". Both are
 * now distinct from FIG. 3's.
 *
 * `start` was defined and never rendered.
 */
const COPY = {
  heading: { en: 'Ways to work together', vi: 'Cách hợp tác' },
  output: { en: 'You get', vi: 'Bạn nhận' },
  suited: { en: 'Right when', vi: 'Đúng lúc bạn' },
  startValue: {
    en: 'One conversation about the actual problem.',
    vi: 'Một buổi nói chuyện về đúng vấn đề của bạn.',
  },
} as const

export function WorkTogether({ locale }: { locale: Locale }) {
  return (
    <section className="container-sheet figure-secondary">
      <SectionHead fig="FIG. 4" title={t(COPY.heading, locale)} />

      <ul className="mt-10">
        {services.map((service, i) => (
          <li
            key={service.id}
            /* `hover:translate-x-3` was removed: 12px of horizontal travel on a
               row that is not a link, promising an interaction that never
               arrives — and it dragged body text sideways against
               `text-wrap: pretty`. The rule below carries the hover alone. */
            className="group relative grid gap-6 border-b border-rule py-7 lg:grid-cols-12 lg:gap-10"
          >
            <span
              aria-hidden="true"
              className="absolute top-7 bottom-7 left-0 w-0.5 origin-top scale-y-0 bg-live transition-transform duration-200 ease-out group-hover:scale-y-100"
            />
            <div className="lg:col-span-4">
              <span className="fig-label">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-[20px] font-extrabold tracking-[-0.025em]">
                {t(service.name, locale)}
              </h3>
            </div>
            <div className="lg:col-span-4">
              <p className="annot">{t(COPY.output, locale).toUpperCase()}</p>
              <p className="mt-1.5 text-[15px] leading-snug">{t(service.output, locale)}</p>
            </div>
            <div className="lg:col-span-4">
              <p className="annot">{t(COPY.suited, locale).toUpperCase()}</p>
              <p className="mt-1.5 text-[15px] leading-snug text-graphite">
                {t(service.suitedTo, locale)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <ContactActions locale={locale} />
        <p className="annot max-w-[34ch] normal-case">{t(COPY.startValue, locale)}</p>
      </div>
    </section>
  )
}
