import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Canh Ta'

/**
 * The shared-link card, set in the same two voices as the page: Newsreader
 * argues, Be Vietnam Pro labels.
 *
 * The portrait is deliberately not in it. It is an illustration rather than a
 * photograph, and at 1200x630 the lettering on the shirt is legible — a card is
 * the one place an asset gets blown up in front of strangers, so this uses type
 * and a rule instead.
 *
 * Fonts are read from disk, not fetched. Building an image that requires a live
 * request to fonts.gstatic.com means a network blip becomes a failed deploy —
 * and Vietnamese diacritics are exactly what a fallback font gets wrong.
 */
const BG = '#fbf9f5'
const INK = '#17140f'
const MUTED = '#6e655a'
const LINE = '#cfc4b2'
const ACCENT = '#b4401e'

async function font(file: string) {
  return readFile(join(process.cwd(), 'src/assets/fonts', file))
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l: Locale = locale === 'vi' ? 'vi' : 'en'
  const { profile } = getSiteContent(l)
  const messages = getMessages(l)
  const [display, sans] = await Promise.all([
    font('Newsreader-SemiBold.ttf'),
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
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          <span style={{ color: INK }}>{profile.name}</span>
          <span>{messages.header.role}</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'display',
            fontSize: 72,
            /**
             * 1.04 clipped the below-marks. Vietnamese stacks a mark under the
             * base as well as over it — `ệ` lost its dot while `ố`, whose two
             * marks both sit above, rendered fine. A line box tuned on Latin
             * copy silently truncates a whole diacritic class.
             */
            lineHeight: 1.28,
            letterSpacing: '-0.021em',
            color: INK,
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
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: MUTED,
            }}
          >
            <div
              style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: ACCENT }}
            />
            <span style={{ color: ACCENT }}>{profile.availabilityLabel}</span>
            <span style={{ marginLeft: 'auto' }}>canhta.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'display', data: display, style: 'normal', weight: 600 },
        { name: 'sans', data: sans, style: 'normal', weight: 500 },
      ],
    },
  )
}
