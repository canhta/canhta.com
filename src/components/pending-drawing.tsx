import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

/**
 * What sits where a product screenshot would, when there is no real one.
 *
 * The alternative was to keep reusing generic wireframe SVGs, which is a fake
 * product shot wearing a placeholder's clothes — a visitor reads it as the
 * interface. A drawing sheet has an honest form for this: a hatched panel marked
 * as not yet drawn. It says the true thing and it belongs to the direction.
 */
const COPY = {
  label: { en: 'Drawing to follow', vi: 'Bản vẽ sẽ bổ sung' },
} as const

export function PendingDrawing({ locale, ratio = '1200 / 750' }: { locale: Locale; ratio?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden border border-rule-strong bg-surface"
      style={ratio === 'auto' ? { height: '100%' } : { aspectRatio: ratio }}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="var(--color-rule)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" opacity="0.55" />
      </svg>
      <span className="fig-label absolute bottom-3 left-3 bg-surface px-2 py-1">
        {t(COPY.label, locale)}
      </span>
    </div>
  )
}
