import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'

/** Every page in both languages, so a client switch can find the same page in the other language. */
export function getPages() {
  return (Object.keys(routing.pathnames) as AppPathname[]).map((key) => ({
    key,
    en: getPathname({ locale: 'en', href: key }),
    vi: getPathname({ locale: 'vi', href: key }),
  }))
}
