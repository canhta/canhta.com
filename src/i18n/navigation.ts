import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/** Locale-aware `Link` and path helpers; every internal href goes through these. */
export const { Link, usePathname, getPathname } = createNavigation(routing)
