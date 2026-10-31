import type { MetadataRoute } from 'next'
import type { Locale } from '@/content/types'
import { routing } from '@/i18n/routing'
import { PAGE_PATH, pageUrl } from '@/lib/metadata'

const PAGES = Object.keys(PAGE_PATH) as (keyof typeof PAGE_PATH)[]

/**
 * Every page in every language, each entry listing all its language versions
 * (itself included): hreflang is reciprocal, and a one-way declaration is ignored.
 * No `lastModified`: there is no per-page edit date, and a build timestamp on every
 * URL is a date that is not true of the page, which crawlers learn to ignore.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) => {
    const languages = {
      ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l as Locale, page)])),
      'x-default': pageUrl(routing.defaultLocale as Locale, page),
    }
    return routing.locales.map((locale) => ({
      url: pageUrl(locale as Locale, page),
      alternates: { languages },
    }))
  })
}
