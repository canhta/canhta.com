import type { Build } from '@/content/types'

/**
 * Star counts, fetched once at build time.
 *
 * A number on this page has to be checkable, and a star count is the one metric
 * here that anybody can verify in a click. It is read from the GitHub API rather
 * than typed into content, because a hardcoded count is wrong the day after it
 * is written.
 *
 * FAIL-SOFT ON PURPOSE. Any failure — rate limit, network, a renamed repo —
 * returns null and the star simply does not render. A build must not break
 * because GitHub was slow, and a stale or guessed number must never appear.
 */
const REPO = /^https:\/\/github\.com\/([^/]+)\/([^/?#]+)/

export type Stars = Record<string, number>

export async function fetchStars(builds: Build[]): Promise<Stars> {
  const repos = builds
    .flatMap((b) => b.links)
    .filter((l) => l.kind === 'github')
    .map((l) => l.url.match(REPO))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => `${m[1]}/${m[2]}`.replace(/\.git$/, ''))

  const unique = [...new Set(repos)]
  const out: Stars = {}

  await Promise.all(
    unique.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { accept: 'application/vnd.github+json' },
          // Revalidate daily: stars move slowly and the build should not depend
          // on GitHub being reachable at deploy time.
          next: { revalidate: 86_400 },
        })
        if (!res.ok) return
        const json: unknown = await res.json()
        const count = (json as { stargazers_count?: unknown }).stargazers_count
        if (typeof count === 'number' && count > 0) out[repo] = count
      } catch {
        // Deliberately silent: no count is correct, a wrong count is not.
      }
    }),
  )

  return out
}

export function repoKey(url: string): string | null {
  const m = url.match(REPO)
  return m ? `${m[1]}/${m[2]}`.replace(/\.git$/, '') : null
}
