import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { ArrowIcon } from '@/components/icons'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

/**
 * A missing page is not a failure of the person asking, and it is not an
 * occasion for a joke. What happened, then what to do, in the second person,
 * with no apology.
 */
const COPY = {
  label: { en: 'Not found', vi: 'Không tìm thấy' },
  heading: {
    en: 'There is no page at this address.',
    vi: 'Không có trang nào ở địa chỉ này.',
  },
  body: {
    en: 'Check it for a typo, or start from the front page — this site is one page, so everything on it is a single scroll away.',
    vi: 'Kiểm tra xem có gõ nhầm không, hoặc bắt đầu lại từ trang chính — cả site chỉ có một trang, cuộn một lượt là hết.',
  },
  home: { en: 'Go to the front page', vi: 'Về trang chính' },
} as const

/**
 * `not-found.tsx` is passed no props, and it renders outside
 * `NextIntlClientProvider`, so neither `params` nor `useTranslations` can tell
 * us which language the visitor was reading. `getLocale()` can, and it is not a
 * guess:
 *
 * This file is the not-found boundary *inside* the `[locale]` segment, so it
 * renders as a child of `[locale]/layout.tsx` — which has already awaited
 * `params` and called `setRequestLocale(locale)` for this request before the
 * boundary is reached. `getLocale()` reads that value back out of next-intl's
 * per-request cache. Verified against the dev server: `/nope` (rewritten to
 * `/en/nope` by the proxy) resolves `en`, `/vi/nope` resolves `vi`.
 *
 * That also makes it the cheap option. The alternative — reading the proxy's
 * `x-next-intl-locale` request header — needs `headers()`, which is a
 * request-time API and would opt this page out of static rendering to learn
 * something the layout already knows.
 *
 * `hasLocale` narrows the string to our own `Locale` union rather than asserting
 * it; on anything unexpected `t()` falls back to English, which is a readable
 * 404 rather than a blank one.
 */
/**
 * KNOWN LIMITATION — this page is not server-rendered.
 *
 * Measured on a production build: `/nope`, `/vi/nope` and `/fr` all return a
 * correct 404 status, but the document body is 38 non-script bytes — an
 * `id="__next_error__"` shell with the whole tree in the RSC flight payload. A
 * visitor with JavaScript sees this page; a visitor without it sees nothing.
 *
 * `experimental.globalNotFound` + `app/global-not-found.tsx` is Next's documented
 * answer for a root layout under a top-level dynamic segment, and it was built
 * and tested here. It never fires: the next-intl proxy rewrites every unmatched
 * path to `/en/...`, so nothing ever fails to match a route, which is the only
 * condition that triggers the global page. Both were removed rather than shipped
 * as config that does nothing.
 *
 * Escaping this needs routing that is not rooted in `[locale]`. Not worth
 * restructuring the site for a 404 — recorded so nobody re-derives it.
 */
export default async function NotFound() {
  const requested = await getLocale()
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : 'en'
  const home = locale === 'en' ? '/' : '/vi'

  return (
    <>
      <SiteHeader locale={locale} />

      {/* The layout's skip link targets `#main` on every route it wraps, this
          one included. Without the id here, the first thing a keyboard user
          reaches on a 404 is a link to nowhere. */}
      <main id="main" className="shell band-1">
        <p className="label">{t(COPY.label, locale)}</p>
        <p className="tnum mt-2 font-display text-[64px] leading-none font-semibold text-accent">
          404
        </p>

        <h1 className="title mt-8 max-w-[20ch]">{t(COPY.heading, locale)}</h1>

        <p className="lead mt-5 max-w-[52ch]">{t(COPY.body, locale)}</p>

        <div className="mt-9">
          <Link href={home} className="btn-primary">
            {t(COPY.home, locale)}
            <ArrowIcon width={16} height={16} />
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
