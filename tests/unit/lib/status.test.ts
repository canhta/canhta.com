import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import type { BuildStatus } from '@/content/types'
import { statusLabel, statusTone } from '@/lib/status'

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

describe('statusTone', () => {
  it('uses the accent only for work people can inspect', () => {
    expect(statusTone('live')).toBe('text-accent')
    expect(statusTone('shipped')).toBe('text-accent')
    expect(statusTone('building')).toBe('text-muted')
    expect(statusTone('acquired')).toBe('text-muted')
    expect(statusTone('sunset')).toBe('text-muted')
  })

  it('does not encode every status as a separate colour', () => {
    expect(new Set(STATUSES.map(statusTone)).size).toBeLessThan(STATUSES.length)
  })

  it('returns class names rather than raw colours', () => {
    for (const status of STATUSES) {
      expect(statusTone(status)).toMatch(/^text-[a-z]+(-[a-z]+)*$/)
    }
  })
})
