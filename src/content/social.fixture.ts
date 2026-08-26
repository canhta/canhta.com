import type { SocialLink, FixtureMarked } from './types'

/**
 * These are REAL, unlike the rest of src/content. They keep the `__fixture`
 * marker only because `CONTENT_IS_FIXTURE` is computed across every source, and
 * flipping it here while products and FAQ answers are still invented would open
 * robots.txt to crawlers. The marker comes off when the whole set is real.
 *
 * Every link here was checked before it shipped. A social icon that 404s on a
 * hire-me page costs more trust than a missing one — `x.com/canh__ta`, supplied
 * first, turned out to be one of those.
 */
export const socialFixture: (SocialLink & FixtureMarked)[] = [
  // Verified: GitHub API reports login=canhta, 15 public repos.
  { __fixture: true, network: 'github', url: 'https://github.com/canhta' },
  // Verified: title reads "Canh Ta (@canh_builds) / X".
  { __fixture: true, network: 'x', url: 'https://x.com/canh_builds' },
  { __fixture: true, network: 'linkedin', url: 'https://www.linkedin.com/in/canhta' },
  // Zalo is the default channel for a Vietnamese audience, and it is a phone
  // number rather than a handle, so the link carries the country code.
  { __fixture: true, network: 'zalo', url: 'https://zalo.me/84825252599' },
  { __fixture: true, network: 'email', url: 'mailto:hello@canhta.com' },
]
