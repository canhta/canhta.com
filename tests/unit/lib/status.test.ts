import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import type { BuildStatus } from '@/content/types'
import { statusLabel } from '@/lib/status'

const STATUSES: BuildStatus[] = ['live', 'shipped', 'building', 'acquired', 'sunset']

describe('statusLabel', () => {
  it('labels every status used by the content', () => {
    for (const build of getSiteContent('en').builds) {
      expect(statusLabel(build.status, 'en').trim()).not.toHaveLength(0)
    }
  })

  it('distinguishes all statuses in the reference locale', () => {
    const labels = STATUSES.map((status) => statusLabel(status, 'en'))
    expect(new Set(labels).size).toBe(STATUSES.length)
  })
})
