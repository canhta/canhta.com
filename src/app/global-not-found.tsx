import { headers } from 'next/headers'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import LocaleLayout from './[locale]/layout'
import NotFound from './[locale]/not-found'

/** Unmatched routes bypass layouts; compose the same localized site document. */
export default async function GlobalNotFound() {
  const requested = (await headers()).get('x-next-intl-locale')
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  return <LocaleLayout params={Promise.resolve({ locale })}><NotFound /></LocaleLayout>
}
