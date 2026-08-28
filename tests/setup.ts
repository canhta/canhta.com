import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

/**
 * This file used to stub IntersectionObserver, ResizeObserver and matchMedia,
 * because every section head measured its own width and waited on a scroll
 * observer before it would draw. None of that exists any more — the page has no
 * reveal-on-scroll anywhere and no motion library — so the stubs went with it.
 *
 * What is left is the one global that would otherwise make the suite depend on
 * the network.
 */

/**
 * `fetchStars` calls the GitHub API at build time and fails soft to an empty
 * map. Left unstubbed, every render of `Work` in this suite made a real request
 * to api.github.com: slow, rate-limited, and a test that passes or fails
 * depending on whether GitHub is reachable.
 *
 * Rejecting is the honest stub. It exercises the fail-soft path, which is the
 * path a rate-limited production build takes, and it means no star count is
 * asserted against a number that could change tomorrow.
 */
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network disabled in tests')))
})

afterEach(() => {
  vi.unstubAllGlobals()
  cleanup()
})
