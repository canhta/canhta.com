import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * The one idea on the home page, drawn: scattered sources (chat, a spreadsheet,
 * paper) flow into a single screen where a person approves what AI drafted. It
 * says what we do without a stock photo or a screenshot of someone else's data.
 * This is the static version. Reduced motion, no WebGL and save-data visitors
 * see only this, and it stands in until the 3D scene loads, so it is a finished
 * picture and not a placeholder.
 */
export function HeroVisual({ locale }: { locale: Locale }) {
  const v = getMessages(locale).hero.visual

  return (
    <div className="hv">
      {v.sources.map((source, i) => (
        <span key={source} className="contents" aria-hidden="true">
          <span className="hv-chip" style={{ gridRow: i + 1 }}>
            {source}
          </span>
          <span className="hv-flow" style={{ gridRow: i + 1 }} />
        </span>
      ))}
      <div className="hv-card" aria-hidden="true">
        <p className="mb-1 text-[14px] font-extrabold">{v.title}</p>
        {v.rows.map((row) => (
          <p key={row} className="hv-row">
            <span className="hv-tick" />
            {row}
            <span className="hv-bar" />
          </p>
        ))}
        <p className="hv-tag">{v.tag}</p>
      </div>
    </div>
  )
}
