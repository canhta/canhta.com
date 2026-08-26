export type Locale = 'en' | 'vi'

export type LocalizedText = Record<Locale, string>

/**
 * What kind of thing it is. A typed set rather than free text, because the
 * schedule groups and filters on it and the set will grow well past web apps —
 * store apps, agent skills, developer tools.
 */
export type BuildKind = 'agent' | 'skill' | 'mobile' | 'web' | 'saas' | 'tool'

/** Where a build can be opened. A build often has more than one. */
export type BuildLinkKind = 'appstore' | 'playstore' | 'web' | 'github' | 'docs'

export interface BuildLink {
  kind: BuildLinkKind
  url: string
}

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
  /** Year shipped or started — the schedule table sorts and shows this. */
  year: string
  kind: BuildKind
  /**
   * Only a couple of builds get a full detail drawing. Everything else lives in
   * the schedule table, so the section stays the same height whether there are
   * three products or thirty.
   */
  featured?: boolean
  /** Outcome-oriented. English must stay under 72 characters. */
  tagline: LocalizedText
  /** Each of these must stay under 100 characters in English. */
  problem: LocalizedText
  built: LocalizedText
  result: LocalizedText
  cover: string
  logo?: string
  links: BuildLink[]
  proof?: Proof
}

export interface Capability {
  id: 'agentic' | 'mobile' | 'web' | 'saas'
  order: number
  name: LocalizedText
  bestFor: LocalizedText
  canDeliver: LocalizedText
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
