import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale, SocialLink } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact } from '@/lib/contact'
import { GitHubIcon, LinkedInIcon, XIcon, ZaloWordmark } from './icons'

/** The colophon: pages, the plain email address, and where to check we are real. */
const ICONS = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  zalo: ZaloWordmark,
} as const

const NETWORK_LABELS: Record<keyof typeof ICONS | 'whatsapp', string> = {
  github: 'GitHub',
  x: 'X',
  linkedin: 'LinkedIn',
  zalo: 'Zalo',
  whatsapp: 'WhatsApp',
}

function isIconNetwork(n: SocialLink['network']): n is keyof typeof ICONS {
  return n in ICONS
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const { profile, social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const mail = mailContact(locale)
  const whatsapp = social.find((s) => s.network === 'whatsapp')
  const year = new Date().getFullYear()

  return (
    <footer className="sheet ground-night on-night pt-[calc(var(--space)*0.8)] pb-10">
      <div className="shell">
        <p className="mb-3 text-[14px] font-bold text-dim">{messages.footer.write}</p>
        <a
          href={mail.href}
          className="inline-block min-h-11 text-[clamp(1.75rem,5.6vw,4.75rem)] leading-[1.1] font-extrabold tracking-[-0.04em] break-all text-white underline decoration-accent decoration-[3px] underline-offset-[0.18em] hover:decoration-white sm:break-normal"
          translate="no"
        >
          {mail.address}
        </a>

        <div className="mt-14 grid gap-10 border-t border-white/25 pt-10 md:grid-cols-3">
          <nav aria-label={messages.footer.explore}>
            <p className="text-[14px] font-bold text-dim">{messages.footer.explore}</p>
            <ul className="mt-2">
              {(
                [
                  ['/', messages.nav.home],
                  ['/services', messages.nav.services],
                  ['/products', messages.nav.products],
                  ['/contact', messages.nav.contact],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="flex min-h-11 items-center text-[17px] font-bold hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[14px] font-bold text-dim">{messages.footer.elsewhere}</p>
            <ul className="mt-3 flex flex-wrap items-center gap-2">
              {social
                .filter((s) => isIconNetwork(s.network))
                .map((s) => {
                  const Icon = ICONS[s.network as keyof typeof ICONS]
                  return (
                    <li key={s.network}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${NETWORK_LABELS[s.network as keyof typeof ICONS]} (${messages.common.newTab})`}
                        className={`grid h-11 place-items-center rounded-full border border-white/40 text-white transition-colors duration-150 hover:bg-accent hover:text-night ${
                          s.network === 'zalo' ? 'px-4' : 'w-11'
                        }`}
                      >
                        <Icon />
                      </a>
                    </li>
                  )
                })}
              {whatsapp ? (
                <li>
                  <a
                    href={whatsapp.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`WhatsApp (${messages.common.newTab})`}
                    className="grid h-11 place-items-center rounded-full border border-white/40 px-4 text-[13px] font-bold transition-colors duration-150 hover:bg-accent hover:text-night"
                  >
                    <span translate="no">WhatsApp</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <p className="mt-12 text-[14px] text-dim">
          © {year} <span translate="no">{profile.name}</span>
        </p>
      </div>
    </footer>
  )
}
