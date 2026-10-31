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

/** No test may depend on the network, so a stray fetch rejects. */
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network disabled in tests')))
})

afterEach(() => {
  vi.unstubAllGlobals()
  cleanup()
})
