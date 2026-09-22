import { describe, expect, it } from 'vitest'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

const LOCALES: Locale[] = ['en', 'vi']

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

function shape(value: unknown): unknown {
  if (typeof value === 'string') return 'string'
  if (Array.isArray(value)) return value.map(shape)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]))
  }
  return typeof value
}

describe('locale harness', () => {
  it('keeps every catalog complete and structurally aligned', () => {
    expect(shape(getMessages('vi'))).toEqual(shape(getMessages('en')))
  })

  it.each(LOCALES)('%s has no empty or non-normalized localized strings', (locale) => {
    const localized = [...strings(getMessages(locale)), ...strings(getSiteContent(locale))]
    expect(localized.length).toBeGreaterThan(0)
    for (const value of localized) {
      expect(value.trim()).not.toHaveLength(0)
      expect(value).toBe(value.normalize('NFC'))
    }
  })

  it('keeps facts aligned while allowing the prose to change freely', () => {
    const en = getSiteContent('en')
    const vi = getSiteContent('vi')
    const facts = ({ slug, name, status, year, kind, links }: (typeof en.builds)[number]) => ({
      slug,
      name,
      status,
      year,
      kind,
      links,
    })

    expect(vi.builds.map(facts)).toEqual(en.builds.map(facts))
    expect(vi.capabilities.map(({ id }) => id)).toEqual(en.capabilities.map(({ id }) => id))
    expect(vi.services.map(({ id }) => id)).toEqual(en.services.map(({ id }) => id))
    expect(vi.faq.map(({ id }) => id)).toEqual(en.faq.map(({ id }) => id))
    expect(vi.profile.hook).not.toBe(en.profile.hook)
  })
})
