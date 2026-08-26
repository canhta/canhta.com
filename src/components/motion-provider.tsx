'use client'

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * One motion boundary for the whole app.
 * - LazyMotion + domAnimation keeps the feature bundle small (m components only).
 * - reducedMotion="user" makes every animation respect the OS setting by default,
 *   so components opt *in* to motion rather than opting out of it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
