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
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (saveData) return

    // `run` is the generation of the latest start; an import that resolves after
    // a stop (or a newer start) sees a different number and does nothing.
    let run = 0
    let dispose: (() => void) | null = null
    const stop = () => {
      run++
      dispose?.()
      dispose = null
    }
    const start = () => {
      const mine = ++run
      import('./hero-scene-three').then(({ mountScene }) => {
        if (mine !== run) return
        // The scene tells us when the GPU takes its context away, so the drawing
        // comes back while the canvas cannot paint.
        dispose = mountScene(el, (lost) => setLive(!lost))
        if (dispose) setLive(true)
      })
    }
    // Asking for reduced motion while the page is open stops the scene and
    // brings the drawing back; turning it off again starts the scene.
    const sync = () => {
      if (motion.matches) {
        stop()
        setLive(false)
      } else if (!dispose) start()
    }
    sync()
    motion.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      stop()
    }
  }, [])

  return (
    <div ref={host} className={`hero-scene ${className ?? ''}`} data-live={live} role="img" aria-label={label}>
      {children}
    </div>
  )
}
