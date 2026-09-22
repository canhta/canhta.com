export type Locale = 'en' | 'vi'

export type BuildKind = 'agent' | 'skill' | 'mobile' | 'web' | 'saas' | 'tool' | 'desktop'
export type BuildLinkKind = 'appstore' | 'playstore' | 'web' | 'github' | 'docs'
export type BuildStatus = 'live' | 'shipped' | 'building' | 'acquired' | 'sunset'

export interface BuildLink {
  kind: BuildLinkKind
  url: string
}

export interface Proof {
  label: string
  value: string
}

export interface BuildFacts {
  slug: string
  order: number
  name: string
  status: BuildStatus
  year: string
  kind: BuildKind
  cover?: string
  logo?: string
  links: BuildLink[]
}

export interface BuildCopy {
  slug: string
  tagline: string
  problem: string
  built: string
  result: string
  proof?: Proof
}

export interface Build extends BuildFacts, Omit<BuildCopy, 'slug'> {}

export interface CapabilityFacts {
  id: 'agentic' | 'mobile' | 'web' | 'saas'
  order: number
}

export interface CapabilityCopy {
  id: CapabilityFacts['id']
  name: string
  bestFor: string
  canDeliver: string
}

export interface Capability extends CapabilityFacts, Omit<CapabilityCopy, 'id'> {}

export interface ServiceFacts {
  id: 'advisory' | 'sprint' | 'endToEnd'
  order: number
}

export interface ServiceCopy {
  id: ServiceFacts['id']
  name: string
  output: string
  suitedTo: string
}

export interface Service extends ServiceFacts, Omit<ServiceCopy, 'id'> {}

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
  network: 'github' | 'x' | 'linkedin' | 'email' | 'zalo'
  url: string
}

export interface SpecRow {
  id: 'location' | 'languages' | 'replyTime' | 'nowBuilding'
  label: string
  value: string
}

export interface ProfileFacts {
  name: string
  ctaHref: string
  avatar: string
  available: boolean
}

export interface ProfileCopy {
  location: string
  hook: string
  supporting: string
  ctaLabel: string
  availabilityLabel: string
  spec: SpecRow[]
}

export interface Profile extends ProfileFacts, ProfileCopy {}

export interface ContentCopy {
  profile: ProfileCopy
  builds: BuildCopy[]
  capabilities: CapabilityCopy[]
  services: ServiceCopy[]
  faq: FaqCopy[]
}

export interface SiteContent {
  profile: Profile
  builds: Build[]
  capabilities: Capability[]
  services: Service[]
  faq: Faq[]
  social: SocialLink[]
}

export interface FixtureMarked {
  readonly __fixture: true
}
