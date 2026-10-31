import { Link } from '@/i18n/navigation'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { SectionHeading } from './section'

/**
 * Four steps, in order, so the numerals are real: this is the one list on the
 * site that is a sequence. Below it, the rule that makes the promise checkable.
 */
export function Process({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).process
  const heading = getMessages(locale).services.processHeading

  return (
    <section aria-labelledby="process-title" className="shell band-1 reveal">
      <SectionHeading id="process-title" title={heading} />
      <ol className="rail mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, i) => (
          <li key={step.id} className="border-t-2 border-ink pt-4">
            <p aria-hidden="true" className="text-[2.5rem] leading-none font-extrabold text-brand">
              {i + 1}
            </p>
            <h3 className="subtitle mt-3">{step.label}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-[48ch] text-[20px] leading-snug font-bold">
        {copy.rule}
      </p>
      <p className="mt-6">
        <Link href="/products" className="link font-semibold">
          {getMessages(locale).home.appsAll}
        </Link>
      </p>
    </section>
  )
}
