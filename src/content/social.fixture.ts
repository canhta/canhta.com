import type { SocialLink, FixtureMarked } from './types'

export const socialFixture: (SocialLink & FixtureMarked)[] = [
  { __fixture: true, network: 'github', url: 'https://github.com/canhta' },
  { __fixture: true, network: 'x', url: 'https://x.com/canhta' },
  { __fixture: true, network: 'linkedin', url: 'https://linkedin.com/in/canhta' },
  { __fixture: true, network: 'email', url: 'mailto:hello@canhta.com' },
]
