import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Exclude actual asset namespaces, rather than every URL containing a dot:
  // a missing page such as /vi/missing.html still needs the locale boundary.
  matcher: '/((?!_next|_vercel|products/(?:scori|remoti|piggo)/|favicon\\.ico$|apple-icon|icon\\.svg$|sitemap\\.xml$|robots\\.txt$|ads\\.txt$|app-ads\\.txt$|manifest\\.webmanifest$|llms(?:-full)?\\.txt$|(?:index|services|products|contact|about|privacy|terms|products/(?:scori|remoti|piggo))\\.md$|vi/(?:index|dich-vu|san-pham|lien-he|gioi-thieu|quyen-rieng-tu|dieu-khoan|san-pham/(?:scori|remoti|piggo))\\.md$).*)',
}
