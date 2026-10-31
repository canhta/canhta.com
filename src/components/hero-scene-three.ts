import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * The home hero as a small 3D scene: scattered sources (a chat, a spreadsheet,
 * a paper) on the left, a stream of points flowing along curves into one
 * dashboard on the right, and three AI agents orbiting it. It exists to show the
 * page's idea, so everything in it means something: the flow is the work moving
 * into one system, the orbit is the agents, the one yellow node is the
 * approval step.
 *
 * Loaded lazily and only in the browser. Returns `null` when WebGL is not
 * available (the static drawing underneath stays), otherwise a disposer.
 * It renders only while visible and while the tab is open.
 */

const BRAND = 0x1d4f91
const ACCENT = 0xffc21a
const PAPER = 0xffffff
const LINE = '#cdd5e1'

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
  bar(ctx, 40, 50, w * 0.55, 34, '#e6edf7')
  bar(ctx, 40, 100, w * 0.4, 34, '#e6edf7')
  bar(ctx, w * 0.35, 170, w * 0.58, 34, '#1d4f91')
  bar(ctx, w * 0.5, 220, w * 0.43, 34, '#1d4f91')
  bar(ctx, 40, 290, w * 0.5, 34, '#e6edf7')
}

const sheetFace: Draw = (ctx, w, h) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#e6edf7'
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
  ctx.fillStyle = '#ffc21a'
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
  ctx.fillStyle = '#e6edf7'
  ctx.fillRect(0, 0, w, 70)
  bar(ctx, 36, 26, w * 0.34, 20, '#1d4f91')
  for (let i = 0; i < 3; i++) {
    const y = 110 + i * 78
    ctx.fillStyle = '#f3f5f8'
    ctx.beginPath()
    ctx.roundRect(28, y, w - 56, 58, 14)
    ctx.fill()
    ctx.fillStyle = '#1d4f91'
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
    ctx.fillStyle = i === 3 ? '#1d4f91' : '#c4d3ea'
    ctx.fillRect(40 + i * 62, base - 90 * v, 40, 90 * v)
  })
}

function shadowBlob(): THREE.CanvasTexture {
  return texture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2)
    g.addColorStop(0, 'rgba(14,26,47,0.28)')
    g.addColorStop(1, 'rgba(14,26,47,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
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

export function mountScene(host: HTMLElement): (() => void) | null {
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
  camera.position.set(0, 0.2, 11)
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  const sun = new THREE.DirectionalLight(0xffffff, 1.7)
  sun.position.set(3, 5, 7)
  scene.add(sun)

  const root = new THREE.Group()
  scene.add(root)
  const disposables: Array<{ dispose(): void }> = []
  const track = <T extends { dispose(): void }>(d: T): T => (disposables.push(d), d)

  // ---- Sources, left
  const blob = track(shadowBlob())
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
  place(chat, -3.7, 2.05, -0.1, 0.28, 0)
  place(sheet, -3.9, -0.1, 0.06, 0.2, 2.1)
  place(paper, -3.5, -2.25, -0.05, 0.3, 4.2)

  // ---- Hub, right
  const hub = card(3.2, 3.9, track(texture(512, 624, hubFace)), 0.24)
  hub.position.set(2.7, 0, 0)
  hub.rotation.y = -0.22
  root.add(hub)

  const ringMat = track(new THREE.MeshBasicMaterial({ color: BRAND, transparent: true, opacity: 0.55 }))
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(2.75, 0.022, 8, 120)), ringMat)
  ring.position.copy(hub.position)
  ring.rotation.set(1.2, 0.2, 0)
  root.add(ring)

  const agentGeo = track(new THREE.SphereGeometry(0.17, 24, 16))
  const agents = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(agentGeo, track(new THREE.MeshStandardMaterial({ color: BRAND, roughness: 0.35 })))
    root.add(m)
    return { mesh: m, a: (i / 3) * Math.PI * 2 }
  })
  const approve = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.13, 24, 16)),
    track(new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.3, emissive: ACCENT, emissiveIntensity: 0.25 })),
  )
  root.add(approve)

  // ---- Contact shadows
  const shadowMat = track(new THREE.MeshBasicMaterial({ map: blob, transparent: true, depthWrite: false }))
  const shadowGeo = track(new THREE.PlaneGeometry(1, 1))
  ;[
    [-3.8, 3.4, 0.9],
    [2.7, 4.2, 0.9],
  ].forEach(([x, w, o]) => {
    const s = new THREE.Mesh(shadowGeo, shadowMat)
    s.rotation.x = -Math.PI / 2
    s.position.set(x!, -3.05, 0)
    s.scale.set(w!, w! * 0.55, 1)
    s.material = shadowMat
    void o
    root.add(s)
  })

  // ---- Flow: points travelling along curves from each source into the hub
  const curves = cards.map(({ group }, i) => {
    const from = new THREE.Vector3(group.position.x + 1.2, group.position.y, 0.2)
    const to = new THREE.Vector3(1.0, (i - 1) * 0.9, 0.2)
    const mid = new THREE.Vector3((from.x + to.x) / 2, (from.y + to.y) / 2 + (i === 1 ? 0 : i === 0 ? 0.7 : -0.7), 1.0)
    return new THREE.CatmullRomCurve3([from, mid, to])
  })
  const narrow = host.clientWidth < 520
  const perCurve = narrow ? 12 : 20
  const dots = new THREE.InstancedMesh(
    track(new THREE.SphereGeometry(0.06, 10, 8)),
    track(new THREE.MeshBasicMaterial({ color: BRAND })),
    perCurve * curves.length,
  )
  root.add(dots)
  const dummy = new THREE.Object3D()
  const point = new THREE.Vector3()

  // ---- Sizing, pointer, visibility
  const resize = () => {
    const w = Math.max(host.clientWidth, 1)
    const h = Math.max(host.clientHeight, 1)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Keep the whole composition in frame on a narrow panel.
    camera.position.z = w / h < 1.15 ? 14.5 : 11.5
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
  let raf = 0
  const clock = new THREE.Clock()
  const frame = () => {
    raf = 0
    if (!visible || document.hidden) return
    const t = clock.getElapsedTime()

    root.rotation.y += (target.y - root.rotation.y) * 0.06
    root.rotation.x += (target.x - root.rotation.x) * 0.06

    cards.forEach((c) => {
      c.group.position.y = c.baseY + Math.sin(t * 0.9 + c.phase) * 0.09
    })
    hub.position.y = Math.sin(t * 0.7) * 0.06
    ring.rotation.z = t * 0.18

    agents.forEach(({ mesh, a }, i) => {
      const ang = a + t * (0.55 + i * 0.05)
      mesh.position.set(
        hub.position.x + Math.cos(ang) * 2.75,
        Math.sin(ang) * 2.75 * Math.sin(1.2) * 0.9,
        Math.sin(ang) * 2.75 * Math.cos(1.2) * 0.9,
      )
    })
    const aa = t * 0.35
    approve.position.set(hub.position.x + Math.cos(aa) * 1.9, 1.5 + Math.sin(aa * 1.3) * 0.2, 1.1)

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
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
  }
  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    if (visible) start()
  })
  io.observe(host)
  const onVisibility = () => start()
  document.addEventListener('visibilitychange', onVisibility)
  start()

  return () => {
    if (raf) cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointerleave', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
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
