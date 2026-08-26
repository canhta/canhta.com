import { profile, social } from '@/content'
import type { Locale, SocialLink } from '@/content/types'
import { t } from '@/lib/text'
import { GitHubIcon, LinkedInIcon, XIcon, ZaloIcon } from './icons'

const COPY = {
  closing: {
    en: 'Have a problem worth automating? Let’s talk.',
    vi: 'Có việc đáng để tự động hoá? Nói chuyện nhé.',
  },
  origin: { en: 'Built in Vietnam, shipped worldwide', vi: 'Làm tại Việt Nam, ship đi khắp nơi' },
  sheet: { en: 'Sheet 1 of 1', vi: 'Bản 1 / 1' },
  newTab: { en: 'opens in a new tab', vi: 'mở trong tab mới' },
} as const

const ICONS = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  zalo: ZaloIcon,
} as const

/** An icon button's only name is its label, so it says the destination, not the key. */
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
    <footer className="border-t border-ink">
      <div className="container-sheet py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-[20ch] text-[clamp(1.4rem,2.6vw,1.85rem)] leading-[1.1] font-extrabold tracking-[-0.035em]">
              {t(COPY.closing, locale)}
            </p>
            {/* The third CTA was here, identical to FIG. 4's and about 250px
                below it, and the footer was already offering the plain address
                forty pixels away — two doors to one inbox. The address is the
                different affordance, so it is the one that stays. */}
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <ul className="flex flex-wrap items-center gap-2">
              {social.filter((s) => isIconNetwork(s.network)).map((s) => {
                const Icon = ICONS[s.network as keyof typeof ICONS]
                return (
                  <li key={s.network}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${NETWORK_LABELS[s.network as keyof typeof ICONS]} (${t(COPY.newTab, locale)})`}
                      className="grid h-11 w-11 place-items-center rounded-none border border-rule text-graphite transition-colors duration-150 hover:border-ink hover:text-ink"
                    >
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
            {email ? (
              <a
                href={email.url}
                className="mt-4 inline-block font-mono text-[11px] underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                translate="no"
              >
                {email.url.replace('mailto:', '')}
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
          <p className="annot">
            © {year} {profile.name.toUpperCase()}
          </p>
          <p className="annot">{t(COPY.origin, locale).toUpperCase()}</p>
          <p className="annot">{t(COPY.sheet, locale).toUpperCase()}</p>
        </div>
      </div>
    </footer>
  )
}
