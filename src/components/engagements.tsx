import { services } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { SectionHeading, Fact } from './section'

/**
 * The commercial shapes, in the order a client actually moves through them:
 * advise, then build one piece, then build the whole thing. The numbering is the
 * sequence, not a ranking — each one is a legitimate place to stop.
 *
 * Column heads are worded differently from the ones in `capabilities.tsx` on
 * purpose. The two sections once shipped the identical Vietnamese string for
 * their own column heads, which was the translation telling us the two sections
 * were saying the same thing.
 */
const COPY = {
  kicker: { en: 'Engagements', vi: 'Hình thức' },
  heading: { en: 'Ways to work together', vi: 'Cách hợp tác' },
  sub: {
    en: 'Three shapes, and the first one is a conversation about the actual problem.',
    vi: 'Ba hình thức, và bước đầu tiên là một buổi nói chuyện về đúng vấn đề của bạn.',
  },
  output: { en: 'You get', vi: 'Bạn nhận' },
  suited: { en: 'Right when', vi: 'Đúng lúc bạn' },
} as const

export function Engagements({ locale }: { locale: Locale }) {
  if (services.length === 0) return null

  return (
    <section className="shell band-2">
      <SectionHeading
        kicker={t(COPY.kicker, locale)}
        title={t(COPY.heading, locale)}
        sub={t(COPY.sub, locale)}
      />

      <ul className="mt-10">
        {services.map((service, i) => (
          <li
            key={service.id}
            className="grid gap-x-10 gap-y-5 border-t border-line py-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-3">
                <span className="label tnum">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="subtitle">{t(service.name, locale)}</h3>
              </div>
            </div>
            <dl className="grid gap-5 text-[15px] leading-snug sm:grid-cols-2 lg:col-span-7 lg:gap-8">
              <Fact label={t(COPY.output, locale)}>{t(service.output, locale)}</Fact>
              <Fact label={t(COPY.suited, locale)}>
                <span className="text-muted">{t(service.suitedTo, locale)}</span>
              </Fact>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
