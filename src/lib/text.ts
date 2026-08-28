import type { Locale, LocalizedText } from '@/content/types'

/**
 * VIETNAMESE REGISTER — one decision, applied to every string on the site.
 *
 * Canh is `tôi`. The reader is `bạn`. Nothing else.
 *
 * `anh/chị` was the alternative and it is wrong here for two reasons: it needs
 * to know the reader's gender and seniority, which a public page cannot, and it
 * puts the writer below the reader — which reads as a vendor pitching, not as a
 * developer explaining what he does. `tôi/bạn` is what a Vietnamese developer
 * writing his own site actually uses: level, adult, neither cold nor familiar.
 *
 * The FAQ used to break this. Its *questions* addressed Canh as `anh` ("Anh
 * tính giá thế nào?") while every answer said `tôi` and every other section said
 * `bạn`, so the page had the reader switching how they addressed him halfway
 * down. The fix is what Vietnamese FAQ pages actually do: the questions carry no
 * pronoun for Canh at all ("Chi phí tính thế nào?", "Làm cùng team sẵn có được
 * không?"). A question with no pronoun in it cannot contradict the answer under
 * it.
 *
 * Two consequences worth stating, because they look like sloppiness otherwise:
 *
 * - English loanwords stay English where Vietnamese developers say them
 *   unchanged: app, web, deploy, production, agent, skill, SaaS, team, dev,
 *   credit, registry. Translating those is the loudest tell that copy was
 *   machine-translated rather than written.
 * - The everyday verb wins over the Sino-Vietnamese one. `làm`, not `xây dựng`;
 *   `bảo trì`, not `duy trì`; `trả lời`, not `phản hồi`.
 */

/** Resolve localized copy, falling back to English rather than rendering nothing. */
export function t(text: LocalizedText, locale: Locale): string {
  const value = text[locale]
  return value && value.length > 0 ? value : text.en
}
