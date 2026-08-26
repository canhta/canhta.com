import { describe, expect, it } from 'vitest'
import { builds, capabilities } from '@/content'
import type { BuildKind, BuildLinkKind, Locale } from '@/content/types'
import { KIND_ORDER, kindLabel, linkLabel } from '@/lib/build-meta'
import { OUTPUTS } from '@/components/signature/nodes'
import { t } from '@/lib/text'

const LOCALES: Locale[] = ['en', 'vi']
const LINK_KINDS: BuildLinkKind[] = ['appstore', 'playstore', 'web', 'github', 'docs']

describe('kindLabel', () => {
  it('has an exact wording for every BuildKind in both locales', () => {
    const expected: Record<BuildKind, Record<Locale, string>> = {
      agent: { en: 'Work that runs itself', vi: 'Việc tự nó chạy' },
      skill: { en: 'Agent skill', vi: 'Kỹ năng agent' },
      mobile: { en: 'Phone app', vi: 'App điện thoại' },
      web: { en: 'Web product', vi: 'Sản phẩm web' },
      saas: { en: 'Paid product', vi: 'Sản phẩm thu phí' },
      tool: { en: 'Developer tool', vi: 'Công cụ lập trình' },
    }

    for (const kind of KIND_ORDER) {
      for (const locale of LOCALES) {
        expect(kindLabel(kind, locale)).toBe(expected[kind][locale])
      }
    }
  })

  it('never leaks a stack word into a label a client reads', () => {
    for (const kind of KIND_ORDER) {
      for (const locale of LOCALES) {
        expect(kindLabel(kind, locale)).not.toMatch(/react|next|api|stack|sdk/i)
      }
    }
  })

  it('labels every kind the fixtures actually use', () => {
    for (const build of builds) {
      expect(kindLabel(build.kind, 'en').length).toBeGreaterThan(0)
      expect(kindLabel(build.kind, 'vi').length).toBeGreaterThan(0)
    }
  })
})

/**
 * The same four buckets are named in three places: FIG. 3's column heads
 * (`capabilities`), the schedule's KIND column (`kindLabel`) and FIG. 1's
 * callout list (`OUTPUTS`). They previously carried four different wordings,
 * two of which differed only by an article. Divergence here is the exact
 * regression that was just fixed, so it is pinned from both sides.
 */
describe('the four shared buckets stay one taxonomy', () => {
  const BUCKETS = [
    { capability: 'agentic', kind: 'agent' },
    { capability: 'mobile', kind: 'mobile' },
    { capability: 'web', kind: 'web' },
    { capability: 'saas', kind: 'saas' },
  ] as const

  /** English pluralises the column head and takes an article in the callout. */
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/^an? /, '')
      .replace(/s$/, '')

  const capabilityHead = (id: string, locale: Locale) => {
    const cap = capabilities.find((c) => c.id === id)
    if (!cap) throw new Error(`no capability ${id}`)
    return t(cap.name, locale)
  }

  const calloutLabel = (id: string, locale: Locale) => {
    const out = OUTPUTS.find((o) => o.id === id)
    if (!out) throw new Error(`no output ${id}`)
    return t(out.label, locale)
  }

  it('uses one identical Vietnamese wording across all three lists', () => {
    for (const bucket of BUCKETS) {
      const head = capabilityHead(bucket.capability, 'vi')
      expect(kindLabel(bucket.kind, 'vi')).toBe(head)
      expect(calloutLabel(bucket.kind, 'vi')).toBe(head)
    }
  })

  it('uses one English wording across the column heads and the callout list', () => {
    for (const bucket of BUCKETS) {
      expect(normalize(calloutLabel(bucket.kind, 'en'))).toBe(
        normalize(capabilityHead(bucket.capability, 'en')),
      )
    }
  })

  it('uses the column head wording for the KIND column', () => {
    // Every bucket is compared strictly now. `agent` used to be excluded here:
    // its English label read 'Runs itself' where the column head said 'Work that
    // runs itself', dropping the noun rather than just the plural. That was a
    // real gap and it has been closed in src/lib/build-meta.ts, so the exclusion
    // is gone — a future rename on either side fails this test.
    for (const bucket of BUCKETS) {
      expect(normalize(kindLabel(bucket.kind, 'en'))).toBe(
        normalize(capabilityHead(bucket.capability, 'en')),
      )
    }
  })
})

describe('linkLabel', () => {
  it('names the destination for every BuildLinkKind in both locales', () => {
    const expected: Record<BuildLinkKind, Record<Locale, string>> = {
      appstore: { en: 'App Store', vi: 'App Store' },
      playstore: { en: 'Google Play', vi: 'Google Play' },
      web: { en: 'Visit site', vi: 'Xem trang' },
      github: { en: 'Source', vi: 'Mã nguồn' },
      docs: { en: 'Docs', vi: 'Tài liệu' },
    }

    for (const kind of LINK_KINDS) {
      for (const locale of LOCALES) {
        expect(linkLabel(kind, locale)).toBe(expected[kind][locale])
      }
    }
  })

  it('never falls back to a generic "Open", which is wrong for a store listing', () => {
    for (const kind of LINK_KINDS) {
      for (const locale of LOCALES) {
        expect(linkLabel(kind, locale).toLowerCase()).not.toBe('open')
      }
    }
  })

  it('keeps store names as proper nouns rather than translating them', () => {
    expect(linkLabel('appstore', 'vi')).toBe(linkLabel('appstore', 'en'))
    expect(linkLabel('playstore', 'vi')).toBe(linkLabel('playstore', 'en'))
  })

  it('gives each destination its own wording per locale', () => {
    for (const locale of LOCALES) {
      const labels = LINK_KINDS.map((k) => linkLabel(k, locale))
      expect(new Set(labels).size).toBe(LINK_KINDS.length)
    }
  })

  it('labels every link kind the fixtures actually use', () => {
    for (const build of builds) {
      for (const link of build.links) {
        expect(linkLabel(link.kind, 'en').length).toBeGreaterThan(0)
      }
    }
  })
})

describe('KIND_ORDER', () => {
  it('lists every BuildKind exactly once', () => {
    const all: BuildKind[] = ['agent', 'skill', 'mobile', 'web', 'saas', 'tool']
    expect([...KIND_ORDER].sort()).toEqual([...all].sort())
    expect(new Set(KIND_ORDER).size).toBe(KIND_ORDER.length)
  })
})
