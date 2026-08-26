import type { BuildKind, BuildLinkKind, Locale, LocalizedText } from '@/content/types'

/**
 * Said the way a client would say it, not the way a stack would — and worded
 * identically to the FIG. 3 column heads in `content/capabilities.fixture.ts`.
 * These two lists and `signature/nodes.ts` name the same four buckets; they
 * previously used four different wordings, two of which differed only by an
 * article.
 */
const KIND_LABELS: Record<BuildKind, LocalizedText> = {
  agent: { en: 'Runs itself', vi: 'Việc tự nó chạy' },
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

/** Stable display order for grouping the schedule. */
export const KIND_ORDER: BuildKind[] = ['agent', 'skill', 'mobile', 'web', 'saas', 'tool']
