import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Exclude actual asset namespaces, rather than every URL containing a dot:
  // a missing page such as /vi/missing.html still needs the locale boundary.
  matcher: '/((?!api|trpc|_next|_vercel|art/|products/(?:scori|remoti)/|favicon\\.ico$|apple-icon|icon\\.svg$|sitemap\\.xml$|robots\\.txt$|manifest\\.webmanifest$|llms\\.txt$).*)',
}
