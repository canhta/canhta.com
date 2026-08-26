import { profile, socialByNetwork } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { ZaloWordmark } from './icons'

/**
 * The contact pair, in one place.
 *
 * The primary button's markup was duplicated in the hero and in FIG. 4, and a
 * third copy sat in the footer until it was cut. Three hand-maintained copies of
 * the page's conversion action is how they drift apart.
 *
 * Zalo sits beside it rather than replacing it because they are different
 * affordances, not two CTAs: one books time, the other opens a chat that a
 * Vietnamese visitor already has on their phone. It is styled as the secondary
 * of the pair so the hierarchy stays single.
 */
export function ContactActions({ locale }: { locale: Locale }) {
  const zalo = socialByNetwork('zalo')

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={profile.ctaHref}
        className="group inline-flex h-12 items-center justify-between gap-6 rounded-none bg-ink px-5 text-paper transition-colors duration-150 hover:bg-live-text"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
          {t(profile.ctaLabel, locale)}
        </span>
        <span aria-hidden="true" className="font-mono text-[11px]">
          →
        </span>
      </a>

      {zalo ? (
        <a
          href={zalo.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-12 items-center gap-2.5 border border-rule-strong px-5 text-graphite transition-colors duration-150 hover:border-ink hover:text-ink"
        >
          {/* The wordmark carries the brand name, so the label says the verb
              rather than repeating it. */}
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
            {t({ en: 'Chat on', vi: 'Nhắn qua' }, locale)}
          </span>
          <ZaloWordmark />
          <span className="sr-only">{t({ en: 'opens in a new tab', vi: 'mở trong tab mới' }, locale)}</span>
        </a>
      ) : null}
    </div>
  )
}
