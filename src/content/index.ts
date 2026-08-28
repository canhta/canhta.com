import { profileFixture } from './profile.fixture'
import { buildsFixture } from './builds.fixture'
import { capabilitiesFixture } from './capabilities.fixture'
import { servicesFixture } from './services.fixture'
import { socialFixture } from './social.fixture'
import { faqFixture } from './faq.fixture'
import type { Build, Capability, Faq, Profile, Service, SocialLink } from './types'

/**
 * PRODUCTION GUARD
 *
 * This repository is public. Fixture content is written to look plausible so the
 * design can be evaluated — which is exactly why it must never reach production.
 *
 * SCOPE, precisely: anything carrying `__fixture` throws when
 * `NODE_ENV === 'production'` and `ALLOW_FIXTURES !== '1'`. `next build` sets
 * that, so the real build path is covered. It is deliberately NOT thrown in dev
 * or test — the fixtures exist to be worked with there.
 *
 * The comment previously read "fails the build unless explicitly allowed", which
 * invited more trust than the condition earns: any consumer importing this
 * module outside a production build gets fixture content silently. If a codegen
 * or export script is ever added, it must check `CONTENT_IS_FIXTURE` itself.
 *
 * Escape hatch (preview deploys only): ALLOW_FIXTURES=1. When it is used, the
 * fixture banner renders and robots.txt serves a blanket disallow, so the bypass
 * is never silent.
 */
function containsFixture(value: unknown, seen = new Set<unknown>()): boolean {
  if (value === null || typeof value !== 'object') return false
  if (seen.has(value)) return false
  seen.add(value)
  if (Array.isArray(value)) return value.some((item) => containsFixture(item, seen))
  if ('__fixture' in value && (value as { __fixture?: unknown }).__fixture === true) return true
  return Object.values(value).some((item) => containsFixture(item, seen))
}

const sources = {
  profile: profileFixture,
  builds: buildsFixture,
  capabilities: capabilitiesFixture,
  services: servicesFixture,
  social: socialFixture,
  faq: faqFixture,
}

export const CONTENT_IS_FIXTURE = containsFixture(sources)

/**
 * `typeof window === 'undefined'` is load-bearing, not defensive noise.
 *
 * This guard took the live site down. A client component imported `@/content`,
 * which dragged this module into the browser bundle, where Next inlines
 * `NODE_ENV` as 'production' but does NOT inline `ALLOW_FIXTURES` — only
 * `NEXT_PUBLIC_*` variables reach the client. So the condition read as
 * "production, and the flag is absent", and every visitor got a thrown error
 * instead of a page, on a build that had passed.
 *
 * The real fix is architectural and is applied too: no client component imports
 * `@/content` any more, and a unit test pins that. This check is the second
 * line, so the same mistake can never again turn a content-safety feature into
 * an outage.
 */
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

export const profile: Profile = profileFixture
export const builds: Build[] = [...buildsFixture].sort((a, b) => a.order - b.order)
export const capabilities: Capability[] = [...capabilitiesFixture].sort((a, b) => a.order - b.order)
export const services: Service[] = [...servicesFixture].sort((a, b) => a.order - b.order)
export const faq: Faq[] = [...faqFixture].sort((a, b) => a.order - b.order)
export const social: SocialLink[] = socialFixture

export const socialByNetwork = (network: SocialLink['network']) =>
  social.find((s) => s.network === network)

export * from './types'
