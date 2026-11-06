'use client'

import { useEffect, useRef, useState } from 'react'
import { afterLoadAndIdle } from '@/lib/idle'
import type { DeskLabels } from './desk-scene-three'

/**
 * Holds the hero's desk scene. The three.js chunk is fetched only after the page
 * has loaded and the main thread is idle, and never with save-data. With
 * reduced motion the desk is drawn once, finished, and nothing moves. There is
 * one picture only: the stage stays empty until the scene arrives, then the
 * objects settle in, so nothing swaps from one picture to another.
 */
export function HeroDesk({ label, labels }: { label: string; labels: DeskLabels }) {
  const host = useRef<HTMLDivElement>(null)
  const words = useRef(labels)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (saveData) return
    let dispose: (() => void) | null = null
    let cancelled = false
    const cancel = afterLoadAndIdle(() =>
      import('./desk-scene-three').then(({ mountDesk }) => {
        if (cancelled) return
        dispose = mountDesk(el, words.current, still)
        if (dispose) setLive(true)
      }),
    )
    return () => {
      cancelled = true
      cancel()
      dispose?.()
    }
  }, [])

  return (
    <div ref={host} className="desk" data-live={live} role="img" aria-label={label}>
    </div>
  )
}
