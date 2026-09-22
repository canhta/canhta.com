import type { BuildKind, BuildLinkKind, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Said the way a client would say it, not the way a stack would — and worded
 * identically to the scope column heads in the resolved content catalog.
 * Both lists name the same four buckets. They once used four different wordings
 * across three lists; the only difference that survives is singular here versus
 * plural in a column head.
 *
 * `agent` was the last holdout — it read 'Runs itself' while the column head
 * said 'Work that runs itself', dropping the noun rather than just the plural.
 * A unit test now pins all four against the other list.
 */
export function kindLabel(kind: BuildKind, locale: Locale): string {
  return getMessages(locale).buildMeta.kinds[kind]
}

export function linkLabel(kind: BuildLinkKind, locale: Locale): string {
  return getMessages(locale).buildMeta.links[kind]
}

/** Stable display order for grouping by kind. */
export const KIND_ORDER: BuildKind[] = ['agent', 'skill', 'mobile', 'web', 'saas', 'tool', 'desktop']
