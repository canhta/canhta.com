import { ViewTransition, type ReactNode } from 'react'
import type { Locale } from '@/content/types'
import { ContactBar } from './contact-bar'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

/**
 * The frame every page shares: header, `main` and footer, plus the page's
 * machine-readable half. Everything in the JSON-LD derives from `src/content`,
 * so it cannot drift from what a human reads.
 *
 * `tabIndex={-1}` on `main` is what makes the skip link work in Safari, where
 * sequential focus does not fall through to the next focusable element.
 *
 * Moving between pages is a view transition (see `.page-in` in fx.css): the
 * header pill is named and held still, and the new page slides up over the old
 * one. Each page renders its own shell, so entering and leaving fire per route.
 * Where view transitions are missing, or motion is reduced, pages simply swap.
 */
export function PageShell({
  locale,
  jsonLd,
  children,
}: {
  locale: Locale
  jsonLd: unknown
  children: ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // Built from our own typed content, never from user input. `<` is escaped so
        // that no string in the content can ever close the script element early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SiteHeader locale={locale} />
      <ViewTransition enter="page-in" exit="page-out" default="none">
        <div className="page">
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter locale={locale} />
        </div>
      </ViewTransition>
      <ContactBar locale={locale} />
    </>
  )
}
