import type { ReactNode } from 'react'

/**
 * Every section opens the same way, and that is the point.
 *
 * The previous page gave six sections six near-identical heads and identical
 * padding, which is what made it read as one flat column — if everything is
 * equally important, a scanner has nothing to aim at. Here the head is uniform
 * and the RANK is what varies: `band-1` for the two sections that carry the
 * argument, `band-2` for the two that support it, `band-3` for the ones a
 * visitor reads only if they are already interested.
 *
 * The rule above the kicker is the only decoration, and it does the one job a
 * rule can do honestly: say "a new thing starts here".
 */
export function SectionHeading({
  kicker,
  title,
  sub,
  id,
}: {
  kicker: string
  title: string
  sub?: string
  id?: string
}) {
  return (
    <header className="border-t border-line pt-6">
      <p className="label">{kicker}</p>
      <h2 id={id} className="title mt-3 max-w-[22ch]">
        {title}
      </h2>
      {sub ? <p className="lead mt-4 max-w-[54ch]">{sub}</p> : null}
    </header>
  )
}

/**
 * A labelled fact. Used for the problem/built/result triplet on a product and
 * for the output/suited-to pair on an engagement — the same shape, so they read
 * as the same kind of statement rather than as two invented layouts.
 */
export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1.5">{children}</dd>
    </div>
  )
}
