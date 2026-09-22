import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
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
export function Engagements({ locale }: { locale: Locale }) {
  const { services } = getSiteContent(locale)
  if (services.length === 0) return null
  const copy = getMessages(locale).engagements

  return (
    <section className="shell band-2">
      <SectionHeading
        kicker={copy.kicker}
        title={copy.heading}
        sub={copy.sub}
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
                <h3 className="subtitle">{service.name}</h3>
              </div>
            </div>
            <dl className="grid gap-5 text-[15px] leading-snug sm:grid-cols-2 lg:col-span-7 lg:gap-8">
              <Fact label={copy.output}>{service.output}</Fact>
              <Fact label={copy.suited}>
                <span className="text-muted">{service.suitedTo}</span>
              </Fact>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
