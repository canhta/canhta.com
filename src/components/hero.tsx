import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { HeroDesk } from './hero-desk'
import { Words } from './words'

/**
 * The hook and the next step on a night ground, with the picture of the whole
 * offer (scattered work into one system, AI tasks waiting for approval) on the
 * right on a desktop and under the buttons on a phone. Text rises in once on load.
 * No product is promoted here: the services come first.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { profile } = getSiteContent(locale)
  const copy = getMessages(locale).hero

  return (
    <section className="hero on-night">
      <div className="shell hero-text">
        <h1 className={`display max-w-[12ch] ${locale === 'en' ? 'sm:max-w-[14ch]' : 'sm:max-w-[13ch]'}`} aria-label={profile.hook}>
          <Words text={profile.hook} load />
        </h1>
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
      <div className="hero-stage">
        <HeroDesk
          label={copy.visual.label}
          labels={{ ...copy.visual, approve: getMessages(locale).home.approve }}
        />
      </div>
    </section>
  )
}
