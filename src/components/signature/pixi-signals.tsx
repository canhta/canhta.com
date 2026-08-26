'use client'

import { useEffect, useRef } from 'react'
import { LINKS, VIEW, samplePath, type Link } from './nodes'

/**
 * The WebGL half of the signature panel: glowing signals travelling the connectors.
 *
 * Purely decorative and entirely optional. It is aria-hidden, dynamically imported,
 * and only ever armed once the panel is on screen. If Pixi fails to init, WebGL is
 * unavailable, or the visitor prefers reduced motion, the SVG layer above stands on
 * its own and nothing is lost but the glow.
 */

interface Particle {
  link: number
  t: number
  speed: number
  size: number
}

export default function PixiSignals({ activePhase }: { activePhase: number }) {
  const hostRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef(activePhase)
  phaseRef.current = activePhase

  useEffect(() => {
    const canvas = hostRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void (async () => {
      let pixi: typeof import('pixi.js')
      try {
        pixi = await import('pixi.js')
      } catch {
        return
      }
      if (disposed) return

      const app = new pixi.Application()
      try {
        await app.init({
          canvas,
          width: VIEW.w,
          height: VIEW.h,
          backgroundAlpha: 0,
          antialias: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: false,
          preference: 'webgl',
        })
      } catch {
        return
      }
      if (disposed) {
        app.destroy(true)
        return
      }

      const paths = LINKS.map((l: Link) => samplePath(l.curve))
      const layer = new pixi.Container()
      layer.blendMode = 'add'
      app.stage.addChild(layer)

      // One reusable sprite texture beats a Graphics object per particle.
      const dot = new pixi.Graphics().circle(0, 0, 16).fill({ color: 0xe2412a })
      const texture = app.renderer.generateTexture(dot)
      dot.destroy()

      const particles: Particle[] = []
      const sprites: import('pixi.js').Sprite[] = []

      const spawn = (linkIndex: number) => {
        const sprite = new pixi.Sprite(texture)
        sprite.anchor.set(0.5)
        sprite.alpha = 0
        layer.addChild(sprite)
        sprites.push(sprite)
        particles.push({
          link: linkIndex,
          t: 0,
          speed: 0.004 + Math.random() * 0.005,
          size: 0.085 + Math.random() * 0.115,
        })
      }

      let sinceSpawn = 0

      const tick = () => {
        const phase = phaseRef.current
        sinceSpawn += 1

        // Only links whose phase has been reached carry signal.
        const live = LINKS.map((l, i) => (l.phase <= phase ? i : -1)).filter((i) => i >= 0)

        if (live.length > 0 && sinceSpawn > 5 && particles.length < 120) {
          const pick = live[Math.floor(Math.random() * live.length)]
          if (pick !== undefined) spawn(pick)
          sinceSpawn = 0
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          const sprite = sprites[i]
          if (!p || !sprite) continue
          p.t += p.speed
          if (p.t >= 1) {
            sprite.destroy()
            particles.splice(i, 1)
            sprites.splice(i, 1)
            continue
          }
          const pts = paths[p.link]
          if (!pts) continue
          const idx = Math.min(pts.length - 1, Math.floor(p.t * (pts.length - 1)))
          const pt = pts[idx]
          if (!pt) continue
          sprite.x = pt.x
          sprite.y = pt.y
          sprite.scale.set(p.size)
          // Fade in and out so signals never pop at the node edges.
          sprite.alpha = Math.sin(p.t * Math.PI) * 0.85
        }
      }

      app.ticker.add(tick)

      cleanup = () => {
        app.ticker.remove(tick)
        texture.destroy(true)
        app.destroy(true, { children: true })
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <canvas
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
