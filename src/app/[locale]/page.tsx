import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { FixtureBanner } from '@/components/fixture-banner'
import { UtilityRow } from '@/components/utility-row'
import { ProfileHero } from '@/components/profile-hero'
import { SignatureSystem } from '@/components/signature/signature-system'
import { SelectedWork } from '@/components/selected-work'
import { CapabilityMatrix } from '@/components/capability-matrix'
import { WorkTogether } from '@/components/work-together'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'
import { SheetBreak } from '@/components/motion/sheet-break'
import { buildGraph } from '@/lib/structured-data'
import { capabilities } from '@/content'

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
      <FixtureBanner />
      <UtilityRow locale={locale} />
      {/* `tabIndex={-1}` is what makes the skip link work. Without it the
          target is not focusable, `document.activeElement` stays on `body`, and
          only Chromium's sequential-focus fallback carries the next Tab into
          `main` — Safari has not implemented that, so there the link silently
          returns the user to the utility row. */}
      <main id="sheet" tabIndex={-1}>
        <ProfileHero locale={locale} />
        <SheetBreak zone="A" />
        <SignatureSystem locale={locale} />
        <SheetBreak zone="B" />
        <SelectedWork locale={locale} />
        <SheetBreak zone="C" />
        <CapabilityMatrix locale={locale} capabilities={capabilities} />
        <WorkTogether locale={locale} />
        <Faq locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
