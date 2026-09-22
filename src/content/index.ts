import {
  buildFacts,
  capabilityFacts,
  faqFacts,
  profileFacts,
  serviceFacts,
  socialFacts,
} from './facts.fixture'
import { enContent } from './locales/en.fixture'
import { viContent } from './locales/vi.fixture'
import type {
  Build,
  Capability,
  ContentCopy,
  Faq,
  Locale,
  Service,
  SiteContent,
  SocialLink,
} from './types'

const copies: Record<Locale, ContentCopy> = { en: enContent, vi: viContent }

function containsFixture(value: unknown, seen = new Set<unknown>()): boolean {
  if (value === null || typeof value !== 'object') return false
  if (seen.has(value)) return false
  seen.add(value)
  if (Array.isArray(value)) return value.some((item) => containsFixture(item, seen))
  if ('__fixture' in value && (value as { __fixture?: unknown }).__fixture === true) return true
  return Object.values(value).some((item) => containsFixture(item, seen))
}

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
    'capability',
    capabilityFacts.map((item) => item.id),
    copy.capabilities.map((item) => item.id),
  )
  assertIds(
    locale,
    'service',
    serviceFacts.map((item) => item.id),
    copy.services.map((item) => item.id),
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
  const capabilitiesById = byId(copy.capabilities)
  const servicesById = byId(copy.services)
  const faqById = byId(copy.faq)

  const builds: Build[] = buildFacts
    .map((facts) => {
      const localized = buildsBySlug.get(facts.slug)
      if (!localized) throw new Error(`Missing ${locale} build copy: ${facts.slug}`)
      const { slug: _, ...words } = localized
      return { ...facts, ...words }
    })
    .sort((a, b) => a.order - b.order)

  const capabilities: Capability[] = capabilityFacts
    .map((facts) => {
      const localized = capabilitiesById.get(facts.id)
      if (!localized) throw new Error(`Missing ${locale} capability copy: ${facts.id}`)
      const { id: _, ...words } = localized
      return { ...facts, ...words }
    })
    .sort((a, b) => a.order - b.order)

  const services: Service[] = serviceFacts
    .map((facts) => {
      const localized = servicesById.get(facts.id)
      if (!localized) throw new Error(`Missing ${locale} service copy: ${facts.id}`)
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
    capabilities,
    services,
    faq,
    social: socialFacts,
  }
}

const resolved: Record<Locale, SiteContent> = { en: resolve('en'), vi: resolve('vi') }

export const CONTENT_IS_FIXTURE = containsFixture({
  profileFacts,
  buildFacts,
  capabilityFacts,
  serviceFacts,
  faqFacts,
  socialFacts,
})

if (
  typeof window === 'undefined' &&
  CONTENT_IS_FIXTURE &&
  process.env.NODE_ENV === 'production' &&
  process.env.ALLOW_FIXTURES !== '1'
) {
  throw new Error(
    [
      'Refusing to build: fixture content is still reachable from a rendered route.',
      '',
      'Every claim on canhta.com must be real. Replace the *.fixture.ts modules in',
      'src/content/ with approved content, or set ALLOW_FIXTURES=1 for a preview',
      'deploy that is never linked publicly.',
    ].join('\n'),
  )
}

export function getSiteContent(locale: Locale): SiteContent {
  return resolved[locale]
}

export function socialByNetwork(network: SocialLink['network']): SocialLink | undefined {
  return socialFacts.find((item) => item.network === network)
}

export * from './types'
