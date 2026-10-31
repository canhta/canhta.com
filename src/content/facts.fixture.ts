import type {
  BuildFacts,
  FaqFacts,
  FixtureMarked,
  OfferFacts,
  ProfileFacts,
  SocialLink,
} from './types'

/**
 * Locale-neutral facts. Copy lives under `locales/` so each language can be
 * written as a complete page instead of sentence-by-sentence translation.
 */
export const profileFacts: ProfileFacts & FixtureMarked = {
  __fixture: true,
  name: 'Canh Ta',
  available: true,
}

/**
 * These projects and their links are real, so they carry no fixture marker.
 * Scori and Remoti are not in any store yet (Scori's `store-links.json` is null,
 * Remoti's own site says "Coming soon"), so both stay `building` and link to
 * their sites. Add a store link here only when it exists.
 */
export const buildFacts: BuildFacts[] = [
  {
    slug: 'scori',
    order: 1,
    name: 'Scori',
    year: '2026',
    kind: 'mobile',
    appCategory: 'UtilitiesApplication',
    status: 'building',
    os: 'iOS, Android',
    logo: '/products/scori/icon.webp',
    shots: ['score', 'invite'],
    links: [{ kind: 'web', url: 'https://scori.canhta.com' }],
  },
  {
    slug: 'remoti',
    order: 2,
    name: 'Remoti',
    year: '2026',
    kind: 'mobile',
    appCategory: 'UtilitiesApplication',
    status: 'building',
    os: 'iOS',
    logo: '/products/remoti/icon.svg',
    shots: ['remote-classic', 'present'],
    links: [{ kind: 'web', url: 'https://remoti.canhta.com' }],
  },
  {
    slug: 'ai-engineering-atlas',
    order: 3,
    name: 'AI Engineering Atlas',
    year: '2026',
    kind: 'web',
    appCategory: 'EducationalApplication',
    status: 'live',
    links: [
      { kind: 'web', url: 'https://ai-eng.canhta.com' },
      { kind: 'github', url: 'https://github.com/canhta/ai-engineering-atlas' },
    ],
  },
  {
    slug: 'copycat-skills',
    order: 4,
    name: 'copycat-skills',
    year: '2026',
    kind: 'skill',
    appCategory: 'DeveloperApplication',
    status: 'shipped',
    links: [
      { kind: 'docs', url: 'https://skills.sh/canhta/copycat-skills' },
      { kind: 'github', url: 'https://github.com/canhta/copycat-skills' },
    ],
  },
]

export const offerFacts: (OfferFacts & FixtureMarked)[] = [
  { __fixture: true, id: 'systems', order: 1 },
  { __fixture: true, id: 'ai', order: 2 },
  { __fixture: true, id: 'data', order: 3 },
  { __fixture: true, id: 'web', order: 4 },
  { __fixture: true, id: 'iot', order: 5 },
  { __fixture: true, id: 'team', order: 6 },
]

export const faqFacts: (FaqFacts & FixtureMarked)[] = [
  { __fixture: true, id: 'pricing', order: 1 },
  { __fixture: true, id: 'existing', order: 2 },
  { __fixture: true, id: 'agent', order: 3 },
  { __fixture: true, id: 'wrong', order: 4 },
  { __fixture: true, id: 'customers', order: 5 },
  { __fixture: true, id: 'data', order: 6 },
  { __fixture: true, id: 'ownership', order: 7 },
  { __fixture: true, id: 'idea', order: 8 },
]

export const socialFacts: (SocialLink & FixtureMarked)[] = [
  { __fixture: true, network: 'github', url: 'https://github.com/canhta' },
  { __fixture: true, network: 'x', url: 'https://x.com/canh_builds' },
  { __fixture: true, network: 'linkedin', url: 'https://www.linkedin.com/in/canhta' },
  { __fixture: true, network: 'zalo', url: 'https://zalo.me/84825252599' },
  // The WhatsApp number is the Zalo number: the only phone number in the repo. Owner to confirm.
  { __fixture: true, network: 'whatsapp', url: 'https://wa.me/84825252599' },
  { __fixture: true, network: 'email', url: 'mailto:hello@canhta.com' },
]
