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
 * The palette's two accents are semantic, and status is where that pays off:
 * LIVE (red) means running for real. PLAN (blue) means still on paper.
 */
export function statusTone(status: BuildStatus): string {
  switch (status) {
    case 'live':
      return 'text-live'
    case 'shipped':
      return 'text-live'
    case 'building':
      return 'text-plan'
    default:
      return 'text-graphite'
  }
}
