import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { SiteHeader } from '@/components/site-header'
import { Statement } from '@/components/statement'
import { Work } from '@/components/work'
import { Capabilities } from '@/components/capabilities'
import { Approach } from '@/components/approach'
import { Engagements } from '@/components/engagements'
import { Answers } from '@/components/answers'
import { Closing } from '@/components/closing'
import { SiteFooter } from '@/components/site-footer'
import { buildGraph } from '@/lib/structured-data'
import { capabilities } from '@/content'

/**
 * Reading order, and the rank each block holds.
 *
 *   Statement    who this is, what they do, how to reach them      rank 1
 *   Work         the proof, three projects, every claim linked     rank 1
 *   Capabilities the four things he builds                         rank 3
 *   Approach     how an engagement actually goes                   rank 2
 *   Engagements  the three commercial shapes                       rank 2
 *   Answers      the objections, answered                          rank 3
 *   Closing      the decision                                      rank 1
 *
 * The ranks are the point. The previous page gave seven sections identical
 * padding and near-identical heads, which is why it read as one long
 * undifferentiated column — a scanner had nothing to aim at, because nothing
 * claimed to matter more than anything else.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* The machine-readable half of the page. Everything in it derives from
          `src/content`, so it can never drift from what a human reads. */}
      <script
        type="application/ld+json"
        // The payload is built from our own typed content, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph(locale)) }}
      />
      <SiteHeader locale={locale} />
      {/* `tabIndex={-1}` is what makes the skip link work. Without it the target
          is not focusable, `document.activeElement` stays on `body`, and only
          Chromium's sequential-focus fallback carries the next Tab into `main` —
          Safari has not implemented that, so there the link silently returns the
          user to the header. */}
      <main id="main" tabIndex={-1}>
        <Statement locale={locale} />
        <Work locale={locale} />
        <Capabilities locale={locale} capabilities={capabilities} />
        <Approach locale={locale} />
        <Engagements locale={locale} />
        <Answers locale={locale} />
        <Closing locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
