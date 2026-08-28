import type { BuildKind, BuildLinkKind, Locale, LocalizedText } from '@/content/types'

/**
 * Said the way a client would say it, not the way a stack would — and worded
 * identically to the scope column heads in `content/capabilities.fixture.ts`.
 * Both lists name the same four buckets. They once used four different wordings
 * across three lists; the only difference that survives is singular here versus
 * plural in a column head.
 *
 * `agent` was the last holdout — it read 'Runs itself' while the column head
 * said 'Work that runs itself', dropping the noun rather than just the plural.
 * A unit test now pins all four against the other list.
 */
const KIND_LABELS: Record<BuildKind, LocalizedText> = {
  agent: { en: 'Work that runs itself', vi: 'Việc tự nó chạy' },
  skill: { en: 'Agent skill', vi: 'Kỹ năng agent' },
  mobile: { en: 'Phone app', vi: 'App điện thoại' },
  web: { en: 'Web product', vi: 'Sản phẩm web' },
  saas: { en: 'Paid product', vi: 'Sản phẩm thu phí' },
  tool: { en: 'Developer tool', vi: 'Công cụ lập trình' },
}

/** "Open ↗" is wrong for a store listing, so each destination says where it goes. */
const LINK_LABELS: Record<BuildLinkKind, LocalizedText> = {
  appstore: { en: 'App Store', vi: 'App Store' },
  playstore: { en: 'Google Play', vi: 'Google Play' },
  web: { en: 'Visit site', vi: 'Xem trang' },
  github: { en: 'Source', vi: 'Mã nguồn' },
  docs: { en: 'Docs', vi: 'Tài liệu' },
}

export function kindLabel(kind: BuildKind, locale: Locale): string {
  const text = KIND_LABELS[kind]
  return text[locale] || text.en
}

export function linkLabel(kind: BuildLinkKind, locale: Locale): string {
  const text = LINK_LABELS[kind]
  return text[locale] || text.en
}

/** Stable display order for grouping by kind. */
export const KIND_ORDER: BuildKind[] = ['agent', 'skill', 'mobile', 'web', 'saas', 'tool']
