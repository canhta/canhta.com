export type Locale = 'en' | 'vi'

export type LocalizedText = Record<Locale, string>

export type BuildStatus = 'live' | 'shipped' | 'building' | 'acquired' | 'sunset'

export interface Proof {
  /** Short factual label, e.g. "active users". Never a claim we cannot verify. */
  label: LocalizedText
  /** The number itself, rendered in mono. */
  value: string
}

export interface Build {
  slug: string
  order: number
  name: string
  status: BuildStatus
  /** Outcome-oriented. English must stay under 72 characters. */
  tagline: LocalizedText
  /** Each of these must stay under 100 characters in English. */
  problem: LocalizedText
  built: LocalizedText
  result: LocalizedText
  cover: string
  logo?: string
  url?: string
  proof?: Proof
}

export interface Capability {
  id: 'agentic' | 'mobile' | 'web' | 'saas'
  order: number
  name: LocalizedText
  bestFor: LocalizedText
  canDeliver: LocalizedText
  engagement: LocalizedText
}

export interface Service {
  id: 'advisory' | 'sprint' | 'endToEnd'
  order: number
  name: LocalizedText
  output: LocalizedText
  suitedTo: LocalizedText
}

export interface Faq {
  id: string
  order: number
  question: LocalizedText
  answer: LocalizedText
}

export interface SocialLink {
  network: 'github' | 'x' | 'linkedin' | 'email'
  url: string
}

/** One row of the drawing's title block: a label and a fact. */
export interface SpecRow {
  label: LocalizedText
  value: LocalizedText
}

export interface Profile {
  name: string
  location: LocalizedText
  hook: LocalizedText
  supporting: LocalizedText
  ctaLabel: LocalizedText
  ctaHref: string
  avatar: string
  available: boolean
  availabilityLabel: LocalizedText
  /** Dense, factual metadata — the title block on the sheet. */
  spec: SpecRow[]
}

/** Every fixture module carries this so the production guard can find it. */
export interface FixtureMarked {
  readonly __fixture: true
}
