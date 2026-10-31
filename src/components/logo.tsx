import type { SVGProps } from 'react'

/**
 * The site's mark: a lime C on near-black with one white dot in its opening.
 * Same drawing as `src/app/icon.svg`, so the tab icon and the page agree.
 * Decorative: the name next to it is the accessible label.
 */
export function Logo({ size = 32, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <rect width="32" height="32" rx="8" fill="#131517" />
      <path d="M21.6 10.4A8.4 8.4 0 1 0 21.6 21.6" fill="none" stroke="#d1fe17" strokeWidth="5.4" />
      <circle cx="24.2" cy="16" r="2.7" fill="#f7f7f8" />
    </svg>
  )
}
