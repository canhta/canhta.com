import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { HeaderNav } from './header-nav'

/**
 * A floating solid pill, fixed to the top. It is opaque white (no blur, no
 * glass) with a soft layered shadow, so it reads on any band beneath it. The
 * contact button is always in reach. On a phone the three pages sit behind a
 * menu button; on a desktop they are links.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const { profile } = getSiteContent(locale)
  const { nav } = getMessages(locale)

  return (
    <header className="pill-wrap">
      <div className="pill-inner">
        <HeaderNav
          locale={locale}
          name={profile.name}
          cta={profile.headerCta}
          links={[
            { href: '/services', label: nav.services },
            { href: '/products', label: nav.products },
            { href: '/contact', label: nav.contact },
          ]}
          labels={{
            primary: nav.primary,
            language: nav.language,
            menu: nav.menu,
            closeMenu: nav.closeMenu,
          }}
        />
      </div>
    </header>
  )
}
