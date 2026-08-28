import type { BuildStatus, Locale, LocalizedText } from '@/content/types'

/** Status is communicated as text, never by colour alone. */
const LABELS: Record<BuildStatus, LocalizedText> = {
  live: { en: 'Live', vi: 'Đang chạy' },
  shipped: { en: 'Shipped', vi: 'Đã ship' },
  building: { en: 'Building', vi: 'Đang xây' },
  acquired: { en: 'Acquired', vi: 'Đã bán' },
  sunset: { en: 'Sunset', vi: 'Đã dừng' },
}

export function statusLabel(status: BuildStatus, locale: Locale): string {
  return LABELS[status][locale] || LABELS[status].en
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
