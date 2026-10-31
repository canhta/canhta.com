import NextLink from 'next/link'
import { hasLocale } from 'next-intl'
import { createNavigation } from 'next-intl/navigation'
import { getLocale } from 'next-intl/server'
import type { ComponentProps } from 'react'
import { routing, type AppPathname } from './routing'

/** Path helper for the server (metadata, sitemap, header, footer). */
export const { getPathname } = createNavigation(routing)

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
