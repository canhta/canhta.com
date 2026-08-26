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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <FixtureBanner />
      <UtilityRow locale={locale} />
      <main>
        <ProfileHero locale={locale} />
        <SignatureSystem locale={locale} />
        <SelectedWork locale={locale} />
        <CapabilityMatrix locale={locale} />
        <WorkTogether locale={locale} />
        <Faq locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
