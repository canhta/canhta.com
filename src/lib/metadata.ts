import type { Metadata } from 'next'
import type { Locale } from '@/content/types'
import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'
import { getMessages } from '@/i18n/messages'
import { SITE } from '@/lib/site'


type PageKey = 'home' | 'services' | 'products' | 'contact'

export const PAGE_PATH: Record<PageKey, AppPathname> = {
  home: '/',
  services: '/services',
  products: '/products',
  contact: '/contact',
}

/** Absolute URL of a page in one locale, with the localized slug. */
export function pageUrl(locale: Locale, page: PageKey): string {
  const path = getPathname({ locale, href: PAGE_PATH[page] })
  return `${SITE}${path === '/' ? '' : path}` || SITE
}

/** The share card of one page in one language, a 1200 by 630 PNG. */
export function ogImageUrl(locale: Locale, page: PageKey): string {
  return `${SITE}${locale === routing.defaultLocale ? '' : `/${locale}`}/opengraph-image/${page}`
}

/** `/index.md` and `/vi/index.md` for the two home pages, otherwise the page URL plus `.md`. */
export function markdownUrl(locale: Locale, page: PageKey): string {
  const html = pageUrl(locale, page)
  return page === 'home' ? `${html}/index.md` : `${html}.md`
}

/**
 * Title, description, canonical and reciprocal hreflang for one page. Every
 * page lists every locale (itself included) plus an x-default, because a
 * one-way hreflang declaration is ignored.
 */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const copy = getMessages(locale).metadata[page]
  const url = pageUrl(locale, page)
  // One share card per page and language, at `[locale]/opengraph-image/<page>`; an
  // explicit openGraph object replaces the file convention, so it is listed here.
  const image = ogImageUrl(locale, page)
  const languages = {
    ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, page)])),
    'x-default': pageUrl(routing.defaultLocale, page),
  }

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url, languages, types: { 'text/markdown': markdownUrl(locale, page) } },
    // Said out loud, not left to defaults: index the page, follow its links, and allow a large
    // preview image and an unlimited snippet. Remove `max-snippet` to limit what AI Overviews and
    // other result pages may quote (Google: nosnippet, max-snippet, data-nosnippet).
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Canh Ta',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
      title: copy.title,
      description: copy.description,
      images: [{ url: image, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [{ url: image, alt: copy.title }],
    },
  }
}
