'use client'

import { useRef, type ReactNode } from 'react'

/**
 * A phone screen that leans toward the pointer, so it reads as an object with
 * depth. Mouse and pen only: on touch it stays flat and still. Pure transform,
 * so layout never moves and nothing is hidden.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <div ref={ref} className={`tilt ${className ?? ''}`} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  )
}
