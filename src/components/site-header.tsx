import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { HeaderNav } from './header-nav'

/**
 * One small opaque bar, sticky, with the contact button always in reach. On a
 * phone the three pages sit behind a menu button; on a desktop they are links.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const { profile } = getSiteContent(locale)
  const { nav } = getMessages(locale)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="shell relative flex h-14 items-center gap-2 sm:gap-5">
        <Link href="/" className="min-w-0 truncate text-[15px] font-bold" translate="no">
          {profile.name}
        </Link>

        <HeaderNav
          locale={locale}
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

        <Link href="/contact" className="btn-header">
          {profile.headerCta}
        </Link>
      </div>
    </header>
  )
}
