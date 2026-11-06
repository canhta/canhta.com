import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * The home hero as a large 3D scene on the night band: scattered sources
 * (a chat, a spreadsheet, a paper) across the top, a stream of points flowing
 * along curves down into one dashboard, and three AI agents orbiting it. It
 * exists to show the page's idea, so everything in it means something: the flow
 * is the work moving into one system, the orbit is the agents, the one lime
 * node is the approval step. The stage is taller than wide on every layout, so
 * the composition is vertical. White cards and light dots read against the
 * near-black ground; lime is used for the approval node and every fourth flow point.
 *
 * Loaded lazily and only in the browser. Returns `null` when WebGL is not
 * available (the static drawing underneath stays), otherwise a disposer.
 * It renders only while visible and while the tab is open, and not while the GPU
 * has taken its context away (`onContext` reports that, so the caller can show
 * the static drawing again until the context returns).
 *
 * Pressing or tapping a source card sends one lime point along that card's own
 * curve into the hub, and the approval node pulses when it arrives: the idea of
 * the picture, played on request. A pointer over a card shows the pointer hand.
 * Three reusable points, no allocation per click, drawn only inside the same
 * frame loop (so nothing runs while the scene is off screen).
 */

const LIME = 0xd1fe17
const PAPER = 0xffffff
const DOT = 0xf7f7f8
const RING = 0x898a8b
const LINE = '#c9cdd3'
const SOFT = '#e6e8eb'
const NIGHT = '#131517'
const LIME_CSS = '#d1fe17'

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void

function texture(w: number, h: number, draw: Draw): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  draw(ctx, w, h)
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, h / 2)
  ctx.fill()
}

const chatFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  bar(ctx, 40, 50, w * 0.55, 34, SOFT)
  bar(ctx, 40, 100, w * 0.4, 34, SOFT)
  bar(ctx, w * 0.35, 170, w * 0.58, 34, NIGHT)
  bar(ctx, w * 0.5, 220, w * 0.43, 34, NIGHT)
  bar(ctx, 40, 290, w * 0.5, 34, SOFT)
}

const sheetFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = SOFT
  ctx.fillRect(0, 0, w, 56)
  ctx.strokeStyle = LINE
  ctx.lineWidth = 3
  for (let c = 1; c < 4; c++) {
    ctx.beginPath()
    ctx.moveTo((w / 4) * c, 0)
    ctx.lineTo((w / 4) * c, h)
    ctx.stroke()
  }
  for (let r = 1; r < 6; r++) {
    ctx.beginPath()
    ctx.moveTo(0, 56 + ((h - 56) / 5) * r)
    ctx.lineTo(w, 56 + ((h - 56) / 5) * r)
    ctx.stroke()
  }
  ctx.fillStyle = LIME_CSS
  ctx.fillRect(w / 4 + 6, 120, w / 4 - 12, 44)
}

const paperFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < 8; i++) bar(ctx, 44, 52 + i * 44, i % 3 === 2 ? w * 0.5 : w * 0.78, 16, LINE)
}

const hubFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = SOFT
  ctx.fillRect(0, 0, w, 70)
  bar(ctx, 36, 26, w * 0.34, 20, NIGHT)
  for (let i = 0; i < 3; i++) {
    const y = 110 + i * 78
    ctx.fillStyle = '#f1f2f4'
    ctx.beginPath()
    ctx.roundRect(28, y, w - 56, 58, 14)
    ctx.fill()
    ctx.fillStyle = NIGHT
    ctx.beginPath()
    ctx.arc(70, y + 29, 16, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = LIME_CSS
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(62, y + 29)
    ctx.lineTo(69, y + 36)
    ctx.lineTo(80, y + 22)
    ctx.stroke()
    bar(ctx, 108, y + 21, w * (0.42 - i * 0.06), 16, LINE)
  }
  const base = h - 70
  ;[0.5, 0.8, 0.62, 1].forEach((v, i) => {
    ctx.fillStyle = i === 3 ? NIGHT : '#c9cdd3'
    ctx.fillRect(40 + i * 62, base - 90 * v, 40, 90 * v)
  })
}

interface Card {
  group: THREE.Group
  baseY: number
  phase: number
}

function card(w: number, h: number, face: THREE.CanvasTexture, depth = 0.16): THREE.Group {
  const group = new THREE.Group()
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(w, h, depth, 3, 0.1),
    new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.55, metalness: 0 }),
  )
  const front = new THREE.Mesh(
    new THREE.PlaneGeometry(w - 0.16, h - 0.16),
    new THREE.MeshBasicMaterial({ map: face, transparent: true }),
  )
  front.position.z = depth / 2 + 0.004
  group.add(body, front)
  return group
}

export function mountScene(host: HTMLElement, onContext?: (lost: boolean) => void): (() => void) | null {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.domElement.className = 'hero-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50)
  camera.position.set(0, 0.45, 14)
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  const sun = new THREE.DirectionalLight(0xffffff, 1.7)
  sun.position.set(3, 5, 7)
  scene.add(sun)

  const root = new THREE.Group()
  scene.add(root)
  const disposables: Array<{ dispose(): void }> = []
  const track = <T extends { dispose(): void }>(d: T): T => (disposables.push(d), d)

  // ---- Sources, left
  const cards: Card[] = []
  const place = (g: THREE.Group, x: number, y: number, rz: number, ry: number, phase: number) => {
    g.position.set(x, y, 0)
    g.rotation.set(0, ry, rz)
    root.add(g)
    cards.push({ group: g, baseY: y, phase })
  }
  const chat = card(2.2, 1.65, track(texture(512, 384, chatFace)))
  const sheet = card(2.5, 1.75, track(texture(512, 384, sheetFace)))
  const paper = card(1.8, 2.2, track(texture(384, 448, paperFace)))
  place(chat, -2.55, 3.3, -0.08, 0.3, 0)
  place(sheet, 0.1, 3.55, 0.05, 0, 2.1)
  place(paper, 2.65, 3.25, -0.06, -0.3, 4.2)

  // ---- Hub, right
  const hub = card(3.2, 3.9, track(texture(512, 624, hubFace)), 0.24)
  const HUB_Y = -1.75
  hub.position.set(0, HUB_Y, 0)
  hub.rotation.y = 0
  root.add(hub)

  const ringMat = track(new THREE.MeshBasicMaterial({ color: RING, transparent: true, opacity: 0.85 }))
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(2.6, 0.04, 8, 120)), ringMat)
  ring.position.copy(hub.position)
  ring.rotation.set(1.2, 0.2, 0)
  root.add(ring)

  const agentGeo = track(new THREE.SphereGeometry(0.2, 24, 16))
  const agents = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(agentGeo, track(new THREE.MeshBasicMaterial({ color: DOT })))
    root.add(m)
    return { mesh: m, a: (i / 3) * Math.PI * 2 }
  })
  const approve = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.2, 24, 16)),
    track(new THREE.MeshBasicMaterial({ color: LIME })),
  )
  root.add(approve)

  // ---- Flow: points travelling along curves from each source into the hub
  const curves = cards.map(({ group }, i) => {
    const from = new THREE.Vector3(group.position.x, group.position.y - 1.15, 0.2)
    const to = new THREE.Vector3((i - 1) * 0.8, HUB_Y + 1.95, 0.3)
    const mid = new THREE.Vector3((from.x + to.x) / 2 + (i - 1) * 0.5, (from.y + to.y) / 2, 1.2)
    return new THREE.CatmullRomCurve3([from, mid, to])
  })
  const narrow = host.clientWidth < 520
  const perCurve = narrow ? 12 : 20
  const dots = new THREE.InstancedMesh(
    track(new THREE.SphereGeometry(0.1, 10, 8)),
    track(new THREE.MeshBasicMaterial({ color: 0xffffff })),
    perCurve * curves.length,
  )
  const tint = new THREE.Color()
  for (let n = 0; n < perCurve * curves.length; n++) dots.setColorAt(n, tint.set(n % 4 === 0 ? LIME : DOT))
  root.add(dots)
  const dummy = new THREE.Object3D()
  const point = new THREE.Vector3()

  // ---- Press a card: a point travels its curve, the approval node pulses
  const SEND = 1.1
  const PULSE = 0.7
  const sparkGeo = track(new THREE.SphereGeometry(0.17, 16, 12))
  const sparkMat = track(new THREE.MeshBasicMaterial({ color: LIME }))
  const sparks = curves.map(() => {
    const mesh = new THREE.Mesh(sparkGeo, sparkMat)
    mesh.visible = false
    root.add(mesh)
    return { mesh, start: -1 }
  })
  const pops = cards.map(() => -1)
  let pulseAt = -1
  const ray = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  const cardAt = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    return cards.findIndex((c) => ray.intersectObject(c.group, true).length > 0)
  }

  // ---- Sizing, pointer, visibility
  const resize = () => {
    const w = Math.max(host.clientWidth, 1)
    const h = Math.max(host.clientHeight, 1)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Fit the whole composition in whatever the stage is. The cards span about
    // 7.3 units across and the stack about 8.2 tall; the numbers below add room
    // for the outer cards, which sit nearer the camera and lean as the pointer moves.
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    camera.position.z = Math.max(9.4 / (2 * half), 8.6 / (2 * half * camera.aspect))
    camera.position.y = 0.45
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  const target = { x: 0, y: 0 }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    wake()
    const r = host.getBoundingClientRect()
    target.y = ((e.clientX - r.left) / r.width - 0.5) * 0.5
    target.x = ((e.clientY - r.top) / r.height - 0.5) * 0.28
  }
  host.addEventListener('pointermove', onMove)
  const onHover = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    host.style.cursor = cardAt(e) >= 0 ? 'pointer' : ''
  }
  host.addEventListener('pointermove', onHover)
  const onLeave = () => {
    target.x = 0
    target.y = 0
    host.style.cursor = ''
  }
  host.addEventListener('pointerleave', onLeave)
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 || lost) return
    const i = cardAt(e)
    if (i < 0) return
    sparks[i]!.start = t
    pops[i] = t
    wake()
  }
  host.addEventListener('pointerdown', onDown)

  let visible = true
  let lost = false
  let raf = 0
  // The scene plays for a few seconds, then rests (WCAG 2.2.2: nothing moves
  // for long on its own). A pointer over it or a tap on a card wakes it again.
  // `t` is the scene's own clock and only runs while it plays, so a woken
  // scene carries on from where it rested instead of jumping.
  let t = 0
  let last = 0
  let awakeUntil = performance.now() + 6000
  const wake = () => {
    awakeUntil = Math.max(awakeUntil, performance.now() + 3000)
    start()
  }
  const frame = () => {
    raf = 0
    if (!visible || document.hidden || lost) return
    const now = performance.now()
    t += Math.min(now - (last || now), 50) / 1000
    last = now

    root.rotation.y += (target.y - root.rotation.y) * 0.06
    root.rotation.x += (target.x - root.rotation.x) * 0.06

    cards.forEach((c) => {
      c.group.position.y = c.baseY + Math.sin(t * 0.9 + c.phase) * 0.09
    })
    hub.position.y = HUB_Y + Math.sin(t * 0.7) * 0.06
    ring.rotation.z = t * 0.18

    agents.forEach(({ mesh, a }, i) => {
      const ang = a + t * (0.55 + i * 0.05)
      mesh.position.set(
        hub.position.x + Math.cos(ang) * 2.6,
        HUB_Y + Math.sin(ang) * 2.6 * Math.sin(1.2) * 0.9,
        Math.sin(ang) * 2.6 * Math.cos(1.2) * 0.9 + 0.2,
      )
    })
    const aa = t * 0.35
    approve.position.set(Math.cos(aa) * 1.35, HUB_Y + 1.15 + Math.sin(aa * 1.3) * 0.15, 1.3)

    // A pressed card pops; its point rides the curve, then the approval node pulses.
    cards.forEach((c, i) => {
      const k = (t - pops[i]!) / 0.35
      c.group.scale.setScalar(pops[i]! >= 0 && k < 1 ? 1 + 0.07 * Math.sin(Math.PI * k) : 1)
    })
    sparks.forEach((sp, ci) => {
      const k = (t - sp.start) / SEND
      sp.mesh.visible = sp.start >= 0 && k < 1
      if (sp.start >= 0 && k >= 1) {
        sp.start = -1
        pulseAt = t
      }
      if (sp.mesh.visible) {
        curves[ci]!.getPoint(1 - Math.pow(1 - k, 3), sp.mesh.position)
        sp.mesh.scale.setScalar(0.6 + 0.8 * Math.sin(Math.PI * k))
      }
    })
    const pk = (t - pulseAt) / PULSE
    const pulse = pulseAt >= 0 && pk < 1 ? Math.sin(Math.PI * pk) : 0
    approve.scale.setScalar(1 + 1.1 * pulse)
    hub.scale.setScalar(1 + 0.03 * pulse)

    let n = 0
    curves.forEach((curve, ci) => {
      for (let k = 0; k < perCurve; k++) {
        const f = (t * 0.16 + k / perCurve + ci * 0.17) % 1
        curve.getPoint(f, point)
        dummy.position.copy(point)
        dummy.scale.setScalar(Math.sin(Math.PI * f) + 0.05)
        dummy.updateMatrix()
        dots.setMatrixAt(n++, dummy.matrix)
      }
    })
    dots.instanceMatrix.needsUpdate = true

    renderer.render(scene, camera)
    const busy = sparks.some((sp) => sp.start >= 0) || pk < 1
    if (now < awakeUntil || busy) raf = requestAnimationFrame(frame)
    else last = 0
  }
  const start = () => {
    if (!raf && visible && !document.hidden && !lost) raf = requestAnimationFrame(frame)
  }
  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    if (visible) start()
  })
  io.observe(host)
  const onVisibility = () => start()
  document.addEventListener('visibilitychange', onVisibility)
  // three.js re-creates its GPU state on restore; we only stop drawing meanwhile.
  const canvas = renderer.domElement
  const onLost = (e: Event) => {
    e.preventDefault()
    lost = true
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    onContext?.(true)
  }
  const onRestored = () => {
    lost = false
    onContext?.(false)
    start()
  }
  canvas.addEventListener('webglcontextlost', onLost)
  canvas.addEventListener('webglcontextrestored', onRestored)
  start()

  return () => {
    if (raf) cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointermove', onHover)
    host.removeEventListener('pointerleave', onLeave)
    host.removeEventListener('pointerdown', onDown)
    host.style.cursor = ''
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('webglcontextlost', onLost)
    canvas.removeEventListener('webglcontextrestored', onRestored)
    disposables.forEach((d) => d.dispose())
    cards.forEach(({ group }) =>
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const m = o.material as THREE.Material | THREE.Material[]
          ;(Array.isArray(m) ? m : [m]).forEach((x) => x.dispose())
        }
      }),
    )
    hub.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose()
        const m = o.material as THREE.Material | THREE.Material[]
        ;(Array.isArray(m) ? m : [m]).forEach((x) => x.dispose())
      }
    })
    renderer.dispose()
    renderer.domElement.remove()
  }
}
