import en from '../../messages/en.json'
import vi from '../../messages/vi.json'
import type { Locale } from '@/content/types'

export type AppMessages = typeof en
export type ApproachMessages = AppMessages['approach']

const catalogs: Record<Locale, AppMessages> = { en, vi }

function assertCatalogShape(reference: unknown, candidate: unknown, path = 'messages'): void {
  if (typeof reference === 'string') {
    if (typeof candidate !== 'string' || candidate.trim().length === 0) {
      throw new Error(`Missing localized message: ${path}`)
    }
    if (candidate !== candidate.normalize('NFC')) {
      throw new Error(`Message is not Unicode NFC: ${path}`)
    }
    return
  }

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      throw new Error(`Locale array does not match reference: ${path}`)
    }
    reference.forEach((item, index) => assertCatalogShape(item, candidate[index], `${path}.${index}`))
    return
  }

  if (reference !== null && typeof reference === 'object') {
    if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
      throw new Error(`Locale object does not match reference: ${path}`)
    }

    const referenceKeys = Object.keys(reference)
    const candidateKeys = Object.keys(candidate)
    if (referenceKeys.length !== candidateKeys.length) {
      throw new Error(`Locale keys do not match reference: ${path}`)
    }

    for (const key of referenceKeys) {
      if (!(key in candidate)) throw new Error(`Missing localized message: ${path}.${key}`)
      assertCatalogShape(
        (reference as Record<string, unknown>)[key],
        (candidate as Record<string, unknown>)[key],
        `${path}.${key}`,
      )
    }
  }
}

assertCatalogShape(en, vi)

export function getMessages(locale: Locale): AppMessages {
  return catalogs[locale]
}
