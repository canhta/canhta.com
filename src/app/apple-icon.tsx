import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** The same bold C as icon.svg, drawn full-bleed (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#131517' }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M22.4 9.6A9 9 0 1 0 22.4 22.4" fill="none" stroke="#d1fe17" strokeWidth="6.2" />
        </svg>
      </div>
    ),
    size,
  )
}
