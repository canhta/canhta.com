import { profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'

/**
 * The title block, borrowed straight from engineering drawings: the dense corner
 * table that says who drew this, when, at what scale. Here it answers the practical
 * questions a client asks before they write to you.
 */
export function TitleBlock({ locale }: { locale: Locale }) {
  return (
    <dl className="grid grid-cols-2 border-t border-l border-rule md:grid-cols-3 lg:grid-cols-6">
      {profile.spec.map((row) => (
        <div key={row.label.en} className="border-r border-b border-rule px-4 py-3">
          <dt className="annot">{t(row.label, locale).toUpperCase()}</dt>
          <dd className="mt-1.5 text-[15px] leading-snug font-medium tracking-tight">
            {t(row.value, locale)}
          </dd>
        </div>
      ))}
    </dl>
  )
}
