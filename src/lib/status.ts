import type { BuildStatus, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/** Status is communicated as text, never by colour alone. */
export function statusLabel(status: BuildStatus, locale: Locale): string {
  return getMessages(locale).statuses[status]
}

/**
 * One accent, one meaning: it exists for real and you can go look at it.
 *
 * The previous system had two semantic hues (blue "on paper", red "running")
 * plus a third darkened red for text, and it needed all three because the same
 * red failed contrast as 11px type while working as a 1.5px stroke. That is
 * three tokens encoding one binary. Everything that is not shipped is simply
 * the page's ordinary secondary text, and the word beside it says which.
 */
export function statusTone(status: BuildStatus): string {
  switch (status) {
    case 'live':
    case 'shipped':
      return 'text-accent'
    default:
      return 'text-muted'
  }
}
