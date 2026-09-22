import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import type { BuildKind, BuildLinkKind } from '@/content/types'
import { KIND_ORDER, kindLabel, linkLabel } from '@/lib/build-meta'

const LINK_KINDS: BuildLinkKind[] = ['appstore', 'playstore', 'web', 'github', 'docs']

describe('build metadata', () => {
  it('labels every kind and destination used by the content', () => {
    for (const build of getSiteContent('en').builds) {
      expect(kindLabel(build.kind, 'en')).not.toHaveLength(0)
      for (const link of build.links) expect(linkLabel(link.kind, 'en')).not.toHaveLength(0)
    }
  })

  it('does not expose implementation jargon as a client-facing kind', () => {
    for (const kind of KIND_ORDER) {
      expect(kindLabel(kind, 'en')).not.toMatch(/react|next|api|stack|sdk/i)
    }
  })

  it('gives each link destination a useful, distinct label', () => {
    const labels = LINK_KINDS.map((kind) => linkLabel(kind, 'en'))
    expect(new Set(labels).size).toBe(LINK_KINDS.length)
    expect(labels.map((label) => label.toLowerCase())).not.toContain('open')
  })

  it('lists every build kind exactly once', () => {
    const all: BuildKind[] = ['agent', 'skill', 'mobile', 'web', 'saas', 'tool', 'desktop']
    expect([...KIND_ORDER].sort()).toEqual([...all].sort())
    expect(new Set(KIND_ORDER).size).toBe(KIND_ORDER.length)
  })
})
