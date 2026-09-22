import type { Capability, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { SectionHeading, Fact } from './section'

/**
 * Four areas against two questions is eight facts, and all eight fit on screen
 * at once — so none of them is hidden behind an interaction.
 *
 * The previous version was a client component with hover-to-select state and an
 * animated rule marking the "active" column. It bought nothing: every column was
 * fully readable at rest, so selecting one only changed which column had a line
 * beside it. Interaction that reveals nothing is decoration with a state
 * machine attached, and it shipped a JavaScript bundle to do it. This renders on
 * the server and does the same job.
 *
 * `capabilities` arrives as a prop rather than being imported, and that stays
 * true even now the component is server-only: it keeps the content module out of
 * any bundle this component is ever pulled into, which is the mistake that once
 * dragged the fixture guard into the browser and took the site down.
 */
export function Capabilities({
  locale,
  capabilities,
}: {
  locale: Locale
  capabilities: Capability[]
}) {
  if (capabilities.length === 0) return null
  const copy = getMessages(locale).capabilities

  return (
    <section className="shell band-3">
      <SectionHeading kicker={copy.kicker} title={copy.heading} />

      <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap) => (
          <li key={cap.id} className="border-t border-line pt-5">
            <h3 className="subtitle">{cap.name}</h3>
            <dl className="mt-4 grid gap-4 text-[15px] leading-snug">
              <Fact label={copy.bestFor}>{cap.bestFor}</Fact>
              <Fact label={copy.deliverable}>{cap.canDeliver}</Fact>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
