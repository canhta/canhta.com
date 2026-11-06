import type { BuildLinkKind, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

export function linkLabel(kind: BuildLinkKind, locale: Locale): string {
  return getMessages(locale).buildMeta.links[kind]
}
