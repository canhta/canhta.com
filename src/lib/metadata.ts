import type { Metadata } from 'next'
import type { Locale } from '@/content/types'
import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'
import { getMessages } from '@/i18n/messages'

const SITE = 'https://canhta.com'

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

/**
 * Title, description, canonical and reciprocal hreflang for one page. Every
 * page lists every locale (itself included) plus an x-default, because a
 * one-way hreflang declaration is ignored.
 */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const copy = getMessages(locale).metadata[page]
  const url = pageUrl(locale, page)
  // The share card is generated per language at `[locale]/opengraph-image`; an
  // explicit openGraph object replaces the file convention, so it is listed here.
  const image = `${SITE}${locale === routing.defaultLocale ? '' : `/${locale}`}/opengraph-image`
  const languages = {
    ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, page)])),
    'x-default': pageUrl(routing.defaultLocale, page),
  }

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Canh Ta',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
      title: copy.title,
      description: copy.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  }
}
