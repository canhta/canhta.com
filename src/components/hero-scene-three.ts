import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * The home hero as a large 3D scene on the deep green band: scattered sources
 * (a chat, a spreadsheet, a paper) across the top, a stream of points flowing
 * along curves down into one dashboard, and three AI agents orbiting it. It
 * exists to show the page's idea, so everything in it means something: the flow
 * is the work moving into one system, the orbit is the agents, the one orange
 * node is the approval step. The stage is taller than wide on every layout, so
 * the composition is vertical. White and mint objects read against the ground;
 * orange is used for the approval node and a few of the flow points.
 *
 * Loaded lazily and only in the browser. Returns `null` when WebGL is not
 * available (the static drawing underneath stays), otherwise a disposer.
 * It renders only while visible and while the tab is open, and not while the GPU
 * has taken its context away (`onContext` reports that, so the caller can show
 * the static drawing again until the context returns).
 */

const ACCENT = 0xff6a2b
const MINT = 0x7fd6a4
const PAPER = 0xffffff
const LINE = '#cbd8cf'

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
  bar(ctx, 40, 50, w * 0.55, 34, '#e3f1e8')
  bar(ctx, 40, 100, w * 0.4, 34, '#e3f1e8')
  bar(ctx, w * 0.35, 170, w * 0.58, 34, '#146c43')
  bar(ctx, w * 0.5, 220, w * 0.43, 34, '#146c43')
  bar(ctx, 40, 290, w * 0.5, 34, '#e3f1e8')
}

const sheetFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#e3f1e8'
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
  ctx.fillStyle = '#ff6a2b'
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
  ctx.fillStyle = '#e3f1e8'
  ctx.fillRect(0, 0, w, 70)
  bar(ctx, 36, 26, w * 0.34, 20, '#146c43')
  for (let i = 0; i < 3; i++) {
    const y = 110 + i * 78
    ctx.fillStyle = '#f2f5f2'
    ctx.beginPath()
    ctx.roundRect(28, y, w - 56, 58, 14)
    ctx.fill()
    ctx.fillStyle = '#146c43'
    ctx.beginPath()
    ctx.arc(70, y + 29, 16, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#fff'
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
    ctx.fillStyle = i === 3 ? '#146c43' : '#bfd9c8'
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

  const ringMat = track(new THREE.MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0.6 }))
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(2.6, 0.03, 8, 120)), ringMat)
  ring.position.copy(hub.position)
  ring.rotation.set(1.2, 0.2, 0)
  root.add(ring)

  const agentGeo = track(new THREE.SphereGeometry(0.2, 24, 16))
  const agents = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(agentGeo, track(new THREE.MeshStandardMaterial({ color: MINT, roughness: 0.4 })))
    root.add(m)
    return { mesh: m, a: (i / 3) * Math.PI * 2 }
  })
  const approve = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.2, 24, 16)),
    track(new THREE.MeshBasicMaterial({ color: ACCENT })),
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
    track(new THREE.SphereGeometry(0.085, 10, 8)),
    track(new THREE.MeshBasicMaterial({ color: 0xffffff })),
    perCurve * curves.length,
  )
  const tint = new THREE.Color()
  for (let n = 0; n < perCurve * curves.length; n++) dots.setColorAt(n, tint.set(n % 4 === 0 ? ACCENT : MINT))
  root.add(dots)
  const dummy = new THREE.Object3D()
  const point = new THREE.Vector3()

  // ---- Sizing, pointer, visibility
  const resize = () => {
    const w = Math.max(host.clientWidth, 1)
    const h = Math.max(host.clientHeight, 1)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Fit the whole composition (about 7.6 wide, 9 tall) in whatever the stage is.
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    camera.position.z = Math.max(9 / (2 * half), 7.6 / (2 * half * camera.aspect))
    camera.position.y = 0.45
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  const target = { x: 0, y: 0 }
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    target.y = ((e.clientX - r.left) / r.width - 0.5) * 0.5
    target.x = ((e.clientY - r.top) / r.height - 0.5) * 0.28
  }
  host.addEventListener('pointermove', onMove)
  const onLeave = () => {
    target.x = 0
    target.y = 0
  }
  host.addEventListener('pointerleave', onLeave)

  let visible = true
  let lost = false
  let raf = 0
  const t0 = performance.now()
  const frame = () => {
    raf = 0
    if (!visible || document.hidden || lost) return
    const t = (performance.now() - t0) / 1000

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
    raf = requestAnimationFrame(frame)
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
    host.removeEventListener('pointerleave', onLeave)
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
