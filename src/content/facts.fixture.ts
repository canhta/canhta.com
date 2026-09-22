import type {
  BuildFacts,
  CapabilityFacts,
  FaqFacts,
  FixtureMarked,
  ProfileFacts,
  ServiceFacts,
  SocialLink,
} from './types'

/**
 * Locale-neutral facts. Copy lives under `locales/` so each language can be
 * written as a complete page instead of sentence-by-sentence translation.
 */
export const profileFacts: ProfileFacts & FixtureMarked = {
  __fixture: true,
  name: 'Canh Ta',
  ctaHref: 'mailto:hello@canhta.com?subject=Project%20inquiry%20from%20canhta.com',
  avatar: '/avatar.jpg',
  available: true,
}

/** These projects and their links are real, so they carry no fixture marker. */
export const buildFacts: BuildFacts[] = [
  {
    slug: 'reupmatic',
    order: 1,
    name: 'Reupmatic',
    year: '2026',
    kind: 'desktop',
    status: 'building',
    links: [{ kind: 'web', url: 'https://reupmatic.canhta.com' }],
  },
  {
    slug: 'ai-engineering-atlas',
    order: 2,
    name: 'AI Engineering Atlas',
    year: '2026',
    kind: 'web',
    status: 'live',
    links: [
      { kind: 'web', url: 'https://ai-eng.canhta.com' },
      { kind: 'github', url: 'https://github.com/canhta/ai-engineering-atlas' },
    ],
  },
  {
    slug: 'copycat-skills',
    order: 3,
    name: 'copycat-skills',
    year: '2026',
    kind: 'skill',
    status: 'shipped',
    links: [
      { kind: 'docs', url: 'https://skills.sh/canhta/copycat-skills' },
      { kind: 'github', url: 'https://github.com/canhta/copycat-skills' },
    ],
  },
  {
    slug: 'pixelbid',
    order: 4,
    name: 'PixelBid',
    year: '2026',
    kind: 'web',
    status: 'building',
    links: [{ kind: 'web', url: 'https://pixelbid.lol' }],
  },
]

export const capabilityFacts: (CapabilityFacts & FixtureMarked)[] = [
  { __fixture: true, id: 'agentic', order: 1 },
  { __fixture: true, id: 'mobile', order: 2 },
  { __fixture: true, id: 'web', order: 3 },
  { __fixture: true, id: 'saas', order: 4 },
]

export const serviceFacts: (ServiceFacts & FixtureMarked)[] = [
  { __fixture: true, id: 'advisory', order: 1 },
  { __fixture: true, id: 'sprint', order: 2 },
  { __fixture: true, id: 'endToEnd', order: 3 },
]

export const faqFacts: (FaqFacts & FixtureMarked)[] = [
  { __fixture: true, id: 'pricing', order: 1 },
  { __fixture: true, id: 'ownership', order: 2 },
  { __fixture: true, id: 'vague', order: 3 },
  { __fixture: true, id: 'team', order: 4 },
  { __fixture: true, id: 'after', order: 5 },
  { __fixture: true, id: 'agency', order: 6 },
]

export const socialFacts: (SocialLink & FixtureMarked)[] = [
  { __fixture: true, network: 'github', url: 'https://github.com/canhta' },
  { __fixture: true, network: 'x', url: 'https://x.com/canh_builds' },
  { __fixture: true, network: 'linkedin', url: 'https://www.linkedin.com/in/canhta' },
  { __fixture: true, network: 'zalo', url: 'https://zalo.me/84825252599' },
  { __fixture: true, network: 'email', url: 'mailto:hello@canhta.com' },
]
