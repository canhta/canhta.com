import { describe, expect, it } from 'vitest'
import { builds } from '@/content'
import type { BuildStatus, Locale } from '@/content/types'
import { statusLabel, statusTone } from '@/lib/status'

const STATUSES: BuildStatus[] = ['live', 'shipped', 'building', 'acquired', 'sunset']
const LOCALES: Locale[] = ['en', 'vi']

describe('statusLabel', () => {
  it('has an exact wording for every status in both locales', () => {
    const expected: Record<BuildStatus, Record<Locale, string>> = {
      live: { en: 'Live', vi: 'Đang chạy' },
      shipped: { en: 'Shipped', vi: 'Đã ship' },
      building: { en: 'Building', vi: 'Đang làm' },
      acquired: { en: 'Acquired', vi: 'Đã bán' },
      sunset: { en: 'Sunset', vi: 'Đã dừng' },
    }

    for (const status of STATUSES) {
      for (const locale of LOCALES) {
        expect(statusLabel(status, locale)).toBe(expected[status][locale])
      }
    }
  })

  it('distinguishes all five statuses by text in each locale', () => {
    for (const locale of LOCALES) {
      const labels = STATUSES.map((s) => statusLabel(s, locale))
      expect(new Set(labels).size).toBe(STATUSES.length)
    }
  })

  it('translates rather than falling back to English on the Vietnamese route', () => {
    for (const status of STATUSES) {
      expect(statusLabel(status, 'vi')).not.toBe(statusLabel(status, 'en'))
    }
  })

  it('labels every status the fixtures actually use', () => {
    for (const build of builds) {
      expect(statusLabel(build.status, 'en').length).toBeGreaterThan(0)
      expect(statusLabel(build.status, 'vi').length).toBeGreaterThan(0)
    }
  })
})

describe('statusTone', () => {
  it('gives the one accent to the one thing it means', () => {
    // The accent means: it exists for real and you can go look at it. The
    // palette that preceded this had three tokens for the same binary — a blue
    // for "on paper", a red for "running", and a darkened copy of that red
    // because the bright one was only 3.66:1 as 11px type. One value that
    // passes contrast as text and as a button ground replaced all three.
    expect(statusTone('live')).toBe('text-accent')
    expect(statusTone('shipped')).toBe('text-accent')
  })

  it('leaves everything else as ordinary secondary text, not a second accent', () => {
    expect(statusTone('building')).toBe('text-muted')
    expect(statusTone('acquired')).toBe('text-muted')
    expect(statusTone('sunset')).toBe('text-muted')
  })

  it('never conveys status by colour alone', () => {
    // Three of the five statuses share one tone, so the colour cannot be read
    // as the status. The text is the status; the colour is emphasis. If this
    // map ever becomes injective, somebody has started encoding meaning in
    // hue — which a colour-blind reader, or a printed sheet, cannot decode.
    const tones = STATUSES.map(statusTone)
    expect(new Set(tones).size).toBeLessThan(STATUSES.length)

    for (const status of STATUSES) {
      expect(statusLabel(status, 'en').trim().length).toBeGreaterThan(0)
      expect(statusLabel(status, 'vi').trim().length).toBeGreaterThan(0)
    }
  })

  it('returns a class name, never a raw colour value', () => {
    for (const status of STATUSES) {
      expect(statusTone(status)).toMatch(/^text-[a-z]+(-[a-z]+)*$/)
    }
  })
})
