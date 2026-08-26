import type { Locale, LocalizedText } from '@/content/types'

/** Resolve localized copy, falling back to English rather than rendering nothing. */
export function t(text: LocalizedText, locale: Locale): string {
  const value = text[locale]
  return value && value.length > 0 ? value : text.en
}
