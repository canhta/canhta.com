import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { HeroScene } from './hero-scene'
import { HeroVisual } from './hero-visual'

/**
 * The hook and the next step on a night ground, with the 3D scene as the
 * main picture. On a desktop the scene fills the right of the band and bleeds to
 * its edges; on a phone it sits under the buttons. Text rises in once on load.
 * No product is promoted here: the services come first.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { profile } = getSiteContent(locale)
  const copy = getMessages(locale).hero

  return (
    <section className="hero on-night">
      <div className="shell hero-text">
        <h1 className="display enter max-w-[12ch] sm:max-w-[13ch]">{profile.hook}</h1>
        <p className="lead enter mt-5 max-w-[40ch]">{profile.supporting}</p>
        <div className="enter mt-7 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-accent">
            {copy.primary}
          </Link>
          <Link href="/services" className="btn-light">
            {copy.secondary}
          </Link>
        </div>
      </div>
      <HeroScene label={copy.visual.label} className="hero-stage">
        <HeroVisual locale={locale} />
      </HeroScene>
    </section>
  )
}
