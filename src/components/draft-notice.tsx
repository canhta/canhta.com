import { CONTENT_IS_FIXTURE } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

/**
 * Shown whenever the content is placeholder — including in production.
 *
 * This used to hide itself when `NODE_ENV === 'production'`, on the assumption
 * that the build guard in `src/content/index.ts` made a production build with
 * fixtures impossible. That assumption breaks the moment anyone sets
 * `ALLOW_FIXTURES=1` on a deploy, which is exactly what a preview of unfinished
 * content is — and the result was the worst possible combination: invented
 * copy, served publicly, with the warning suppressed. The guard is still the
 * real defence; this is what makes its bypass visible instead of silent.
 *
 * It was a full-bleed solid red bar. On a page with one accent that means "this
 * is real and running", a louder use of a near-identical red at the very top
 * said the opposite of what the page spends the rest of its length arguing —
 * and it was the single most prominent element above the fold. A notice about
 * the site's own build state should not outrank the site. Same information,
 * ranked correctly.
 *
 * It is also translated now. It was English on both routes, which made the one
 * element admitting the content is unfinished the one element that was.
 */
const COPY = {
  label: { en: 'Draft', vi: 'Bản nháp' },
  body: {
    en: 'The projects are real. The profile, engagements and answers are still placeholder copy.',
    vi: 'Các dự án là thật. Phần giới thiệu, hình thức hợp tác và câu hỏi vẫn là nội dung tạm.',
  },
} as const

export function DraftNotice({ locale }: { locale: Locale }) {
  if (!CONTENT_IS_FIXTURE) return null

  return (
    <div className="border-b border-accent/20 bg-accent-tint">
      <p className="shell flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5 text-[13px] text-accent">
        <span className="label text-accent">{t(COPY.label, locale)}</span>
        <span>{t(COPY.body, locale)}</span>
      </p>
    </div>
  )
}
