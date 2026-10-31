import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** The same lime C and white dot as icon.svg, drawn full-bleed (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#131517' }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M21.6 10.4A8.4 8.4 0 1 0 21.6 21.6" fill="none" stroke="#d1fe17" strokeWidth="5.4" />
          <circle cx="24.2" cy="16" r="2.7" fill="#f7f7f8" />
        </svg>
      </div>
    ),
    size,
  )
}
