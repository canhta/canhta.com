import { enPages } from './locales/pages-en'
import { viPages } from './locales/pages-vi'
import type { Locale } from './types'

/**
 * The longer pages: about, privacy, terms and one page per app. Each language is
 * written as its own page (see `locales/pages-*.ts`); this file holds the shape
 * and checks that both languages carry the same sections in the same order.
 */

/** An outside address, or one of our own pages by its key (resolved to the reader's language). */
export type DocLink =
  | { label: string; url: string }
  | { label: string; page: 'home' | 'services' | 'products' | 'contact' | 'about' | 'privacy' | 'terms' | 'scori' | 'remoti' | 'piggo' }

export interface DocSection {
  /** Stable across languages: the anchor, and the parity check. */
  id: string
  heading: string
  paragraphs: string[]
  items?: string[]
  links?: DocLink[]
}

export interface DocCopy {
  h1: string
  intro: string
  /** "Last updated ..." for the policies. */
  updated?: string
  sections: DocSection[]
}

export interface AppFeature {
  name: string
  detail: string
}

export interface AppDetailCopy {
  h1: string
  intro: string
  audience: string
  features: AppFeature[]
  platforms: string
  /** What the app does with your information, in plain words, plus anything else worth a heading. */
  notes: DocSection[]
  links: DocLink[]
}

export interface PagesCopy {
  about: DocCopy
  privacy: DocCopy
  terms: DocCopy
  apps: Record<'scori' | 'remoti' | 'piggo', AppDetailCopy>
}

const copies: Record<Locale, PagesCopy> = { en: enPages, vi: viPages }

function sameShape(a: DocSection[], b: DocSection[], path: string) {
  const ids = (s: DocSection[]) => s.map((x) => x.id).join(',')
  if (ids(a) !== ids(b)) throw new Error(`Page sections differ between languages: ${path}`)
}

function assertText(value: unknown, path: string): void {
  if (typeof value === 'string') {
    if (value.trim().length === 0) throw new Error(`Empty page copy: ${path}`)
    if (value !== value.normalize('NFC')) throw new Error(`Page copy is not Unicode NFC: ${path}`)
    return
  }
  if (Array.isArray(value)) return value.forEach((v, i) => assertText(v, `${path}.${i}`))
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) assertText(v, `${path}.${k}`)
  }
}

for (const locale of ['en', 'vi'] as const) assertText(copies[locale], `pages.${locale}`)
for (const key of ['about', 'privacy', 'terms'] as const) sameShape(enPages[key].sections, viPages[key].sections, key)
for (const key of ['scori', 'remoti', 'piggo'] as const) {
  sameShape(enPages.apps[key].notes, viPages.apps[key].notes, `apps.${key}`)
  if (enPages.apps[key].features.length !== viPages.apps[key].features.length) {
    throw new Error(`App features differ between languages: ${key}`)
  }
  if (enPages.apps[key].links.length !== viPages.apps[key].links.length) {
    throw new Error(`App links differ between languages: ${key}`)
  }
}

export function getPageCopy(locale: Locale): PagesCopy {
  return copies[locale]
}
