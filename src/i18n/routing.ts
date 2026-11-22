import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  // Each page already lists its alternates in the HTML (src/lib/metadata.ts). The
  // proxy would add a second copy in a `Link` header built from the request's Host.
  alternateLinks: false,
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
    '/about': { en: '/about', vi: '/gioi-thieu' },
    '/privacy': { en: '/privacy', vi: '/quyen-rieng-tu' },
    '/terms': { en: '/terms', vi: '/dieu-khoan' },
    // One page per app, under the products page. Written out (not `[slug]`) so
    // every helper keeps working with plain string paths; the folder is
    // `products/[slug]`, which these rewrite to.
    '/products/scori': { en: '/products/scori', vi: '/san-pham/scori' },
    '/products/remoti': { en: '/products/remoti', vi: '/san-pham/remoti' },
    '/products/piggo': { en: '/products/piggo', vi: '/san-pham/piggo' },
  },
})

export type AppPathname = keyof typeof routing.pathnames
