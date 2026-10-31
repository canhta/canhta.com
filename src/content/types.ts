export type Locale = 'en' | 'vi'

export type BuildKind = 'agent' | 'skill' | 'mobile' | 'web' | 'saas' | 'tool'
export type BuildLinkKind = 'appstore' | 'playstore' | 'web' | 'github' | 'docs'
export type BuildStatus = 'live' | 'shipped' | 'building' | 'acquired' | 'sunset'

export interface BuildLink {
  kind: BuildLinkKind
  url: string
}

export interface BuildFacts {
  slug: string
  order: number
  name: string
  status: BuildStatus
  year: string
  kind: BuildKind
  /** Platform names are proper nouns, so they are a fact, not copy. Used in structured data. */
  os?: string
  /** schema.org / Google applicationCategory for this product. */
  appCategory: string
  logo?: string
  /** File stems under `/products/<slug>/<locale>/`. Present only on a featured product. */
  shots?: string[]
  links: BuildLink[]
}

export interface BuildCopy {
  slug: string
  tagline: string
  summary: string
  /** Where it can be used today: platform, store status, compatibility. */
  availability: string
}

export interface Build extends BuildFacts, Omit<BuildCopy, 'slug'> {}

export interface OfferFacts {
  id: 'systems' | 'ai' | 'data' | 'web' | 'iot' | 'team'
  order: number
}

export interface OfferCopy {
  id: OfferFacts['id']
  name: string
  detail: string
  /** Concrete things in this group, in the words a buyer would search for. */
  examples: string[]
}

export interface Offer extends OfferFacts, Omit<OfferCopy, 'id'> {}

export interface FaqFacts {
  id: string
  order: number
}

export interface FaqCopy {
  id: string
  question: string
  answer: string
}

export interface Faq extends FaqFacts, Omit<FaqCopy, 'id'> {}

export interface SocialLink {
  network: 'github' | 'x' | 'linkedin' | 'email' | 'zalo' | 'whatsapp'
  url: string
}

export interface ProfileFacts {
  name: string
  avatar: string
  available: boolean
}

export interface ProfileCopy {
  location: string
  hook: string
  supporting: string
  /** Short label for the sticky header button. */
  headerCta: string
  availabilityLabel: string
}

export interface Profile extends ProfileFacts, ProfileCopy {}

export interface ContentCopy {
  profile: ProfileCopy
  builds: BuildCopy[]
  offers: OfferCopy[]
  faq: FaqCopy[]
}

export interface SiteContent {
  profile: Profile
  builds: Build[]
  offers: Offer[]
  faq: Faq[]
  social: SocialLink[]
}

export interface FixtureMarked {
  readonly __fixture?: true
}
