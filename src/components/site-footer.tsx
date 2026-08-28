import { profile, social } from '@/content'
import type { Locale, SocialLink } from '@/content/types'
import { t } from '@/lib/text'
import { GitHubIcon, LinkedInIcon, XIcon, ZaloWordmark } from './icons'

/**
 * The colophon. Everything persuasive already happened in the block above this
 * one, so the footer's whole job is the plain email address and the four places
 * a visitor can go check that the person is real.
 */
const COPY = {
  newTab: { en: 'opens in a new tab', vi: 'mở trong tab mới' },
  write: { en: 'Or write directly', vi: 'Hoặc viết thẳng' },
  elsewhere: { en: 'Elsewhere', vi: 'Nơi khác' },
} as const

const ICONS = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  zalo: ZaloWordmark,
} as const

/** An icon button's only name is its label, so it says the destination. */
const NETWORK_LABELS: Record<keyof typeof ICONS, string> = {
  github: 'GitHub',
  x: 'X',
  linkedin: 'LinkedIn',
  zalo: 'Zalo',
}

function isIconNetwork(n: SocialLink['network']): n is keyof typeof ICONS {
  return n in ICONS
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const email = social.find((s) => s.network === 'email')
  const year = new Date().getFullYear()

  return (
    <footer className="shell band-3 pb-[var(--rank-3)]">
      <div className="grid gap-10 sm:grid-cols-2">
        {email ? (
          <div>
            <p className="label">{t(COPY.write, locale)}</p>
            <a
              href={email.url}
              className="link mt-2 inline-block text-[17px] font-medium"
              translate="no"
            >
              {email.url.replace('mailto:', '')}
            </a>
          </div>
        ) : null}

        <div className="sm:justify-self-end">
          <p className="label">{t(COPY.elsewhere, locale)}</p>
          <ul className="mt-2 flex flex-wrap items-center gap-2">
            {social.filter((s) => isIconNetwork(s.network)).map((s) => {
              const Icon = ICONS[s.network as keyof typeof ICONS]
              return (
                <li key={s.network}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${NETWORK_LABELS[s.network as keyof typeof ICONS]} (${t(COPY.newTab, locale)})`}
                    /* Zalo's mark is a wordmark, not a glyph — 77x28. Forcing it
                       into the same 44x44 square as the letterform icons either
                       crops it or shrinks it below legibility, so it gets a
                       wider cell and keeps the shared height. */
                    className={`grid h-11 place-items-center rounded-[2px] border border-line text-muted transition-colors duration-150 hover:border-ink hover:text-ink ${
                      s.network === 'zalo' ? 'px-3' : 'w-11'
                    }`}
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* "Built in Vietnam, shipped worldwide" used to sit on the right of this
          row. It was a tagline rather than a fact, and the statement's fact row
          already says where he works and in which timezone. What is left is the
          one line a footer actually owes you. */}
      <p className="label mt-12 border-t border-line pt-5">
        © {year} <span translate="no">{profile.name}</span>
      </p>
    </footer>
  )
}
