import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

/**
 * jsdom ships neither observer. Motion's `useInView` and the plotter rules'
 * width measurement both reach for them at mount, so without these any render
 * of a section that contains a `SectionHead` throws before an assertion runs.
 *
 * These are inert on purpose: nothing here ever fires a callback, so components
 * stay in the resting state they were server-rendered in. That is the state the
 * tests are about — every animated element on this site is required to be
 * legible without its animation.
 */
class InertObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): [] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', InertObserver)
vi.stubGlobal('ResizeObserver', InertObserver)

// `useReducedMotion` reads this at mount and jsdom does not implement it.
vi.stubGlobal(
  'matchMedia',
  (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList,
)

afterEach(() => {
  cleanup()
})
