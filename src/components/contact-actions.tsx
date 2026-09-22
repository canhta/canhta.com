import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ArrowIcon, ZaloWordmark } from './icons'

/**
 * The conversion pair, in one place.
 *
 * The primary button's markup was once duplicated in three sections, which is
 * how three copies of one action drift apart. It appears twice on the page now —
 * once where a visitor arrives and once where they finish — and both are this
 * component.
 *
 * Zalo sits beside it rather than replacing it because they are different
 * affordances, not two CTAs: one opens a considered email, the other opens a
 * chat a Vietnamese visitor already has on their phone. It is styled as the
 * secondary of the pair so the hierarchy stays single.
 *
 * `invert` is for the closing block, where the ground is ink rather than paper.
 */
export function ContactActions({ locale, invert = false }: { locale: Locale; invert?: boolean }) {
  const { profile, social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const zalo = social.find((item) => item.network === 'zalo')

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={profile.ctaHref}
        className={
          invert
            ? 'inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-bg px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-accent hover:text-on-accent'
            : 'btn-primary'
        }
      >
        {profile.ctaLabel}
        <ArrowIcon width={16} height={16} />
      </a>

      {zalo ? (
        <a
          href={zalo.url}
          target="_blank"
          rel="noreferrer noopener"
          className={
            invert
              ? 'inline-flex min-h-12 items-center gap-2.5 rounded-[2px] border border-bg/30 px-[18px] text-[15px] font-medium text-bg/80 transition-colors duration-150 hover:border-bg hover:text-bg'
              : 'btn-secondary'
          }
        >
          {/* The wordmark carries the brand name, so the label says the verb
              rather than repeating it. */}
          {messages.contact.chatOn}
          <ZaloWordmark />
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}
    </div>
  )
}
