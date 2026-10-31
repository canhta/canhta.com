import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { HeroScene } from './hero-scene'
import { HeroVisual } from './hero-visual'

/**
 * The hook and the next step, in the first screen on a phone. Text rises in once
 * on load; the illustration keeps a slow drift. No product is promoted here: the
 * apps come after the services, because that is the order of what people hire us
 * for.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { profile } = getSiteContent(locale)
  const copy = getMessages(locale).hero

  return (
    <section className="shell pt-8 sm:pt-14 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h1 className="display enter max-w-[15ch]">{profile.hook}</h1>
          <p className="lead enter enter-1 mt-5 max-w-[44ch]">{profile.supporting}</p>
          <div className="enter enter-2 mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              {copy.primary}
            </Link>
            <Link href="/services" className="btn-secondary">
              {copy.secondary}
            </Link>
          </div>
        </div>
        <HeroScene
          label={copy.visual.label}
          className="enter enter-2 hv-panel lg:col-span-5"
        >
          <HeroVisual locale={locale} />
        </HeroScene>
      </div>
    </section>
  )
}
