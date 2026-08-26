import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const SITE = 'https://canhta.com'

/** `as-needed` prefixing means the default locale has no segment. */
const urlFor = (locale: string) => (locale === routing.defaultLocale ? SITE : `${SITE}/${locale}`)

export default function sitemap(): MetadataRoute.Sitemap {
  // Every locale points at every other, itself included: hreflang is reciprocal,
  // and a one-way declaration is ignored.
  const languages = Object.fromEntries(routing.locales.map((l) => [l, urlFor(l)]))

  return routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }))
}
