import { Link } from '@/i18n/navigation'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import type { AppPathname } from '@/i18n/routing'

/**
 * Where an inner page sits: Home, then this page. Plain text on the page head, the
 * same two steps as the `BreadcrumbList` in the page's JSON-LD (structured data
 * must describe what a visitor can see). The current page is not a link.
 */
export function Breadcrumb({ locale, page }: { locale: Locale; page: Exclude<AppPathname, '/'> }) {
  const { nav } = getMessages(locale)
  const label = nav[page.slice(1) as 'services' | 'products' | 'contact']

  return (
    <nav aria-label={nav.breadcrumb} className="crumbs">
      <ol>
        <li>
          <Link href="/" className="crumb-link">
            {nav.home}
          </Link>
        </li>
        <li aria-current="page">{label}</li>
      </ol>
    </nav>
  )
}
