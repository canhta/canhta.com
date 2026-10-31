import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  /**
   * One page per search intent, with a Vietnamese slug a Vietnamese reader
   * would actually type or recognise. The folder names under `src/app/[locale]`
   * are the keys; the proxy rewrites the localized path to them.
   */
  pathnames: {
    '/': '/',
    '/services': { en: '/services', vi: '/dich-vu' },
    '/products': { en: '/products', vi: '/san-pham' },
    '/contact': { en: '/contact', vi: '/lien-he' },
  },
})

export type AppLocale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
