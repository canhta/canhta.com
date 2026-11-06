import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import type { BuildLinkKind } from '@/content/types'
import { linkLabel } from '@/lib/build-meta'

const LINK_KINDS: BuildLinkKind[] = ['web', 'github', 'docs']

describe('build metadata', () => {
  it('labels every destination used by the content', () => {
    for (const build of getSiteContent('en').builds) {
      for (const link of build.links) expect(linkLabel(link.kind, 'en')).not.toHaveLength(0)
    }
  })

  it('gives each link destination a useful, distinct label', () => {
    const labels = LINK_KINDS.map((kind) => linkLabel(kind, 'en'))
    expect(new Set(labels).size).toBe(LINK_KINDS.length)
    expect(labels.map((label) => label.toLowerCase())).not.toContain('open')
  })
})
