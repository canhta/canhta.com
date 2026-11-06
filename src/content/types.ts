export type Locale = 'en' | 'vi'

export type BuildKind = 'skill' | 'mobile' | 'web'
export type BuildLinkKind = 'web' | 'github' | 'docs'
type BuildStatus = 'live' | 'shipped' | 'building'

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

interface BuildCopy {
  slug: string
  tagline: string
  summary: string
  /** Where it can be used: platform and compatibility. */
  availability: string
}

export interface Build extends BuildFacts, Omit<BuildCopy, 'slug'> {}

export interface OfferFacts {
  id: 'systems' | 'ai' | 'data' | 'web' | 'iot' | 'team'
  order: number
}

interface OfferCopy {
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

interface FaqCopy {
  id: string
  question: string
  answer: string
}

export interface Faq extends FaqFacts, Omit<FaqCopy, 'id'> {}

export interface SocialLink {
  network: 'github' | 'x' | 'linkedin' | 'email' | 'phone' | 'zalo' | 'whatsapp'
  url: string
}

export interface ProfileFacts {
  name: string
  available: boolean
}

interface ProfileCopy {
  location: string
  hook: string
  supporting: string
  /** Short label for the sticky header button. */
  headerCta: string
  availabilityLabel: string
}

interface Profile extends ProfileFacts, ProfileCopy {}

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
