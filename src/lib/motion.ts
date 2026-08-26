/**
 * The single source of motion truth. Every animated component reads from here —
 * no ad-hoc durations or easings anywhere else in the codebase.
 */

export const duration = {
  /** hover, press, focus — must feel instant */
  feedback: 0.15,
  /** a component changing state */
  state: 0.28,
  /** a section arriving */
  reveal: 0.55,
  /** the signature sequence, end to end */
  signature: 9,
} as const

export const ease = {
  /** default: decisive start, soft landing */
  out: [0.22, 1, 0.36, 1],
  /** for elements that should feel physical */
  spring: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 },
} as const

export const viewport = { once: true, amount: 0.35 } as const

/** Standard section entrance. Transform + opacity only. */
export const reveal = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
} as const

export const revealTransition = {
  duration: duration.reveal,
  ease: ease.out,
} as const

/** Stagger only where it encodes reading order. */
export const staggerChildren = (stagger = 0.07) => ({
  shown: { transition: { staggerChildren: stagger } },
})
