import { buildFacts, faqFacts, offerFacts, profileFacts, socialFacts } from './facts'
import { enContent } from './locales/en'
import { viContent } from './locales/vi'
import type { Build, ContentCopy, Faq, Locale, Offer, SiteContent } from './types'

const copies: Record<Locale, ContentCopy> = { en: enContent, vi: viContent }

function assertNaturalStrings(value: unknown, path: string): void {
  if (typeof value === 'string') {
    if (value.trim().length === 0) throw new Error(`Empty localized content: ${path}`)
    if (value !== value.normalize('NFC')) throw new Error(`Content is not Unicode NFC: ${path}`)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNaturalStrings(item, `${path}.${index}`))
    return
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      assertNaturalStrings(child, `${path}.${key}`)
    }
  }
}

function assertIds(
  locale: Locale,
  label: string,
  expectedIds: string[],
  localizedIds: string[],
): void {
  const expected = expectedIds.toSorted()
  const actual = localizedIds.toSorted()
  if (expected.join('\n') !== actual.join('\n')) {
    throw new Error(`${locale} ${label} IDs do not match locale-neutral facts`)
  }
}

for (const locale of ['en', 'vi'] as const) {
  const copy = copies[locale]
  assertNaturalStrings(copy, locale)
  assertIds(
    locale,
    'build',
    buildFacts.map((item) => item.slug),
    copy.builds.map((item) => item.slug),
  )
  assertIds(
    locale,
    'offer',
    offerFacts.map((item) => item.id),
    copy.offers.map((item) => item.id),
  )
  assertIds(
    locale,
    'FAQ',
    faqFacts.map((item) => item.id),
    copy.faq.map((item) => item.id),
  )
}

function byId<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

function resolve(locale: Locale): SiteContent {
  const copy = copies[locale]
  const buildsBySlug = new Map(copy.builds.map((item) => [item.slug, item]))
  const offersById = byId(copy.offers)
  const faqById = byId(copy.faq)

  const builds: Build[] = buildFacts
    .map((facts) => {
      const localized = buildsBySlug.get(facts.slug)
      if (!localized) throw new Error(`Missing ${locale} build copy: ${facts.slug}`)
      const { slug: _, ...words } = localized
      return { ...facts, ...words }
    })
    .sort((a, b) => a.order - b.order)

  const offers: Offer[] = offerFacts
    .map((facts) => {
      const localized = offersById.get(facts.id)
      if (!localized) throw new Error(`Missing ${locale} offer copy: ${facts.id}`)
      const { id: _, ...words } = localized
      return { ...facts, ...words }
    })
    .sort((a, b) => a.order - b.order)

  const faq: Faq[] = faqFacts
    .map((facts) => {
      const localized = faqById.get(facts.id)
      if (!localized) throw new Error(`Missing ${locale} FAQ copy: ${facts.id}`)
      const { id: _, ...words } = localized
      return { ...facts, ...words }
    })
    .sort((a, b) => a.order - b.order)

  return {
    profile: { ...profileFacts, ...copy.profile },
    builds,
    offers,
    faq,
    social: socialFacts,
  }
}

const resolved: Record<Locale, SiteContent> = { en: resolve('en'), vi: resolve('vi') }

export function getSiteContent(locale: Locale): SiteContent {
  return resolved[locale]
}

export * from './types'
