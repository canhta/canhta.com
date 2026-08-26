import type { SVGProps } from 'react'

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const

export const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.570 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
)

export const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M17.53 3h3.05l-6.67 7.62L21.75 21h-6.13l-4.8-6.28L5.32 21H2.27l7.13-8.15L2.25 3h6.28l4.34 5.74L17.53 3Zm-1.07 16.2h1.69L7.62 4.71H5.8l10.66 14.49Z" />
  </svg>
)

export const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.25 8.98h3.5V21h-3.5V8.98Zm5.72 0h3.35v1.64h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.24 4.18 5.15V21h-3.5v-5.32c0-1.27-.03-2.9-1.8-2.9-1.8 0-2.08 1.38-2.08 2.81V21h-3.5V8.98Z" />
  </svg>
)

/**
 * Zalo. The wordmark is a registered logo, so this is the generic speech-bubble
 * form with the letter rather than a trace of the brand mark — the icon has to
 * sit in a row of monochrome `currentColor` glyphs, and a colour logo would not.
 */
export const ZaloIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M12 3C6.9 3 2.75 6.4 2.75 10.6c0 2.35 1.3 4.45 3.35 5.85-.1.85-.5 2.2-1.35 3.35-.15.2 0 .5.25.45 2.05-.4 3.5-1.35 4.2-1.9.85.2 1.8.3 2.8.3 5.1 0 9.25-3.4 9.25-7.6S17.1 3 12 3Z" />
    <path
      d="M8.15 8.35h3.4v.95L9.2 12.6h2.4v1H7.9v-.95l2.35-3.3H8.15v-1Zm5.1 0h1.05v5.25h-1.05V8.35Zm2.35 1.4c.95 0 1.6.6 1.6 1.55v2.3h-.95v-.45c-.25.35-.65.55-1.15.55-.8 0-1.35-.5-1.35-1.2 0-.75.6-1.2 1.55-1.2h.9v-.1c0-.4-.25-.65-.7-.65-.35 0-.65.15-.85.4l-.6-.6c.35-.4.9-.6 1.55-.6Z"
      fill="var(--color-surface)"
    />
  </svg>
)

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
