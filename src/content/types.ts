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
  /** The number itself. */
  value: string
}

export interface Build {
  slug: string
  order: number
  name: string
  status: BuildStatus
  /** Year shipped or started, shown on the entry's meta line. */
  year: string
  kind: BuildKind
  /** Outcome-oriented. English must stay under 72 characters. */
  tagline: LocalizedText
  /** Each of these must stay under 100 characters in English. */
  problem: LocalizedText
  built: LocalizedText
  result: LocalizedText
  /**
   * Optional, and currently unused by any surface.
   *
   * The work section deliberately has no image slot: no real screenshot exists
   * for any project, and a layout with a hole shaped like one spends its best
   * space on a placeholder. The field stays because a real screenshot is a real
   * possibility — but adding one is a design decision about where it goes, not a
   * field that fills itself in. Never fake one.
   */
  cover?: string
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
  network: 'github' | 'x' | 'linkedin' | 'email' | 'zalo'
  url: string
}

/** One of the reachability facts under the opening statement. */
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
  /**
   * The facts a stranger in another timezone needs and cannot get anywhere else
   * on the page. Rendered as a wrapping row, so the count is free to change.
   */
  spec: SpecRow[]
}

/** Every fixture module carries this so the production guard can find it. */
export interface FixtureMarked {
  readonly __fixture: true
}
