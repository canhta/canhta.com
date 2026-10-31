import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'
import { phoneContact } from '@/lib/contact'
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
  const href = (path: AppPathname) => getPathname({ locale, href: path })
  // Every page in both languages, so the client can find the page it is on and
  // link the language switch to the same page in the other language.
  const pages = (Object.keys(routing.pathnames) as AppPathname[]).map((key) => ({
    key,
    en: getPathname({ locale: 'en', href: key }),
    vi: getPathname({ locale: 'vi', href: key }),
  }))

  return (
    <header className="pill-wrap" style={{ viewTransitionName: 'site-header' }}>
      <div className="pill-inner">
        <HeaderNav
          locale={locale}
          name={profile.name}
          cta={profile.headerCta}
          ctaShort={getMessages(locale).contact.callShort}
          home={href('/')}
          phone={phoneContact(locale)}
          pages={pages}
          links={[
            { href: href('/services'), label: nav.services },
            { href: href('/products'), label: nav.products },
            { href: href('/contact'), label: nav.contact },
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
