import { profile, services } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { SectionHead } from '@/components/motion/section-head'
import { RevealList } from '@/components/motion/primitives'

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
      <SectionHead fig="FIG. 4" title={t(COPY.heading, locale)} />

      <RevealList as="ul" className="mt-10" stagger={0.08}>
        {services.map((service, i) => (
          <li
            key={service.id}
            className="group relative grid gap-6 border-b border-rule py-7 transition-[padding] duration-150 ease-out hover:pl-3 lg:grid-cols-12 lg:gap-10"
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
      </RevealList>

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
