import NextLink from 'next/link'
import { hasLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { ComponentProps } from 'react'
import { routing, type AppLocale, type AppPathname } from './routing'

/**
 * Path helper for the server (metadata, sitemap, header, footer): the page's slug
 * in that language, with `/vi` in front for Vietnamese and no prefix for English
 * (`localePrefix: 'as-needed'`). Written here instead of taken from next-intl's
 * `createNavigation`, whose return value carries next-intl's client `Link` and so
 * shipped its runtime (message parser, plural rules) to every page.
 */
export function getPathname({ locale, href }: { locale: AppLocale; href: AppPathname }): string {
  const entry = routing.pathnames[href]
  const path = typeof entry === 'string' ? entry : entry[locale]
  if (locale === routing.defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

type Href = AppPathname | { pathname: AppPathname; hash?: string }

/**
 * Locale-aware `Link` for server components. Every internal href goes through
 * it. It resolves the href to the visitor's language on the server and renders
 * a plain `next/link`, so the page ships no routing code of its own: next-intl's
 * own `Link` is a client component and pulled its runtime, the message parser
 * and a provider into every page. `getLocale()` reads the language the page
 * set with `setRequestLocale`, the same way the 404 page does.
 */
export async function Link({ href, ...props }: { href: Href } & Omit<ComponentProps<typeof NextLink>, 'href'>) {
  const requested = await getLocale()
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  const { pathname, hash } = typeof href === 'string' ? { pathname: href, hash: undefined } : href
  const path = getPathname({ locale, href: pathname })
  return <NextLink href={hash ? `${path}#${hash}` : path} {...props} />
}
