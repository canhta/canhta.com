import { CONTENT_IS_FIXTURE } from '@/content'

/**
 * Development-only reminder. The build guard in src/content/index.ts is the real
 * defence; this exists so nobody screenshots fixture copy and mistakes it for real.
 */
export function FixtureBanner() {
  if (!CONTENT_IS_FIXTURE || process.env.NODE_ENV === 'production') return null
  return (
    <div className="bg-ink px-4 py-1.5 text-center font-mono text-[11px] tracking-wide text-paper">
      FIXTURE CONTENT — every name, claim and number below is placeholder
    </div>
  )
}
