import { profile } from '@/content'

/**
 * A full-bleed rule between figures.
 *
 * Six sections separated by nothing but air is what made the page read as one
 * undifferentiated column, and air is expensive: the inter-section gutters alone
 * were over a screen of nothing. A drawing sheet separates one view from the
 * next with a line, not with emptiness — so the line does the separating and the
 * approach space above each figure comes down to match.
 *
 * It breaks the 1160px measure on purpose. Nothing else on the sheet does except
 * this and the figure it introduces.
 */
export function SheetBreak({ zone }: { zone: string }) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="h-px w-full bg-rule-strong" />
      <div className="container-sheet">
        <div className="flex items-center justify-between pt-2">
          <span className="fig-label">{zone}</span>
          <span className="fig-label">{profile.name}</span>
        </div>
      </div>
    </div>
  )
}
