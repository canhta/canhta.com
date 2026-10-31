import { Link } from '@/i18n/navigation'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { Words } from './words'

/**
 * Four steps, in order, so the numerals are real: this is the one list on the
 * site that is a sequence. On a desktop the heading and a progress bar stay
 * put while the steps scroll past; the bar fills as you read down. Where
 * scroll-driven animation is missing, or motion is reduced, everything is
 * simply shown: bar full, steps in place.
 */
export function Process({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).process
  const heading = getMessages(locale).services.processHeading

  return (
    <section aria-labelledby="process-title" className="process band sheet ground-night on-night">
      <div className="shell process-grid">
        <div className="process-side">
          <div className="sticky-box">
            <h2 id="process-title" className="title-band section-title max-w-[12ch]">
              <Words text={heading} />
            </h2>
            <div className="track mt-8 max-w-sm" aria-hidden="true" />
            <p className="mt-6 max-w-[30ch] text-[clamp(1rem,0.95rem+0.3vw,1.1875rem)] leading-snug font-bold">{copy.rule}</p>
            <p className="mt-6">
              <Link href="/products" className="link inline-flex min-h-11 items-center font-bold">
                {getMessages(locale).home.appsAll}
              </Link>
            </p>
          </div>
        </div>
        <ol className="process-steps mt-10 lg:mt-0">
          {copy.steps.map((step, i) => (
            <li key={step.id} className="step">
              <p aria-hidden="true" className="step-num">
                {i + 1}
              </p>
              <div className="min-w-0">
                <h3 className="title max-w-[18ch]">{step.label}</h3>
                <p className="lead mt-3 max-w-[34ch]">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
