import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getSiteContent } from '@/content'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { firstSentence } from '@/lib/first-sentence'
import { OG_PAGES, type OgPage } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Drawn once per language at build time, so the CDN serves it and a link preview never runs a function. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * The shared-link card, set in the same two voices as the page: Newsreader
 * argues, Be Vietnam Pro labels.
 *
 * No photo and no people: AGENTS.md keeps both off the site, so the card is type
 * and a rule only, in the site palette.
 *
 * Fonts are read from disk, not fetched. Building an image that requires a live
 * request to fonts.gstatic.com means a network blip becomes a failed deploy —
 * and Vietnamese diacritics are exactly what a fallback font gets wrong.
 */
const BG = '#131517'
const INK = '#f7f7f8'
const MUTED = '#b4b6b8'
const LINE = '#383e46'
const ACCENT = '#d1fe17'

async function font(file: string) {
  return readFile(join(process.cwd(), 'src/assets/fonts', file))
}

/** One card per page, each with its own headline and its own alt text (the page title). */
export async function generateImageMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const l = asLocale((await params).locale)
  return OG_PAGES.map((page) => ({
    id: page,
    size,
    contentType,
    alt: getMessages(l).metadata[page].title,
  }))
}

function asLocale(locale: string): Locale {
  return locale === 'vi' ? 'vi' : 'en'
}

/** The last two words are joined by a no-break space, so a headline never ends on a single stray word. */
function noOrphan(text: string): string {
  const i = text.lastIndexOf(' ')
  return i > 0 ? `${text.slice(0, i)}\u00a0${text.slice(i + 1)}` : text
}

/** Each card carries the page's headline and, below the rule, the page's own second line. */
function lines(l: Locale, page: OgPage): { headline: string; second: string } {
  const messages = getMessages(l)
  const { profile } = getSiteContent(l)
  if (page === 'services') return { headline: messages.services.h1, second: firstSentence(messages.services.intro) }
  if (page === 'products') return { headline: messages.apps.h1, second: firstSentence(messages.apps.intro) }
  if (page === 'contact') return { headline: messages.contact.h1, second: firstSentence(messages.contact.body) }
  return { headline: profile.hook, second: firstSentence(profile.supporting) }
}

export default async function Image({
  params,
  id,
}: {
  params: Promise<{ locale: string }>
  id: Promise<string | number>
}) {
  const l = asLocale((await params).locale)
  const page = (OG_PAGES as readonly string[]).includes(String(await id)) ? (String(await id) as OgPage) : 'home'
  const { profile } = getSiteContent(l)
  const text = lines(l, page)
  const [display, sans] = await Promise.all([
    font('BeVietnamPro-ExtraBold.ttf'),
    font('BeVietnamPro-Medium.ttf'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '64px 72px',
          fontFamily: 'sans',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: '0.02em',
            color: MUTED,
          }}
        >
          <span style={{ color: INK }}>{profile.name}</span>
          <span>canhta.com</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'display',
            fontSize: 68,
            /**
             * 1.04 clipped the below-marks. Vietnamese stacks a mark under the
             * base as well as over it — `ệ` lost its dot while `ố`, whose two
             * marks both sit above, rendered fine. A line box tuned on Latin
             * copy silently truncates a whole diacritic class.
             */
            lineHeight: 1.28,
            letterSpacing: '-0.021em',
            color: ACCENT,
            maxWidth: 980,
          }}
        >
          {noOrphan(text.headline)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, background: LINE, marginBottom: 20 }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 22,
              letterSpacing: '0.02em',
              color: MUTED,
            }}
          >
            <span style={{ color: INK }}>{text.second}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'display', data: display, style: 'normal', weight: 800 },
        { name: 'sans', data: sans, style: 'normal', weight: 500 },
      ],
    },
  )
}
