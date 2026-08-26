import { profile, services } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

const COPY = {
  heading: { en: 'Ways to work together', vi: 'Cách chúng ta có thể hợp tác' },
  output: { en: 'You end up with', vi: 'Bạn nhận được' },
  suited: { en: 'Right when', vi: 'Hợp khi' },
  start: { en: 'Starts with', vi: 'Bắt đầu bằng' },
  startValue: {
    en: 'One conversation about the actual problem.',
    vi: 'Một buổi nói chuyện về đúng vấn đề của bạn.',
  },
} as const

export function WorkTogether({ locale }: { locale: Locale }) {
  return (
    <section className="container-sheet py-20 md:py-24">
      <div className="flex items-baseline gap-4 border-b border-ink pb-3">
        <span className="fig-label shrink-0">FIG. 4</span>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
          {t(COPY.heading, locale)}
        </h2>
      </div>

      <ul className="mt-10">
        {services.map((service, i) => (
          <li
            key={service.id}
            className="grid gap-6 border-b border-rule py-7 lg:grid-cols-12 lg:gap-10"
          >
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
        <a
          href={profile.ctaHref}
          className="group inline-flex h-12 items-center justify-between gap-6 rounded-xs bg-ink px-5 text-paper transition-colors duration-150 hover:bg-plan"
        >
          <span className="font-mono text-[13px] tracking-[0.12em] uppercase">
            {t(profile.ctaLabel, locale)}
          </span>
          <span aria-hidden="true" className="font-mono text-[13px]">
            →
          </span>
        </a>
        <p className="annot max-w-[34ch] normal-case">{t(COPY.startValue, locale)}</p>
      </div>
    </section>
  )
}
