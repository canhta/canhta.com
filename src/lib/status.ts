import type { BuildStatus, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/** Status is communicated as text, never by colour alone. */
export function statusLabel(status: BuildStatus, locale: Locale): string {
  return getMessages(locale).statuses[status]
}
