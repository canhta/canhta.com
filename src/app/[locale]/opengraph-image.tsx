import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Canh Ta'

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

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l: Locale = locale === 'vi' ? 'vi' : 'en'
  const { profile } = getSiteContent(l)
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
          {profile.hook}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, background: LINE, marginBottom: 20 }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 22,
              letterSpacing: '0.02em',
              color: MUTED,
            }}
          >
            <span style={{ color: INK }}>{profile.availabilityLabel}</span>
            <span style={{ marginLeft: 'auto' }}>canhta.com</span>
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
