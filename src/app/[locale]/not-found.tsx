import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

/**
 * Shared by the locale boundary and the global unmatched-route document.
 * Read the layout's request locale so the header, recovery link and footer agree.
 */
export default async function NotFound() {
  const requested = await getLocale()
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : 'en'
  const home = locale === 'en' ? '/' : '/vi'
  const copy = getMessages(locale).notFound

  return (
    <>
      <SiteHeader locale={locale} />

      {/* The layout's skip link targets `#main` on every route it wraps, this
          one included. Without the id here, the first thing a keyboard user
          reaches on a 404 is a link to nowhere. */}
      <main id="main" tabIndex={-1} className="page-head ground-night on-night">
        <div className="shell">
          <p className="text-[1rem] font-bold text-on-dark">{copy.label}</p>
          <p className="giant mt-2 text-accent" aria-hidden="true">
            404
          </p>

          <h1 className="title mt-8 max-w-[20ch]">{copy.heading}</h1>

          <p className="lead mt-5 max-w-[52ch]">{copy.body}</p>

          <div className="mt-9">
            <Link href={home} className="btn-accent">
              {copy.home}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
