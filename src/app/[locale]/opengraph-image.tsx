import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Canh Ta'

/**
 * The shared-link card, drawn in the same vernacular as the sheet.
 *
 * The portrait is deliberately not in it. It is an illustration rather than a
 * photograph, and at 1200x630 the lettering on the shirt is legible — a card is
 * the one place an asset gets blown up in front of strangers, so this uses type
 * and rules instead.
 *
 * Fonts are read from disk, not fetched. Building an image that requires a live
 * request to fonts.gstatic.com means a network blip becomes a failed deploy —
 * and Vietnamese diacritics are exactly what a fallback font gets wrong.
 */
const COPY = {
  role: { en: 'Agentic product builder', vi: 'Người xây sản phẩm agentic' },
  key: { en: 'Running · On paper', vi: 'Đang chạy · Còn trên giấy' },
} as const

const PAPER = '#e8eae7'
const INK = '#16202a'
const GRAPHITE = '#5a6672'
const RULE = '#a8b0aa'
const LIVE = '#e2412a'
const PLAN = '#1b4fd8'

async function font(file: string) {
  return readFile(join(process.cwd(), 'src/assets/fonts', file))
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l: Locale = locale === 'vi' ? 'vi' : 'en'
  const [display, mono] = await Promise.all([
    font('BeVietnamPro-ExtraBold.ttf'),
    font('IBMPlexMono-Regular.ttf'),
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
          background: PAPER,
          padding: '64px 72px',
          fontFamily: 'display',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'mono',
              fontSize: 22,
              letterSpacing: '0.2em',
              color: INK,
              paddingBottom: 18,
            }}
          >
            <span>{profile.name.toUpperCase()}</span>
            <span style={{ color: GRAPHITE }}>{t(COPY.role, l).toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', height: 2, background: INK }} />
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 74,
            /**
             * 1.04 clipped the below-marks. Vietnamese stacks a mark under the
             * base as well as over it — `ệ` lost its dot while `ố`, whose two
             * marks both sit above, rendered fine. A line box tuned on Latin
             * copy silently truncates a whole diacritic class.
             */
            lineHeight: 1.3,
            letterSpacing: '-0.035em',
            color: INK,
            maxWidth: 1000,
          }}
        >
          {t(profile.hook, l)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, background: RULE, marginBottom: 18 }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontFamily: 'mono',
              fontSize: 22,
              letterSpacing: '0.14em',
              color: GRAPHITE,
            }}
          >
            <div style={{ display: 'flex', width: 16, height: 16, background: LIVE }} />
            <div style={{ display: 'flex', width: 16, height: 16, background: PLAN }} />
            <span>{t(COPY.key, l).toUpperCase()}</span>
            <span style={{ marginLeft: 'auto' }}>CANHTA.COM</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'display', data: display, style: 'normal', weight: 800 },
        { name: 'mono', data: mono, style: 'normal', weight: 400 },
      ],
    },
  )
}
