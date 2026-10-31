import Image from 'next/image'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * One app screenshot in a frame. Screens are shown whole and upright; the frame
 * (border, radius, shadow) comes from CSS variables, so each product panel
 * decides how its own screens are dressed and this component never knows which
 * product it is in.
 *
 * Both products' screenshots are 640x1391 (Remoti was re-encoded down from
 * 1320x2868): 2.7x the widest slot, so they stay sharp on a 3x phone. The
 * 660x1434 attributes below only set the aspect ratio (no layout shift); the
 * optimizer serves whichever width `sizes` asks for.
 */
export function PhoneShot({
  slug,
  shot,
  locale,
  className = '',
  priority = false,
  sizes,
}: {
  slug: string
  shot: string
  locale: Locale
  className?: string
  priority?: boolean
  sizes: string
}) {
  const alts = getMessages(locale).products.alts as Record<string, string>
  return (
    <div className={`phone ${className}`}>
      <Image
        src={`/products/${slug}/${locale}/${shot}.webp`}
        alt={alts[shot] ?? ''}
        width={660}
        height={1434}
        sizes={sizes}
        quality={82}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  )
}
