import type { MetadataRoute } from 'next'
import { getSiteContent } from '@/content'

/**
 * There is exactly one manifest for both locales — the spec has no mechanism for
 * serving a different one per language, and `start_url` can only be one URL. So
 * this is the English sheet: `/` is the default locale under `localePrefix:
 * 'as-needed'`, and a Vietnamese visitor who installs from `/vi` still lands on
 * a page that offers the VI switch in its first row.
 *
 * Every string is read from `src/content` for the same reason the rest of the
 * site is: a name or a claim that exists in two places drifts, and the copy
 * here is the one a person sees on their home screen long after the page.
 */
export default function manifest(): MetadataRoute.Manifest {
  const { profile } = getSiteContent('en')

  return {
    name: profile.name,
    short_name: profile.name,
    description: profile.supporting,
    start_url: '/',

    /**
     * `browser`, not `standalone`.
     *
     * Every affordance on this site leaves it: the CTA is a `mailto:`, and every
     * project links out to app stores, docs and GitHub. `standalone` strips the URL
     * bar and the back button, so each of those either dead-ends the window or
     * hands off to a second browser with no way back. There is also nothing to
     * return *to* — one page, no state — which is the thing an app shell exists
     * to preserve.
     */
    display: 'browser',

    /**
     * Both are the page ground. `theme_color` must stay equal to the `themeColor`
     * in `src/app/[locale]/layout.tsx`, which is in turn `--color-bg` in
     * `globals.css`: a mismatch is not a config detail, it is a visible seam
     * between the address bar and the page on Android.
     */
    background_color: '#fbf9f5',
    theme_color: '#fbf9f5',

    lang: 'en',
    dir: 'ltr',

    // `src/app/icon.svg`, served by Next's icon file convention. One vector at
    // `sizes: 'any'` is the whole set — there is no raster fallback to keep in
    // sync, and no invented file that would 404 on install.
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
