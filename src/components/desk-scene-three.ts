import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { ZALO_PATHS } from './icons'

/**
 * The home hero: a corner of a desk, seen from above at an angle. Work as it
 * lives today lies on it: a phone with a Zalo order, a notebook of handwritten
 * orders, a printed debt sheet. Lime threads pull each one into a tablet that
 * starts on the Canh Ta mark and opens on one system, where the AI assistant
 * has an order drafted and a person taps Duyệt. Every object is a real thing;
 * the ground is the page itself, with the objects' soft shadows on it.
 *
 * Plays once (about 4 s), then stops drawing. A pointer over it moves the camera
 * a little and wakes it for a few seconds. Renders only while on screen and
 * while the tab is visible. Returns null without WebGL.
 */

export type DeskLabels = {
  caller: string
  phoneMsg: string
  notebook: string
  notes: string[]
  sheet: string
  sheetRows: string[][]
  system: string
  rows: string[]
  ai: string
  task: string
  approve: string
  approved: string
}

const LIME = '#d1fe17'
const NIGHT = '#131517'
const INK = '#131517'
const MUTED = '#565b62'
const PAPER = '#f3efe6'
let FONT = 'sans-serif'

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void

function canvasTexture(w: number, h: number, draw: Draw): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  draw(canvas.getContext('2d')!, w, h)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function box(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

function text(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size: number,
  color: string,
  weight = 700,
  style = '',
) {
  ctx.fillStyle = color
  ctx.font = `${style} ${weight} ${size}px ${FONT}`
  ctx.textBaseline = 'middle'
  ctx.fillText(value, x, y)
}

/** Word-wraps `value` inside `width`, returns the y after the last line. */
function wrap(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, width: number, size: number, color: string) {
  ctx.font = `600 ${size}px ${FONT}`
  let line = ''
  for (const word of value.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width > width && line) {
      text(ctx, line, x, y, size, color, 600)
      line = word
      y += size * 1.35
    } else line = next
  }
  text(ctx, line, x, y, size, color, 600)
  return y + size * 1.35
}

/** The Canh Ta mark: a lime C on night with a white dot in its opening. */
function mark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 32, size / 32)
  box(ctx, 0, 0, 32, 32, 8, NIGHT)
  ctx.strokeStyle = LIME
  ctx.lineWidth = 5.4
  ctx.stroke(new Path2D('M21.6 10.4A8.4 8.4 0 1 0 21.6 21.6'))
  ctx.fillStyle = '#f7f7f8'
  ctx.beginPath()
  ctx.arc(24.2, 16, 2.7, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

/** Zalo's own logo tile, as on the site's contact rows. */
function zalo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 48, size / 48)
  box(ctx, 0, 0, 48, 48, 11, '#0068FF')
  ctx.translate(8, 18.1)
  ctx.scale(0.42, 0.42)
  ctx.fillStyle = '#fff'
  for (const d of ZALO_PATHS) ctx.fill(new Path2D(d))
  ctx.restore()
}

function check(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, ground: string, tick: string) {
  ctx.fillStyle = ground
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = tick
  ctx.lineWidth = r * 0.28
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(cx - r * 0.42, cy + r * 0.02)
  ctx.lineTo(cx - r * 0.1, cy + r * 0.34)
  ctx.lineTo(cx + r * 0.46, cy - r * 0.32)
  ctx.stroke()
}

const phoneFace = (l: DeskLabels): Draw => (ctx, w, h) => {
  box(ctx, 0, 0, w, h, 0, '#eef0f3')
  box(ctx, 0, 0, w, 170, 0, '#ffffff')
  zalo(ctx, 36, 50, 92)
  text(ctx, l.caller, 152, 96, 46, INK, 800)
  box(ctx, 36, 240, w - 150, 0, 0, '#fff')
  // The customer's message, in a white bubble.
  ctx.font = `600 44px ${FONT}`
  const bubbleTop = 250
  box(ctx, 36, bubbleTop, w - 130, 220, 34, '#ffffff')
  wrap(ctx, l.phoneMsg, 70, bubbleTop + 64, w - 200, 44, INK)
  text(ctx, '09:41', 70, bubbleTop + 250, 30, MUTED, 600)
  // The message box at the foot of the chat.
  box(ctx, 30, h - 130, w - 60, 90, 45, '#ffffff')
}

const notebookFace = (l: DeskLabels): Draw => (ctx, w, h) => {
  box(ctx, 0, 0, w, h, 0, PAPER)
  ctx.strokeStyle = 'rgba(19,21,23,0.12)'
  ctx.lineWidth = 3
  for (let y = 210; y < h; y += 96) {
    ctx.beginPath()
    ctx.moveTo(60, y)
    ctx.lineTo(w - 60, y)
    ctx.stroke()
  }
  text(ctx, l.notebook, 70, 130, 64, INK, 800)
  l.notes.forEach((note, i) => text(ctx, note, 80, 260 + i * 96, 50, '#2a3a6b', 600, 'italic'))
}

const sheetFace = (l: DeskLabels): Draw => (ctx, w, h) => {
  box(ctx, 0, 0, w, h, 0, '#ffffff')
  text(ctx, l.sheet, 60, 90, 50, INK, 800)
  const top = 170
  const rowH = 110
  const cols = [60, w * 0.55]
  box(ctx, 40, top, w - 80, rowH, 0, '#e6e8eb')
  l.sheetRows.forEach((row, r) => {
    row.forEach((cell, c) => text(ctx, cell, cols[c]! + 10, top + rowH * r + rowH / 2, 42, r === 0 ? MUTED : INK, r === 0 ? 700 : 600))
  })
  ctx.strokeStyle = '#d3d6db'
  ctx.lineWidth = 3
  for (let r = 0; r <= l.sheetRows.length + 2; r++) {
    ctx.beginPath()
    ctx.moveTo(40, top + rowH * r)
    ctx.lineTo(w - 40, top + rowH * r)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(w * 0.55, top)
  ctx.lineTo(w * 0.55, top + rowH * (l.sheetRows.length + 2))
  ctx.stroke()
}

const bootFace: Draw = (ctx, w, h) => {
  box(ctx, 0, 0, w, h, 0, NIGHT)
  mark(ctx, w / 2 - 150, h / 2 - 150, 300)
}

const systemFace = (l: DeskLabels, done: boolean): Draw => (ctx, w, h) => {
  box(ctx, 0, 0, w, h, 0, '#1c1e21')
  box(ctx, 0, 0, w, 150, 0, NIGHT)
  mark(ctx, 50, 35, 80)
  text(ctx, l.system, 160, 76, 52, '#f7f7f8', 800)
  // The records, now in one place.
  l.rows.forEach((row, i) => {
    const y = 220 + i * 150
    box(ctx, 50, y, w * 0.42, 120, 26, '#2a2d31')
    check(ctx, 110, y + 60, 30, LIME, NIGHT)
    text(ctx, row, 165, y + 62, 46, '#f7f7f8', 700)
  })
  // The AI assistant's card, with the step waiting for a person.
  const x = w * 0.5
  const cw = w - x - 50
  box(ctx, x, 220, cw, 420, 34, LIME)
  text(ctx, l.ai, x + 50, 290, 44, NIGHT, 800)
  wrap(ctx, l.task, x + 50, 380, cw - 100, 48, NIGHT)
  const bx = x + 50
  const by = 500
  if (done) {
    box(ctx, bx, by, cw - 100, 120, 60, NIGHT)
    check(ctx, bx + 70, by + 60, 36, LIME, NIGHT)
    text(ctx, l.approved, bx + 128, by + 62, 54, LIME, 800)
  } else {
    box(ctx, bx, by, cw - 100, 120, 60, NIGHT)
    text(ctx, l.approve, bx + 60, by + 62, 54, LIME, 800)
  }
}

function rounded(w: number, h: number, d: number, r: number, color: string, rough = 0.6) {
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(w, h, d, 4, r),
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 }),
  )
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** A flat face on top of an object, lying in the desk plane. Unlit so text stays crisp and true to colour. */
function face(w: number, d: number, tex: THREE.Texture) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
  )
  mesh.rotation.x = -Math.PI / 2
  return mesh
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

export function mountDesk(host: HTMLElement, labels: DeskLabels, still = false): (() => void) | null {
  FONT = getComputedStyle(document.body).fontFamily || FONT
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const canvas = renderer.domElement
  canvas.className = 'desk-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  host.appendChild(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

  scene.add(new THREE.AmbientLight(0xffffff, 1.4))
  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.set(4, 12, 6)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.radius = 8
  sun.shadow.bias = -0.0004
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 30 })
  scene.add(sun)

  // The ground is the page itself: only the objects' shadows are drawn on it.
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.7 }))
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const textures: THREE.Texture[] = []
  const track = <T extends THREE.Texture>(t: T) => (textures.push(t), t)

  // Tablet: the one system.
  const tablet = new THREE.Group()
  const tabletBody = rounded(6.2, 0.24, 3.5, 0.22, '#c9cdd3', 0.35)
  tablet.add(tabletBody)
  const bootTex = track(canvasTexture(1600, 820, bootFace))
  const uiTex = track(canvasTexture(1600, 820, systemFace(labels, false)))
  const doneTex = track(canvasTexture(1600, 820, systemFace(labels, true)))
  const screen = face(5.84, 3.16, bootTex)
  screen.position.y = 0.125
  tablet.add(screen)
  tablet.position.set(1.5, 0.11, 0.4)
  tablet.rotation.y = -0.05
  scene.add(tablet)

  // Phone with the Zalo order.
  const phone = new THREE.Group()
  phone.add(rounded(2.0, 0.16, 3.9, 0.2, '#2a2d31', 0.35))
  const phoneScreen = face(1.84, 3.72, track(canvasTexture(560, 1130, phoneFace(labels))))
  phoneScreen.position.y = 0.082
  phone.add(phoneScreen)
  phone.position.set(-3.1, 0.07, -2.4)
  phone.rotation.y = 0.18
  scene.add(phone)

  // A notebook of handwritten orders, on a second one.
  const notebook = new THREE.Group()
  const under = rounded(2.6, 0.1, 3.3, 0.06, '#d9d2c3', 0.9)
  under.rotation.y = 0.08
  notebook.add(under)
  const top = rounded(2.5, 0.1, 3.2, 0.06, PAPER, 0.9)
  top.position.y = 0.1
  notebook.add(top)
  const notes = face(2.42, 3.12, track(canvasTexture(900, 1160, notebookFace(labels))))
  notes.position.y = 0.152
  notebook.add(notes)
  notebook.position.set(-3.4, 0.05, 2.9)
  notebook.rotation.y = -0.14
  scene.add(notebook)

  // A printed debt sheet.
  const sheet = new THREE.Group()
  sheet.add(rounded(2.4, 0.04, 3.1, 0.02, '#ffffff', 0.95))
  const sheetTop = face(2.36, 3.06, track(canvasTexture(900, 1160, sheetFace(labels))))
  sheetTop.position.y = 0.022
  sheet.add(sheetTop)
  sheet.position.set(-4.5, 0.01, 0.2)
  sheet.rotation.y = 0.1
  scene.add(sheet)

  // Lime threads from each source into the tablet, lying on the desk.
  const lime = new THREE.MeshStandardMaterial({ color: LIME, roughness: 0.5 })
  const ends = [
    [new THREE.Vector3(-2.2, 0.04, -2.1), new THREE.Vector3(-1.9, 0.04, -1.1), new THREE.Vector3(-1.6, 0.04, -0.6)],
    [new THREE.Vector3(-3.3, 0.04, 0.3), new THREE.Vector3(-2.4, 0.04, 0.4), new THREE.Vector3(-1.6, 0.04, 0.4)],
    [new THREE.Vector3(-2.2, 0.04, 2.2), new THREE.Vector3(-1.9, 0.04, 1.6), new THREE.Vector3(-1.6, 0.04, 1.4)],
  ]
  const threads = ends.map((pts) => {
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.045, 8)
    const mesh = new THREE.Mesh(geo, lime)
    mesh.castShadow = true
    geo.setDrawRange(0, 0)
    scene.add(mesh)
    return { geo, total: geo.index!.count }
  })

  const objects = [
    { o: phone, y: phone.position.y, at: 0.0 },
    { o: sheet, y: sheet.position.y, at: 0.12 },
    { o: notebook, y: notebook.position.y, at: 0.24 },
    { o: tablet, y: tablet.position.y, at: 0.4 },
  ]

  // The whole desk (about 10 by 9 units) stays in frame at any stage shape: the
  // camera keeps its angle and steps back when the stage is narrow.
  const dir = new THREE.Vector3(0.08, 0.66, 0.75).normalize()
  // Each object's own corners (not one box around all of them, whose empty
  // corners would make the camera step back too far).
  scene.updateMatrixWorld(true)
  const corners: THREE.Vector3[] = []
  const all = new THREE.Box3()
  for (const o of [tablet, phone, notebook, sheet]) {
    const b = new THREE.Box3().setFromObject(o).expandByScalar(0.15)
    all.union(b)
    for (const x of [b.min.x, b.max.x]) for (const z of [b.min.z, b.max.z]) corners.push(new THREE.Vector3(x, b.max.y, z))
  }
  const look = all.getCenter(new THREE.Vector3())
  look.y = 0
  const probe = new THREE.Vector3()
  let base = new THREE.Vector3()
  const resize = () => {
    const w = host.clientWidth || 1
    const h = host.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Step the camera back along its angle until every corner sits inside the
    // frame with a margin, so nothing is ever cut at any stage shape.
    for (let dist = 8; dist < 60; dist += 0.25) {
      camera.position.copy(look).addScaledVector(dir, dist)
      camera.lookAt(look)
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld()
      const fits = corners.every((c) => {
        probe.copy(c).project(camera)
        return Math.abs(probe.x) < 0.94 && Math.abs(probe.y) < 0.92
      })
      if (fits) break
    }
    base = camera.position.clone()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  const pointer = { x: 0, y: 0 }
  // `still` (reduced motion): the finished desk, drawn once, nothing moves.
  let t = still ? 10 : 0
  let last = 0
  let raf = 0
  let visible = true
  let awakeUntil = performance.now() + 5500
  let shown: THREE.Texture = bootTex

  const frame = () => {
    raf = 0
    if (!visible || document.hidden) return
    const now = performance.now()
    t += Math.min(now - (last || now), 50) / 1000
    last = now

    for (const { o, y, at } of objects) {
      const k = ease((t - at) / 0.7)
      o.position.y = y + (1 - k) * 0.9
    }
    threads.forEach((th, i) => {
      const k = ease((t - 1.0 - i * 0.18) / 1.0)
      th.geo.setDrawRange(0, Math.floor(th.total * k))
    })
    const want = t < 2.3 ? bootTex : t < 3.2 ? uiTex : doneTex
    if (want !== shown) {
      ;(screen.material as THREE.MeshBasicMaterial).map = want
      shown = want
    }
    camera.position.x += (base.x + pointer.x * 0.8 - camera.position.x) * 0.06
    camera.position.y += (base.y - pointer.y * 0.5 - camera.position.y) * 0.06
    camera.lookAt(look)

    renderer.render(scene, camera)
    if (!still && (now < awakeUntil || t < 3.6)) raf = requestAnimationFrame(frame)
    else last = 0
  }
  const start = () => {
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
  }
  const onMove = (e: PointerEvent) => {
    if (still || e.pointerType === 'touch') return
    const r = host.getBoundingClientRect()
    pointer.x = (e.clientX - r.left) / r.width - 0.5
    pointer.y = (e.clientY - r.top) / r.height - 0.5
    awakeUntil = performance.now() + 2500
    start()
  }
  host.addEventListener('pointermove', onMove)
  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    if (visible) start()
  })
  io.observe(host)
  const onVisibility = () => start()
  document.addEventListener('visibilitychange', onVisibility)
  start()

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    host.removeEventListener('pointermove', onMove)
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose()
        const m = o.material as THREE.Material
        m.dispose()
      }
    })
    textures.forEach((x) => x.dispose())
    renderer.dispose()
    canvas.remove()
  }
}
