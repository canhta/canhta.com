import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { UtilityRow } from '@/components/utility-row'
import { SiteFooter } from '@/components/site-footer'

/**
 * A drawing sheet cross-references views by number. Asking for one that was
 * never drawn is not a failure of the person asking, and it is not an occasion
 * for a joke — it is a note on the sheet saying which view is missing and where
 * the drawing that does exist is. Hence: what happened, then what to do, in the
 * second person, with no apology.
 */
const COPY = {
  label: { en: 'Missing view', vi: 'Không có bản vẽ này' },
  heading: {
    en: 'This page is not on the sheet.',
    vi: 'Trang này không có trên bản vẽ.',
  },
  body: {
    en: 'The address you opened does not exist here. Check it for a typo, or start from the front page — this site is one page, so everything on it is a single scroll away.',
    vi: 'Địa chỉ bạn vừa mở không tồn tại ở đây. Kiểm tra xem có gõ nhầm không, hoặc bắt đầu lại từ trang chính — cả site chỉ có một trang, cuộn một lượt là hết.',
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
      <UtilityRow locale={locale} />

      {/* The layout's skip link targets `#sheet` on every route it wraps, this
          one included. Without the id here, the first thing a keyboard user
          reaches on a 404 is a link to nowhere. */}
      <main id="sheet" className="container-sheet figure-primary">
        {/* The sheet's one number, in the 44px slot the proof stamp uses on the
            front page. There is exactly one number on this page, so it gets it. */}
        <p className="flex items-baseline gap-4">
          <span className="tnum font-mono text-[44px] leading-none font-medium text-live">
            404
          </span>
          <span className="annot">{t(COPY.label, locale).toUpperCase()}</span>
        </p>

        <div aria-hidden="true" className="draw draw-1 mt-5 h-px bg-ink" />

        <h1 className="rise rise-2 mt-10 max-w-[22ch] text-[clamp(1.4rem,2.6vw,1.85rem)] leading-[1.1] font-extrabold tracking-[-0.03em]">
          {t(COPY.heading, locale)}
        </h1>

        <p className="rise rise-3 mt-5 max-w-[52ch] text-[15px] leading-relaxed text-graphite">
          {t(COPY.body, locale)}
        </p>

        <div className="rise rise-4 mt-10">
          <Link
            href={home}
            className="group inline-flex h-12 w-full items-center justify-between gap-6 rounded-none bg-ink px-5 text-paper transition-colors duration-150 hover:bg-live sm:w-auto"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
              {t(COPY.home, locale)}
            </span>
            <span aria-hidden="true" className="font-mono text-[11px]">
              →
            </span>
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
