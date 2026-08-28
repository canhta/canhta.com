import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { ContactActions } from './contact-actions'

/**
 * The end of the argument, and the only place on the page that inverts.
 *
 * A visitor who has read this far has already met the primary action once, at
 * the top, and has spent four sections deciding. Ink ground is the one piece of
 * contrast the page spends, and it is spent here — where the reading order ends
 * and the decision is made — rather than on decorating a section head.
 *
 * There used to be a third copy of this CTA in the footer, roughly 250px below,
 * with the plain email address forty pixels from that: three doors to one inbox.
 * The address is a genuinely different affordance (copy it, write later, from
 * somewhere else), so it stays — in the footer, alone.
 */
const COPY = {
  heading: {
    en: 'Have a problem worth automating? Let’s talk.',
    vi: 'Có việc đáng để tự động hoá? Nói chuyện nhé.',
  },
  reassure: {
    en: 'No spec needed, no sales call. Tell me where the work is stuck and you get a reply within one working day.',
    vi: 'Không cần spec, không phải cuộc gọi bán hàng. Cứ nói chỗ công việc đang vướng, bạn sẽ có phản hồi trong một ngày làm việc.',
  },
} as const

export function Closing({ locale }: { locale: Locale }) {
  return (
    <section className="bg-ink text-bg">
      <div className="shell band-1 pb-[var(--rank-1)]">
        <h2 className="title max-w-[20ch]">{t(COPY.heading, locale)}</h2>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-bg/70">
          {t(COPY.reassure, locale)}
        </p>
        <div className="mt-9">
          <ContactActions locale={locale} invert />
        </div>
      </div>
    </section>
  )
}
