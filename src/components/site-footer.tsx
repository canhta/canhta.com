import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale, SocialLink } from '@/content/types'
import { getMessages } from '@/i18n/messages'
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
  const email = social.find((s) => s.network === 'email')
  const whatsapp = social.find((s) => s.network === 'whatsapp')
  const year = new Date().getFullYear()

  return (
    <footer className="shell band-1 pb-10">
      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
        <nav aria-label={messages.footer.explore}>
          <p className="text-[14px] font-semibold text-muted">{messages.footer.explore}</p>
          <ul className="mt-2">
            <li>
              <Link href="/" className="block py-1.5 font-semibold">
                {messages.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/services" className="block py-1.5 font-semibold">
                {messages.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/products" className="block py-1.5 font-semibold">
                {messages.nav.products}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-1.5 font-semibold">
                {messages.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {email ? (
          <div>
            <p className="text-[14px] font-semibold text-muted">{messages.footer.write}</p>
            <a
              href={email.url}
              className="link mt-2 inline-block text-[clamp(1.1rem,2vw,1.4rem)] font-bold"
              translate="no"
            >
              {email.url.replace('mailto:', '')}
            </a>
          </div>
        ) : null}

        <div>
          <p className="text-[14px] font-semibold text-muted">{messages.footer.elsewhere}</p>
          <ul className="mt-2 flex flex-wrap items-center gap-2">
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
                      className={`grid h-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-150 hover:bg-ink hover:text-bg ${
                        s.network === 'zalo' ? 'px-3' : 'w-11'
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
                  className="grid h-11 place-items-center rounded-full border border-line-strong px-3 text-[13px] font-bold transition-colors duration-150 hover:bg-ink hover:text-bg"
                >
                  <span translate="no">WhatsApp</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <p className="mt-10 text-[14px] text-muted">
        © {year} <span translate="no">{profile.name}</span>
      </p>
    </footer>
  )
}
