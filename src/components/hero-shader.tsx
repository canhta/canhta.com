'use client'

import { useEffect, useRef } from 'react'

/**
 * Hero backdrop. A hand-written WebGL fragment shader — no library, ~3KB of code.
 *
 * It paints *behind* content that is already legible, so it never gates paint and
 * never touches LCP. If WebGL is missing, the context is lost, or the visitor
 * prefers reduced motion, nothing initialises and the flat background stands.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;

// Cheap value noise — no texture lookups, no derivatives.
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p  = uv * vec2(uRes.x / uRes.y, 1.0);

  vec3 paper = vec3(0.910, 0.918, 0.906);

  // Paper, not atmosphere. Large-scale tonal variation like stock held to light,
  // plus a slow diagonal sweep so the sheet is alive without being a gradient blob.
  float tone  = fbm(p * 1.05 + uTime * 0.008) - 0.5;
  float sweep = sin((uv.x + uv.y) * 1.6 - uTime * 0.10) * 0.5 + 0.5;

  // The pointer lifts the sheet very slightly, the way a light source would.
  float lift = smoothstep(0.62, 0.0, distance(uv, uPointer));

  float lum = tone * 0.045 + sweep * 0.022 + lift * 0.030;

  vec3 col = paper + lum;

  // Settle toward flat paper at the edges so the section never ends on a seam.
  col = mix(col, paper, smoothstep(0.34, 0.0, uv.y) * 0.9);

  // Faint grain kills banding across a very low-contrast field.
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.005;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Fullscreen triangle — cheaper than a quad, no index buffer.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uPointer = gl.getUniformLocation(program, 'uPointer')

    const pointer = { x: 0.5, y: 0.62 }
    const target = { x: 0.5, y: 0.62 }

    const resize = () => {
      // Half-resolution: the field is low-frequency, nobody can tell, and it
      // roughly quarters the fragment cost on high-DPI screens.
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.5
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = 1 - (e.clientY - rect.top) / rect.height
    }

    let raf = 0
    let running = true
    const start = performance.now()

    const frame = (now: number) => {
      if (!running) return
      resize()
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // Stop burning GPU when the tab or the section is not visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        if (visible && !running) {
          running = true
          raf = requestAnimationFrame(frame)
        } else if (!visible) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const onContextLost = (e: Event) => {
      e.preventDefault()
      running = false
      cancelAnimationFrame(raf)
    }
    canvas.addEventListener('webglcontextlost', onContextLost)
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      window.removeEventListener('pointermove', onPointer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
