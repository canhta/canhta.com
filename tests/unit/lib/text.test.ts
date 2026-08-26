import { describe, expect, it } from 'vitest'
import type { LocalizedText } from '@/content/types'
import { t } from '@/lib/text'

describe('t', () => {
  const full: LocalizedText = { en: 'Shipped', vi: 'Đã ship' }

  it('returns the requested locale when it has copy', () => {
    expect(t(full, 'en')).toBe('Shipped')
    expect(t(full, 'vi')).toBe('Đã ship')
  })

  it('falls back to English when the locale string is empty', () => {
    expect(t({ en: 'Shipped', vi: '' }, 'vi')).toBe('Shipped')
  })

  it('falls back to English when the locale key is missing entirely', () => {
    // Untranslated content arrives from a CMS or a half-finished PR shaped like
    // this. The type forbids it; the runtime must survive it, because rendering
    // nothing is worse than rendering English.
    const partial = { en: 'Shipped' } as unknown as LocalizedText
    expect(t(partial, 'vi')).toBe('Shipped')
  })

  it('preserves falsy-looking but legitimate copy', () => {
    expect(t({ en: 'zero', vi: '0' }, 'vi')).toBe('0')
  })

  it('does not fall back when English itself is the requested locale', () => {
    expect(t({ en: '', vi: 'Đã ship' }, 'en')).toBe('')
  })
})
