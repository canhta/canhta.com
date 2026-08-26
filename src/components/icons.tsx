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
 * Zalo — the official wordmark, not something drawn by hand.
 *
 * Two earlier attempts invented a mark: a speech bubble with "Za" in it, then a
 * bubble with a knocked-out Z. Both were wrong for the same reason — Zalo has no
 * single-glyph mark to compress. Its logo IS the wordmark, and the app icon is
 * that same wordmark on a blue square. Inventing a monogram for a brand that
 * does not have one produces a logo that is recognisably nobody's.
 *
 * Geometry is taken verbatim from zalo.me's own asset. Brand blue is #0068FF; it
 * is rendered in `currentColor` instead, because it has to sit in a row of
 * monochrome marks and because #0068FF collides with this sheet's PLAN blue.
 *
 * The trade-off is proportion: 77x28 is a wordmark, not a square, so it gets a
 * wider slot than the glyph icons rather than being squashed into theirs.
 */
export const ZaloWordmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 77 28"
    height={14}
    width={38.5}
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M22.0532 25.2978V22.8502H6.44851L20.2322 5.55324C20.4196 5.30146 20.8177 4.83888 20.9993 4.64565L21.0871 4.53439C21.7699 3.54464 22.1055 2.35654 22.0415 1.15581V0.5H0.622355V5.09066H15.4834L0.803874 23.2776C0.230916 24.0588 -0.0507921 25.0158 0.00753473 25.9828V27.1539H20.2146C20.4574 27.1532 20.6975 27.1045 20.9214 27.0107C21.1453 26.917 21.3484 26.7799 21.5192 26.6075C21.69 26.4351 21.8251 26.2306 21.9168 26.0059C22.0084 25.7811 22.0548 25.5405 22.0532 25.2978Z" />
    <path d="M49.2929 27.1364H52.3553V0.5H47.7646V25.6081C47.7646 26.0134 47.9257 26.4021 48.2123 26.6888C48.4989 26.9754 48.8876 27.1364 49.2929 27.1364Z" />
    <path d="M39.8246 8.41661C38.2641 7.27375 36.4176 6.5855 34.4898 6.42823C32.562 6.27095 30.6283 6.65079 28.9032 7.52561C27.1781 8.40043 25.7291 9.73603 24.717 11.3843C23.7048 13.0325 23.1689 14.9289 23.1689 16.8631C23.1689 18.7973 23.7048 20.6937 24.717 22.3419C25.7291 23.9901 27.1781 25.3257 28.9032 26.2005C30.6283 27.0754 32.562 27.4552 34.4898 27.2979C36.4176 27.1406 38.2641 26.4524 39.8246 25.3095C39.8277 25.7941 40.0219 26.2579 40.3651 26.6C40.7083 26.9421 41.1727 27.1349 41.6573 27.1364H44.1166V6.98203H39.8246V8.41661ZM33.6295 23.0201C32.4095 23.0212 31.2166 22.66 30.202 21.9823C29.1875 21.3046 28.3971 20.3408 27.931 19.2133C27.465 18.0858 27.3442 16.8453 27.5841 15.649C27.824 14.4528 28.4137 13.3547 29.2784 12.4941C30.1432 11.6334 31.2441 11.0489 32.4415 10.8148C33.6388 10.5806 34.8788 10.7073 36.0041 11.1787C37.1293 11.6502 38.0893 12.4452 38.7622 13.4629C39.435 14.4806 39.7905 15.6752 39.7836 16.8953C39.7743 18.5219 39.122 20.0788 37.9691 21.2262C36.8162 22.3737 35.2562 23.0185 33.6295 23.0201Z" />
    <path d="M65.9338 6.27344C63.8493 6.27344 61.8115 6.89159 60.0782 8.04971C58.345 9.20784 56.9941 10.8539 56.1963 12.7798C55.3986 14.7057 55.1899 16.8249 55.5966 18.8694C56.0032 20.9139 57.0071 22.792 58.4811 24.266C59.9551 25.74 61.8331 26.7438 63.8776 27.1505C65.9221 27.5572 68.0413 27.3484 69.9672 26.5507C71.8931 25.753 73.5392 24.4021 74.6973 22.6688C75.8555 20.9355 76.4736 18.8978 76.4736 16.8132C76.4736 14.0179 75.3632 11.3371 73.3866 9.36047C71.41 7.38388 68.7292 6.27344 65.9338 6.27344ZM65.9338 23.0083C64.7072 23.0094 63.5077 22.6467 62.4872 21.9661C61.4667 21.2854 60.671 20.3174 60.2008 19.1844C59.7305 18.0514 59.6069 16.8045 59.8455 15.6012C60.0841 14.398 60.6742 13.2925 61.5412 12.4247C62.4082 11.5569 63.5131 10.9658 64.7161 10.726C65.9191 10.4863 67.1662 10.6088 68.2996 11.0779C69.433 11.5471 70.4018 12.3419 71.0834 13.3617C71.7651 14.3816 72.1289 15.5807 72.1289 16.8074C72.1289 18.4509 71.4764 20.0273 70.3148 21.19C69.1531 22.3527 67.5774 23.0067 65.9338 23.0083Z" />
  </svg>
)

/** Apple's mark, for an App Store destination. */
export const AppleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M16.36 12.72c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.72-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.83-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.3-3.51ZM14.2 6.3c.61-.74 1.02-1.76.9-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.05 1.69-.92 2.69.98.08 1.98-.5 2.59-1.23Z" />
  </svg>
)

/** Google Play's triangle, for a Play Store destination. */
export const PlayStoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M3.6 2.3c-.24.25-.38.64-.38 1.15v17.1c0 .5.14.9.38 1.15l.06.05 9.58-9.58v-.23L3.66 2.26l-.06.04Zm12.85 6.4L13.7 5.95 4.62 1.4l11.83 7.3ZM17.9 9.6l-2.5-1.55-2.9 2.9 2.9 2.9 2.53-1.57c.75-.47.75-1.7-.03-2.18l-.01-.5ZM4.62 22.6l9.08-4.55 2.75-2.75L4.62 22.6Z" />
  </svg>
)

/** A globe, for a plain website. */
export const GlobeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </svg>
)

/** A sheet with rules on it, for documentation. */
export const DocsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <path d="M6 3h8l4 4v14H6V3Z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </svg>
)

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
