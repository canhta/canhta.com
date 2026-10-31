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
    shots: ['remote-classic'],
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
  { id: 'systems', order: 1 },
  { id: 'ai', order: 2 },
  { id: 'data', order: 3 },
  { id: 'web', order: 4 },
  { id: 'iot', order: 5 },
  { id: 'team', order: 6 },
]

export const faqFacts: (FaqFacts & FixtureMarked)[] = [
  { id: 'pricing', order: 1 },
  { id: 'timeline', order: 2 },
  { id: 'apps', order: 3 },
  { id: 'agent', order: 4 },
  { id: 'wrong', order: 5 },
  { id: 'customers', order: 6 },
  { id: 'data', order: 7 },
  { id: 'ownership', order: 8 },
  { id: 'support', order: 9 },
  { id: 'idea', order: 10 },
]

export const socialFacts: (SocialLink & FixtureMarked)[] = [
  { network: 'github', url: 'https://github.com/canhta' },
  { network: 'x', url: 'https://x.com/canh_builds' },
  { network: 'linkedin', url: 'https://www.linkedin.com/in/canhta' },
  { network: 'zalo', url: 'https://zalo.me/84825252599' },
  // The WhatsApp number is the Zalo number: the only phone number in the repo. Owner to confirm.
  { network: 'whatsapp', url: 'https://wa.me/84825252599' },
  { network: 'email', url: 'mailto:hello@canhta.com' },
]
