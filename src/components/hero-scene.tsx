'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Wraps the static hero drawing and, when the browser can and should, replaces
 * it with the 3D scene. The drawing is rendered on the server and stays in the
 * layout, so nothing moves when the scene arrives, and it is all a visitor sees
 * if scripts are slow, WebGL is missing, the connection is set to save data, or
 * they have asked for reduced motion.
 */
export function HeroScene({
  children,
  label,
  className,
}: {
  children: ReactNode
  label: string
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) return

    let cancelled = false
    let dispose: (() => void) | null = null
    import('./hero-scene-three').then(({ mountScene }) => {
      if (cancelled) return
      dispose = mountScene(el)
      if (dispose) setLive(true)
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return (
    <div ref={host} className={`hero-scene ${className ?? ''}`} data-live={live} role="img" aria-label={label}>
      {children}
    </div>
  )
}
